import { useMemo } from 'react';
import { subDays, format, isAfter, startOfDay } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useCallLogs } from '@/hooks/useCallLogs';

export function AnalyticsPage() {
  const { calls, loading, error } = useCallLogs();

  const callsPerDay = useMemo(() => {
    const today = startOfDay(new Date());
    const start = subDays(today, 6);
    const days = Array.from({ length: 7 }).map((_, index) => {
      const date = subDays(today, 6 - index);
      return { day: format(date, 'EEE'), answered: 0, missed: 0 };
    });

    calls.forEach((call) => {
      if (!call.created_at) return;
      const callDate = new Date(call.created_at);
      if (!isAfter(callDate, start) && start.getTime() !== callDate.getTime()) return;
      const dayLabel = format(callDate, 'EEE');
      const dayEntry = days.find((d) => d.day === dayLabel);
      if (!dayEntry) return;
      if (call.status.toLowerCase() === 'missed') {
        dayEntry.missed += 1;
      } else {
        dayEntry.answered += 1;
      }
    });

    return days;
  }, [calls]);

  const peakHours = useMemo(() => {
    const hours: { hour: string; calls: number }[] = Array.from({ length: 24 }).map((_, hour) => ({
      hour: `${hour}:00`,
      calls: 0,
    }));

    calls.forEach((call) => {
      if (!call.created_at) return;
      const hour = new Date(call.created_at).getHours();
      hours[hour].calls += 1;
    });

    return hours.filter((entry) => entry.calls > 0).slice(0, 12);
  }, [calls]);

  const totals = useMemo(() => {
    const total = callsPerDay.reduce((sum, day) => sum + day.answered + day.missed, 0);
    const answered = callsPerDay.reduce((sum, day) => sum + day.answered, 0);
    const busiest = callsPerDay.reduce((max, day) => ((day.answered + day.missed) > (max.answered + max.missed) ? day : max),
      callsPerDay[0] ?? { day: '—', answered: 0, missed: 0 });
    const answerRate = total > 0 ? `${Math.round((answered / total) * 100)}%` : '—';
    return { total, answerRate, busiest: busiest?.day ?? '—' };
  }, [callsPerDay]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Analytics</h1>
        <p className="mt-1 text-muted-foreground">Track call performance and trends</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Calls This Week</CardTitle>
            {loading ? <span className="text-xs text-muted-foreground">Loading...</span> : null}
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={callsPerDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="answered" fill="#0f172a" name="Answered" />
                <Bar dataKey="missed" fill="#d4183d" name="Missed" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Peak Call Hours</CardTitle>
        </CardHeader>
        <CardContent>
          {peakHours.length === 0 ? (
            <p className="text-sm text-muted-foreground">Call volume data will appear after calls are processed.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={peakHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="calls" stroke="#0f172a" strokeWidth={2} name="Calls" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Calls This Week</p>
            <p className="mt-2 text-3xl font-semibold">{loading ? '—' : totals.total}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Answer Rate</p>
            <p className="mt-2 text-3xl font-semibold">{loading ? '—' : totals.answerRate}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Busiest Day</p>
            <p className="mt-2 text-3xl font-semibold">{loading ? '—' : totals.busiest}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

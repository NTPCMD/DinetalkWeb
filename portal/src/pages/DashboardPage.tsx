import { format, isToday } from 'date-fns';
import { Phone, PhoneMissed, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { useCallLogs } from '@/hooks/useCallLogs';
import type { CallLog } from '@/types';

function getOutcomeBadge(call: CallLog) {
  const outcome = call.status?.toLowerCase();
  const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive'; label: string }> = {
    answered: { variant: 'default', label: 'Answered' },
    completed: { variant: 'default', label: 'Completed' },
    missed: { variant: 'destructive', label: 'Missed' },
    transferred: { variant: 'secondary', label: 'Transferred' },
  };
  const config = (outcome && variants[outcome]) || variants.answered;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function DashboardPage() {
  const { calls, loading, error } = useCallLogs();

  const todayCalls = calls.filter((call) => (call.created_at ? isToday(new Date(call.created_at)) : false));
  const totalToday = todayCalls.length;
  const missedToday = todayCalls.filter((call) => call.status?.toLowerCase() === 'missed').length;
  const handledToday = todayCalls.filter((call) => call.status?.toLowerCase() !== 'missed').length;
  const avgDuration = (() => {
    const durations = todayCalls.map((call) => call.duration_seconds ?? 0).filter((d) => d > 0);
    if (!durations.length) return '—';
    const avg = Math.round(durations.reduce((sum, val) => sum + val, 0) / durations.length);
    const minutes = Math.floor(avg / 60);
    const seconds = avg % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  })();

  const stats = [
    { title: 'Total Calls Today', value: loading ? '—' : totalToday, icon: Phone, color: 'text-primary' },
    { title: 'Missed Calls', value: loading ? '—' : missedToday, icon: PhoneMissed, color: 'text-destructive' },
    { title: 'Avg Call Duration', value: loading ? '—' : avgDuration, icon: Clock, color: 'text-foreground' },
    { title: 'AI Handled', value: loading ? '—' : `${handledToday}/${totalToday || 1}`, icon: TrendingUp, color: 'text-primary' },
  ];

  const recentCalls = calls.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Overview of your AI receptionist performance</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon ?? TrendingUp;
          return (
            <Card key={stat.title} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
                  </div>
                  <div className="rounded-lg bg-muted px-3 py-2">
                    <Icon className={`h-6 w-6 ${stat.color ?? 'text-primary'}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Calls</CardTitle>
            {loading ? <span className="text-xs text-muted-foreground">Loading...</span> : null}
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : recentCalls.length === 0 ? (
            <p className="text-sm text-muted-foreground">Call activity will appear here once calls start coming in.</p>
          ) : (
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div key={call.id} className="flex items-center justify-between border-b py-3 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{call.customer_phone || call.customer_name || 'Unknown caller'}</p>
                      <p className="text-sm text-muted-foreground">
                        {call.created_at ? format(new Date(call.created_at), 'MMM d, yyyy h:mm a') : '—'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {call.duration_seconds ? `${call.duration_seconds}s` : '—'}
                    </span>
                    {getOutcomeBadge(call)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

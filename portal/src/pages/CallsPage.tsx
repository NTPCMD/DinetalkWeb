import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { Button } from '@/components/ui/button';
import type { PortalOutletContext } from '@/routes/types';
import type { CallLog, Restaurant } from '@/types';

export default function CallsPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const { restaurants } = useOutletContext<PortalOutletContext>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);

  useEffect(() => {
    const loadRestaurantAndCalls = async () => {
      if (!restaurantId) return;
      setLoading(true);
      setError(null);
      const { data: restaurantRow, error: restaurantError } = await supabase
        .from('restaurants')
        .select('id, name, calls_portal_enabled')
        .eq('id', restaurantId)
        .maybeSingle();

      if (restaurantError) {
        setError(restaurantError.message);
        setLoading(false);
        return;
      }

      if (!restaurantRow) {
        setError('Restaurant not found.');
        setLoading(false);
        return;
      }

      setRestaurant(restaurantRow as Restaurant);

      const { data: callRows, error: callError } = await supabase
        .from('call_logs')
        .select('id, restaurant_id, customer_name, customer_phone, status, recording_url, transcript, created_at, duration_seconds')
        .eq('restaurant_id', restaurantRow.id)
        .order('created_at', { ascending: false });

      if (callError) {
        setError(callError.message);
        setLoading(false);
        return;
      }

      const parsedCalls = (callRows as CallLog[]) ?? [];
      setCalls(parsedCalls);
      setSelectedCall(parsedCalls[0] ?? null);
      setLoading(false);
    };

    void loadRestaurantAndCalls();
  }, [restaurantId]);

  const callsEnabled = restaurant?.calls_portal_enabled ?? false;

  const formattedCalls = useMemo(
    () =>
      calls.map((call) => ({
        ...call,
        createdLabel: call.created_at ? format(new Date(call.created_at), 'MMM d, yyyy h:mm a') : '—',
      })),
    [calls]
  );

  if (!restaurantId) {
    return <EmptyState title="Choose a restaurant" description="Select a location to view call history." />;
  }

  if (loading) {
    return <LoadingState message="Loading call history..." className="min-h-[60vh]" />;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="py-10 text-center text-sm text-red-600">{error}</CardContent>
        </Card>
        <Button variant="outline" onClick={() => navigate('/restaurants')}>
          Back to restaurants
        </Button>
      </div>
    );
  }

  if (!callsEnabled) {
    return <EmptyState title="Call history not enabled" description="This restaurant is not configured for call logs." />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Call history</h1>
          <p className="text-sm text-slate-600">Recent calls for {restaurant?.name}</p>
        </div>
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Calls</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {formattedCalls.length === 0 ? (
              <EmptyState title="No calls yet" description="Call activity will appear here once your agent is live." />
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formattedCalls.map((call) => (
                      <TableRow key={call.id} onClick={() => setSelectedCall(call)} className="cursor-pointer">
                        <TableCell>{call.createdLabel}</TableCell>
                        <TableCell className="font-medium text-slate-900">
                          {call.customer_name || call.customer_phone || 'Unknown caller'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={call.status === 'completed' ? 'success' : 'default'}>
                            {call.status || '—'}
                          </Badge>
                        </TableCell>
                        <TableCell>{call.duration_seconds ? `${call.duration_seconds}s` : '—'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Call details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            {selectedCall ? (
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase text-slate-500">Customer</p>
                  <p className="font-semibold text-slate-900">
                    {selectedCall.customer_name || selectedCall.customer_phone || 'Unknown caller'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-500">Placed</p>
                    <p className="font-semibold text-slate-900">{selectedCall.created_at ? formattedCalls.find((c) => c.id === selectedCall.id)?.createdLabel : '—'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Status</p>
                    <p className="font-semibold text-slate-900">{selectedCall.status || '—'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-slate-500">Duration</p>
                  <p className="font-semibold text-slate-900">{selectedCall.duration_seconds ? `${selectedCall.duration_seconds}s` : '—'}</p>
                </div>
                {selectedCall.recording_url ? (
                  <div className="space-y-2">
                    <p className="text-slate-500">Recording</p>
                    <audio controls className="w-full">
                      <source src={selectedCall.recording_url} />
                    </audio>
                  </div>
                ) : null}
                {selectedCall.transcript ? (
                  <div className="space-y-2">
                    <p className="text-slate-500">Transcript</p>
                    <div className="rounded-md bg-slate-50 p-3 text-slate-800">{selectedCall.transcript}</div>
                  </div>
                ) : null}
              </div>
            ) : (
              <EmptyState title="Select a call" description="Choose a call to see details and playback." />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Phone, Volume2, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/ui/sheet';
import { useCallLogs } from '@/hooks/useCallLogs';
import { getCallerDisplayName } from '@/lib/callLogDisplay';
import type { CallLog } from '@/types';

function getOutcomeBadge(status?: string) {
  const outcome = status?.toLowerCase();
  const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive'; label: string }> = {
    answered: { variant: 'default', label: 'Answered' },
    completed: { variant: 'default', label: 'Completed' },
    missed: { variant: 'destructive', label: 'Missed' },
    transferred: { variant: 'secondary', label: 'Transferred' },
  };
  const config = (outcome && variants[outcome]) || variants.answered;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function CallsPage() {
  const { calls, loading, error } = useCallLogs();
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);

  useEffect(() => {
    if (!selectedCall && calls.length > 0) {
      setSelectedCall(calls[0]);
    }
  }, [calls, selectedCall]);

  const formattedCalls = useMemo(
    () =>
      calls.map((call) => ({
        ...call,
        createdLabel: call.created_at ? format(new Date(call.created_at), 'MMM d, yyyy h:mm a') : '—',
      })),
    [calls],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Calls</h1>
        <p className="mt-1 text-muted-foreground">View and manage all call activity</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Call History</CardTitle>
            {loading ? <span className="text-xs text-muted-foreground">Loading...</span> : null}
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-sm text-muted-foreground">Call data unavailable.</p>
          ) : formattedCalls.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent calls yet.</p>
          ) : (
            <div className="space-y-1">
              <div className="grid grid-cols-6 gap-4 border-b pb-3 text-sm font-medium text-muted-foreground">
                <div className="col-span-2">Caller / Time</div>
                <div>Duration</div>
                <div>Status</div>
                <div>Recording</div>
                <div>Transcript</div>
              </div>

              {formattedCalls.map((call) => (
                <button
                  type="button"
                  key={call.id}
                  className="grid grid-cols-6 gap-4 border-b py-4 text-left transition-colors last:border-0 hover:bg-muted/40"
                  onClick={() => setSelectedCall(call)}
                >
                  <div className="col-span-2">
                    <p className="font-medium text-foreground">{getCallerDisplayName(call)}</p>
                    <p className="text-sm text-muted-foreground">{call.createdLabel}</p>
                  </div>
                  <div className="flex items-center text-foreground">
                    {call.duration_seconds ? `${call.duration_seconds}s` : '—'}
                  </div>
                  <div className="flex items-center">{getOutcomeBadge(call.status)}</div>
                  <div className="flex items-center text-muted-foreground">
                    {call.recording_url ? <Volume2 className="h-4 w-4 text-primary" /> : <span className="text-sm">—</span>}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    {call.transcript ? <FileText className="h-4 w-4 text-green-600" /> : <span className="text-sm">—</span>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={!!selectedCall} onOpenChange={() => setSelectedCall(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
          {selectedCall && (
            <>
              <SheetHeader>
                <SheetTitle>Call Details</SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{getCallerDisplayName(selectedCall)}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedCall.created_at ? format(new Date(selectedCall.created_at), 'MMM d, yyyy h:mm a') : '—'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/60 p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium text-foreground">{selectedCall.duration_seconds ? `${selectedCall.duration_seconds}s` : '—'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="mt-1">{getOutcomeBadge(selectedCall.status)}</div>
                    </div>
                  </div>
                </div>

                {selectedCall.recording_url ? (
                  <div className="space-y-2">
                    <h3 className="flex items-center gap-2 font-medium">
                      <Volume2 className="h-4 w-4" />
                      Recording
                    </h3>
                    <div className="rounded-lg bg-muted/60 p-4">
                      <audio controls className="w-full">
                        <source src={selectedCall.recording_url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg bg-muted/60 p-4 text-center text-muted-foreground">Recording unavailable</div>
                )}

                {selectedCall.transcript ? (
                  <div className="space-y-2">
                    <h3 className="flex items-center gap-2 font-medium">
                      <FileText className="h-4 w-4" />
                      Transcript
                    </h3>
                    <div className="space-y-2 rounded-lg bg-muted/60 p-4 text-left text-sm">
                      {selectedCall.transcript.split('\n').map((line: string, index: number) => (
                        <p key={index}>{line}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg bg-muted/60 p-4 text-center text-muted-foreground">Transcript unavailable</div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

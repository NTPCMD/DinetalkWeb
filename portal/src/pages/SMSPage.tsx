import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Label } from '@/ui/label';
import { Switch } from '@/ui/switch';
import { Badge } from '@/ui/badge';
import { MessageSquare, CheckCircle } from 'lucide-react';

const placeholderTemplate =
  "Thank you for calling! Your reservation for {guests} on {date} at {time} is confirmed. Reply CANCEL to modify.";

export function SMSPage() {
  const [smsEnabled, setSmsEnabled] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">SMS</h1>
        <p className="mt-1 text-muted-foreground">Configure SMS confirmation messages</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>SMS Confirmations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-toggle" className="text-base">
                Enable SMS Confirmations
              </Label>
              <p className="text-sm text-muted-foreground">Send automated confirmation messages to customers</p>
            </div>
            <Switch id="sms-toggle" checked={smsEnabled} onCheckedChange={setSmsEnabled} />
          </div>

          {smsEnabled ? (
            <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span>SMS confirmations are active</span>
            </div>
          ) : (
            <div className="rounded-md bg-muted/60 p-3 text-sm text-muted-foreground">
              SMS confirmations are currently disabled.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Message Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-muted bg-muted/40 p-4">
            <div className="flex items-start gap-3">
              <MessageSquare className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="leading-relaxed text-sm text-foreground">{placeholderTemplate}</p>
                <p className="mt-2 text-xs text-muted-foreground">Variables: {'{guests}'}, {'{date}'}, {'{time}'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-primary/5 p-4">
              <p className="text-sm text-primary">SMS Sent This Month</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">—</p>
              <p className="text-xs text-muted-foreground">Live counts will appear once SMS is enabled.</p>
            </div>
            <div className="rounded-lg bg-muted/60 p-4">
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="mt-2">
                <Badge variant={smsEnabled ? 'default' : 'secondary'}>
                  {smsEnabled ? 'Active' : 'Disabled'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

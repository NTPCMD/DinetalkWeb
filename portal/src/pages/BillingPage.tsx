import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/badge';
import { Progress } from '@/ui/progress';
import { CreditCard, Download } from 'lucide-react';

const placeholderBilling = {
  currentPlan: 'Professional',
  monthlyCost: 149,
  usage: {
    minutesUsed: 0,
    minutesIncluded: 500,
    callsHandled: 0,
  },
  invoices: [
    { id: 'INV-001', date: '—', amount: 0, status: 'pending' },
    { id: 'INV-002', date: '—', amount: 0, status: 'pending' },
  ],
};

export function BillingPage() {
  const minutesPercent = (placeholderBilling.usage.minutesUsed / placeholderBilling.usage.minutesIncluded) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Billing</h1>
        <p className="mt-1 text-muted-foreground">Manage your subscription and view invoices</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold">{placeholderBilling.currentPlan}</p>
              <p className="text-muted-foreground">${placeholderBilling.monthlyCost}/month</p>
            </div>
            <Button variant="outline">Upgrade Plan</Button>
          </div>
          <p className="text-sm text-muted-foreground">Plan management will be available soon.</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Minutes Used</span>
              <span className="font-medium">
                {placeholderBilling.usage.minutesUsed} / {placeholderBilling.usage.minutesIncluded}
              </span>
            </div>
            <Progress value={minutesPercent} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-primary/5 p-4">
              <p className="text-sm text-primary">Calls Handled</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{placeholderBilling.usage.callsHandled}</p>
            </div>
            <div className="rounded-lg bg-muted/60 p-4">
              <p className="text-sm text-muted-foreground">Remaining Minutes</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">
                {placeholderBilling.usage.minutesIncluded - placeholderBilling.usage.minutesUsed}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Invoice History</CardTitle>
            <Button variant="ghost" size="sm" disabled>
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="grid grid-cols-4 gap-4 border-b pb-3 text-sm font-medium text-muted-foreground">
              <div>Invoice ID</div>
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
            </div>

            {placeholderBilling.invoices.map((invoice) => (
              <div key={invoice.id} className="grid grid-cols-4 gap-4 border-b py-4 last:border-0">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{invoice.id}</span>
                </div>
                <div className="flex items-center text-foreground">{invoice.date}</div>
                <div className="flex items-center font-medium">${invoice.amount}</div>
                <div className="flex items-center">
                  <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>{invoice.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="mb-4 text-muted-foreground">Need help with billing?</p>
            <Button variant="outline">Contact Support</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

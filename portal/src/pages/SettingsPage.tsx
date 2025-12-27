import { useOutletContext } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Switch } from '@/ui/switch';
import type { PortalOutletContext } from '@/components/layout/AppLayout';

export function SettingsPage() {
  const { restaurant, restaurantLoading } = useOutletContext<PortalOutletContext>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage restaurant settings and preferences</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Restaurant Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {restaurantLoading ? (
            <p className="text-sm text-muted-foreground">Loading restaurant details...</p>
          ) : restaurant ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="restaurant-name">Restaurant Name</Label>
                <Input id="restaurant-name" value={restaurant.name} readOnly />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={restaurant.address ?? '—'} readOnly />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" value={restaurant.timezone ?? '—'} readOnly />
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Restaurant details will appear once provisioning completes.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Phone Numbers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="public-phone">Public Phone Number</Label>
            <Input id="public-phone" value={restaurant?.phone_number ?? '—'} readOnly />
            <p className="text-sm text-muted-foreground">The number customers call</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transfer-phone">Transfer Phone Number</Label>
            <Input id="transfer-phone" value={restaurant?.transfer_phone ?? '—'} readOnly />
            <p className="text-sm text-muted-foreground">Number to transfer calls to</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="calls-enabled">Calls Portal</Label>
              <p className="text-sm text-muted-foreground">Enable the calls management portal</p>
            </div>
            <Switch id="calls-enabled" checked={!!restaurant?.calls_portal_enabled} disabled />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="recordings-enabled">Call Recordings</Label>
              <p className="text-sm text-muted-foreground">Record all incoming calls</p>
            </div>
            <Switch id="recordings-enabled" checked disabled />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="transcripts-enabled">Call Transcripts</Label>
              <p className="text-sm text-muted-foreground">Generate transcripts for all calls</p>
            </div>
            <Switch id="transcripts-enabled" checked disabled />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

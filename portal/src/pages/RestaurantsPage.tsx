import { useOutletContext, Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/components/common/EmptyState';
import { supabase } from '@/lib/supabaseClient';
import type { PortalOutletContext } from '@/routes/types';

export default function RestaurantsPage() {
  const { account, restaurants, refreshRestaurants } = useOutletContext<PortalOutletContext>();
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreating(true);
    setError(null);
    const { error: insertError } = await supabase.from('restaurants').insert({
      name,
      account_id: account.id,
    });
    setCreating(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setName('');
    await refreshRestaurants();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Restaurants</h1>
          <p className="text-sm text-slate-600">Manage the locations connected to your Voice AI agent.</p>
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Add a restaurant</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-[2fr,auto]" onSubmit={handleCreate}>
            <div className="space-y-2">
              <Label htmlFor="restaurant-name">Name</Label>
              <Input
                id="restaurant-name"
                placeholder="Frankie's Pizza"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" disabled={creating || !name.trim()} className="w-full md:w-auto">
                {creating ? 'Creating...' : 'Create restaurant'}
              </Button>
            </div>
          </form>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Locations</CardTitle>
        </CardHeader>
        <CardContent>
          {restaurants.length === 0 ? (
            <EmptyState
              title="No restaurants yet"
              description="Create your first restaurant to start reviewing call history."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Calls</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {restaurants.map((restaurant) => (
                  <TableRow key={restaurant.id}>
                    <TableCell className="font-medium text-slate-900">{restaurant.name}</TableCell>
                    <TableCell className="text-sm text-slate-600">{restaurant.calls_portal_enabled ? 'Enabled' : 'Disabled'}</TableCell>
                    <TableCell className="text-right text-sm">
                      <Link
                        to={`/r/${restaurant.id}/calls`}
                        className="text-primary font-semibold hover:underline"
                      >
                        View calls
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Search, ChevronLeft, ChevronRight, Phone, PhoneForwarded, PhoneMissed } from 'lucide-react';
import { format } from 'date-fns';

interface Call {
  id: string;
  created_at: string;
  caller: string;
  status: 'ai_handled' | 'transferred' | 'missed';
  topic: string;
  duration: number;
  is_after_hours: boolean;
}

interface CallLogsProps {
  calls: Call[];
  onCallClick: (callId: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CallLogs({ calls, onCallClick, currentPage, totalPages, onPageChange }: CallLogsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ai_handled':
        return (
          <Badge className="bg-success text-white flex items-center gap-1">
            <Phone className="size-3" />
            AI Handled
          </Badge>
        );
      case 'transferred':
        return (
          <Badge className="bg-warning text-foreground flex items-center gap-1">
            <PhoneForwarded className="size-3" />
            Transferred
          </Badge>
        );
      case 'missed':
        return (
          <Badge className="bg-error text-white flex items-center gap-1">
            <PhoneMissed className="size-3" />
            Missed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredCalls = calls.filter(call =>
    call.caller.toLowerCase().includes(searchQuery.toLowerCase()) ||
    call.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Call Logs</h1>
        <p className="text-muted-foreground">View and search all customer calls</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Calls</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by caller or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Recent Calls
            <span className="text-muted-foreground font-normal ml-2">
              ({filteredCalls.length} {filteredCalls.length === 1 ? 'call' : 'calls'})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Caller</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      {searchQuery ? 'No calls found matching your search' : 'No calls yet'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCalls.map((call) => (
                    <TableRow
                      key={call.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => onCallClick(call.id)}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {format(new Date(call.created_at), 'MMM d, yyyy')}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(call.created_at), 'h:mm a')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{call.caller}</div>
                        {call.is_after_hours && (
                          <div className="text-xs text-muted-foreground">After hours</div>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(call.status)}</TableCell>
                      <TableCell className="max-w-xs truncate">{call.topic}</TableCell>
                      <TableCell className="text-right">{formatDuration(call.duration)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredCalls.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                {searchQuery ? 'No calls found matching your search' : 'No calls yet'}
              </div>
            ) : (
              filteredCalls.map((call) => (
                <Card
                  key={call.id}
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => onCallClick(call.id)}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{call.caller}</div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(call.created_at), 'MMM d, yyyy • h:mm a')}
                          </div>
                        </div>
                        {getStatusBadge(call.status)}
                      </div>
                      <div className="text-sm">{call.topic}</div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Duration: {formatDuration(call.duration)}</span>
                        {call.is_after_hours && <span className="text-xs">After hours</span>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

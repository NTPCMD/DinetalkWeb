import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Phone, PhoneForwarded, PhoneMissed, Clock, TrendingUp, Moon } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

interface Analytics {
  totalCalls: number;
  aiHandled: number;
  transferred: number;
  missed: number;
  afterHours: number;
  avgDuration: number;
  aiPercentage: number;
  callRecordingEnabled: boolean;
  callTranscriptsEnabled: boolean;
}

interface DashboardProps {
  analytics: Analytics;
  restaurantName: string;
}

export function Dashboard({ analytics, restaurantName }: DashboardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const stats = [
    {
      title: 'Total Calls',
      value: analytics.totalCalls,
      icon: Phone,
      color: 'text-foreground',
    },
    {
      title: 'AI Handled',
      value: analytics.aiHandled,
      icon: TrendingUp,
      color: 'text-success',
    },
    {
      title: 'Transferred',
      value: analytics.transferred,
      icon: PhoneForwarded,
      color: 'text-warning',
    },
    {
      title: 'Missed',
      value: analytics.missed,
      icon: PhoneMissed,
      color: 'text-error',
    },
  ];

  const metrics = [
    {
      title: 'AI Success Rate',
      value: `${analytics.aiPercentage.toFixed(1)}%`,
      description: 'Calls fully handled by AI',
    },
    {
      title: 'Average Call Duration',
      value: formatDuration(analytics.avgDuration),
      description: 'Mean call time',
    },
    {
      title: 'After-Hours Calls',
      value: analytics.afterHours,
      description: 'Calls outside business hours',
      icon: Moon,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{restaurantName}</h1>
        <p className="text-muted-foreground">Call analytics and performance overview</p>
      </div>

      {/* Call Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`size-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                {metric.title}
                {metric.icon && <metric.icon className="size-4 text-muted-foreground" />}
              </CardTitle>
              <CardDescription>{metric.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add-ons Status */}
      <Card>
        <CardHeader>
          <CardTitle>Add-On Features</CardTitle>
          <CardDescription>Current feature availability for your plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Call Recording</h4>
              <p className="text-sm text-muted-foreground">Record all customer calls</p>
            </div>
            {analytics.callRecordingEnabled ? (
              <Badge className="bg-success text-white">Enabled</Badge>
            ) : (
              <div className="text-right">
                <Badge variant="outline">Disabled</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Available as an add-on — contact DineTalk support
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Call Transcripts</h4>
              <p className="text-sm text-muted-foreground">Full text transcripts of calls</p>
            </div>
            {analytics.callTranscriptsEnabled ? (
              <Badge className="bg-success text-white">Enabled</Badge>
            ) : (
              <div className="text-right">
                <Badge variant="outline">Disabled</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Available as an add-on — contact DineTalk support
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatItem {
  label: string;
  value: string | number;
  unit?: string;
  tooltip?: string;
}

interface DetailedStatsDisplayProps {
  stats: StatItem[];
  title?: string;
}

const DetailedStatsDisplay: React.FC<DetailedStatsDisplayProps> = ({ stats, title = "Detailed Statistics" }) => {
  console.log("Rendering DetailedStatsDisplay with stats:", stats.length);

  if (!stats || stats.length === 0) {
    return (
      <Card>
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">No statistics available.</p></CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="border-b border-border/50 pb-2 last:border-b-0 md:last:border-b-0">
              <dt className="text-sm font-medium text-muted-foreground mb-0.5">{stat.label}</dt>
              <dd className="text-lg font-semibold text-foreground">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                {stat.unit && <span className="text-sm text-muted-foreground ml-1">{stat.unit}</span>}
              </dd>
              {/* Add Tooltip component here if stat.tooltip exists */}
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
};

export default DetailedStatsDisplay;
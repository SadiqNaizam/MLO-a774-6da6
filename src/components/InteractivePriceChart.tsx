import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"


// Example data structure - replace with actual fetched data
// Each data point should have a 'timestamp' (unix or Date object) and 'price'
type PriceDataPoint = {
  timestamp: number | Date; // Unix timestamp (seconds or ms) or Date object
  price: number;
};

interface InteractivePriceChartProps {
  data: PriceDataPoint[]; // Array of price data points
  // Potentially add props for color, default timeframe, etc.
}

const timeframes = [
  { label: '1D', value: '1D' },
  { label: '7D', value: '7D' },
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '1Y', value: '1Y' },
  { label: 'All', value: 'ALL' },
];

const InteractivePriceChart: React.FC<InteractivePriceChartProps> = ({ data }) => {
  console.log("Rendering InteractivePriceChart with data points:", data.length);
  const [activeTimeframe, setActiveTimeframe] = useState('1M'); // Default timeframe

  // This is a placeholder. In a real app, you'd filter/fetch data based on timeframe.
  const chartData = data.map(d => ({
    ...d,
    // Ensure timestamp is a number (milliseconds) if it's a Date object
    timestamp: typeof d.timestamp === 'number' ? d.timestamp : d.timestamp.getTime(),
  }));


  const handleTimeframeChange = (value: string) => {
    if (value) { // value can be empty string if ToggleGroup allows deselection with type="single"
      setActiveTimeframe(value);
      console.log("Timeframe changed to:", value);
      // Add logic here to fetch or filter data for the new timeframe
    }
  };

  if (!chartData || chartData.length === 0) {
    return <div className="h-96 flex items-center justify-center bg-muted rounded-md text-muted-foreground">No price data available.</div>;
  }

  return (
    <div className="w-full h-[400px] md:h-[500px] p-4 bg-card rounded-lg shadow">
      <div className="flex justify-end mb-4">
        <ToggleGroup type="single" defaultValue={activeTimeframe} onValueChange={handleTimeframeChange} aria-label="Select timeframe">
          {timeframes.map(tf => (
            <ToggleGroupItem key={tf.value} value={tf.value} aria-label={tf.label} className="px-3 py-1.5 text-xs">
              {tf.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(unixTime) => format(new Date(unixTime), 'MMM dd, yy')} // Adjust format as needed
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={(price) => `$${price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            orientation="right"
            width={80}
          />
          <Tooltip
            contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
            labelFormatter={(label) => format(new Date(label), 'PPpp')}
            formatter={(value: number) => [`$${value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})}`, "Price"]}
          />
          <Legend wrapperStyle={{fontSize: '12px'}}/>
          <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Price (USD)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InteractivePriceChart;
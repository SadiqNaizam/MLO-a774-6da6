import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'; // Example icons

interface BitcoinHighlightPanelProps {
  price: number;
  change24h: number; // Percentage change
  volume24h: number;
}

const BitcoinHighlightPanel: React.FC<BitcoinHighlightPanelProps> = ({
  price,
  change24h,
  volume24h,
}) => {
  console.log("Rendering BitcoinHighlightPanel");
  const isPositiveChange = change24h >= 0;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="Bitcoin" className="w-6 h-6 mr-2" /> {/* Example BTC icon */}
          Bitcoin (BTC) Highlight
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col space-y-1">
          <span className="text-sm text-muted-foreground">Current Price</span>
          <span className="text-2xl font-semibold flex items-center">
            <DollarSign className="h-5 w-5 mr-1 text-muted-foreground" />
            {price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-sm text-muted-foreground">24h Change</span>
          <span className={`text-2xl font-semibold flex items-center ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
            {isPositiveChange ? <TrendingUp className="h-5 w-5 mr-1" /> : <TrendingDown className="h-5 w-5 mr-1" />}
            {change24h.toFixed(2)}%
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-sm text-muted-foreground">24h Volume</span>
          <span className="text-2xl font-semibold">
            ${volume24h.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BitcoinHighlightPanel;
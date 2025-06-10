import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CryptoSummaryCardProps {
  id: string; // e.g., 'bitcoin', 'ethereum' for routing
  name: string;
  symbol: string;
  price: number;
  change24h: number; // Percentage
  imageUrl?: string;
}

const CryptoSummaryCard: React.FC<CryptoSummaryCardProps> = ({
  id,
  name,
  symbol,
  price,
  change24h,
  imageUrl,
}) => {
  console.log("Rendering CryptoSummaryCard for:", name);
  const isPositiveChange = change24h >= 0;

  return (
    <Card className="w-full max-w-xs transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{name} ({symbol.toUpperCase()})</CardTitle>
        {imageUrl && <img src={imageUrl} alt={name} className="w-8 h-8 rounded-full" />}
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-2xl font-bold">${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <p className={`text-xs ${isPositiveChange ? 'text-green-600' : 'text-red-600'} flex items-center`}>
          {isPositiveChange ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
          {change24h.toFixed(2)}% (24h)
        </p>
      </CardContent>
      <CardFooter>
        <Link to={`/crypto/${id}`} className="w-full">
          <Button className="w-full">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CryptoSummaryCard;
import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder data structure for cryptocurrencies
const placeholderCryptos = [
  { id: 'bitcoin', rank: 1, name: 'Bitcoin', symbol: 'BTC', price: 60000.00, change24h: 2.5, marketCap: 1200000000000, volume24h: 35000000000, imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' },
  { id: 'ethereum', rank: 2, name: 'Ethereum', symbol: 'ETH', price: 3500.75, change24h: 5.2, marketCap: 420000000000, volume24h: 15000000000, imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
  { id: 'tether', rank: 3, name: 'Tether USDt', symbol: 'USDT', price: 1.00, change24h: 0.01, marketCap: 110000000000, volume24h: 50000000000, imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png' },
  { id: 'binancecoin', rank: 4, name: 'BNB', symbol: 'BNB', price: 580.50, change24h: -1.5, marketCap: 85000000000, volume24h: 2000000000, imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png' },
  { id: 'solana', rank: 5, name: 'Solana', symbol: 'SOL', price: 150.20, change24h: -2.1, marketCap: 70000000000, volume24h: 3000000000, imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png' },
];

const AllCryptocurrenciesPage = () => {
  console.log('AllCryptocurrenciesPage loaded');
  // TODO: Implement actual sorting, searching, and pagination logic
  const [searchTerm, setSearchTerm] = React.useState('');
  // const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  const filteredCryptos = placeholderCryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">All Cryptocurrencies</h1>
          <p className="text-muted-foreground">Browse and discover digital assets.</p>
        </header>

        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search by name or symbol..."
            className="w-full md:w-1/2 lg:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableCaption>A list of top cryptocurrencies. Prices are illustrative.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h %</TableHead>
                <TableHead className="hidden md:table-cell text-right">Market Cap</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Volume (24h)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCryptos.map((crypto) => (
                <TableRow key={crypto.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{crypto.rank}</TableCell>
                  <TableCell>
                    <Link to={`/crypto/${crypto.id}`} className="flex items-center space-x-2 hover:underline">
                      <img src={crypto.imageUrl} alt={crypto.name} className="w-6 h-6 rounded-full" />
                      <div>
                        <span className="font-medium">{crypto.name}</span>
                        <span className="text-muted-foreground ml-1">{crypto.symbol.toUpperCase()}</span>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right font-medium">${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                  <TableCell className={`text-right font-medium ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="inline-flex items-center">
                      {crypto.change24h >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      {crypto.change24h.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right">${crypto.marketCap.toLocaleString()}</TableCell>
                  <TableCell className="hidden lg:table-cell text-right">${crypto.volume24h.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllCryptocurrenciesPage;
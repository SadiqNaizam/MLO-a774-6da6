import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import BitcoinHighlightPanel from '@/components/BitcoinHighlightPanel';
import { Input } from '@/components/ui/input';
import H2_Heading_for_Top_Movers from '@/components/H2_Heading_for_Top_Movers';
import CryptoSummaryCard from '@/components/CryptoSummaryCard';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';

const placeholderTopMovers = [
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3500.75, change24h: 5.2, imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
  { id: 'solana', name: 'Solana', symbol: 'SOL', price: 150.20, change24h: -2.1, imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.15, change24h: 10.5, imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png' },
];

const Homepage = () => {
  console.log('Homepage loaded');
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <BitcoinHighlightPanel price={60000.00} change24h={2.5} volume24h={35000000000} />
        </section>

        <section className="mb-12">
          <Input
            type="search"
            placeholder="Search cryptocurrencies (e.g., Bitcoin, Ethereum...)"
            className="w-full max-w-2xl mx-auto text-lg p-4"
          />
        </section>

        <section className="mb-12">
          <H2_Heading_for_Top_Movers />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderTopMovers.map(crypto => (
              <CryptoSummaryCard
                key={crypto.id}
                id={crypto.id}
                name={crypto.name}
                symbol={crypto.symbol}
                price={crypto.price}
                change24h={crypto.change24h}
                imageUrl={crypto.imageUrl}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/cryptocurrencies">
              <Button size="lg" variant="outline">View All Cryptocurrencies</Button>
            </Link>
          </div>
        </section>
        {/* Additional sections can be added here */}
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
import React from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import H1_Heading_Crypto_Name from '@/components/H1_Heading_Crypto_Name';
import InteractivePriceChart from '@/components/InteractivePriceChart';
import DetailedStatsDisplay from '@/components/DetailedStatsDisplay';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea'; // Though a 'p' or 'div' is better for static description
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

// Mock function to get crypto details by ID
const getCryptoDetails = (id: string) => {
  // In a real app, this would fetch data from an API
  const cryptos: {[key: string]: any} = {
    bitcoin: { name: 'Bitcoin', symbol: 'BTC', imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png', price: 60000.00, description: 'Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.', stats: [{label: 'Market Cap', value: 1200000000000, unit: 'USD'}, {label: 'Volume (24h)', value: 35000000000, unit: 'USD'}, {label: 'Circulating Supply', value: 19700000, unit: 'BTC'}, {label: 'Max Supply', value: 21000000, unit: 'BTC'}] },
    ethereum: { name: 'Ethereum', symbol: 'ETH', imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', price: 3500.75, description: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether (ETH) is the native cryptocurrency of the platform.', stats: [{label: 'Market Cap', value: 420000000000, unit: 'USD'}, {label: 'Volume (24h)', value: 15000000000, unit: 'USD'}, {label: 'Circulating Supply', value: 120000000, unit: 'ETH'}] },
    // Add more cryptos as needed for testing
  };
  return cryptos[id] || null;
};

// Generate dummy price data for the chart
const generatePriceData = (days: number) => {
  const data = [];
  let price = 50000 + Math.random() * 10000;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const timestamp = new Date(startDate);
    timestamp.setDate(timestamp.getDate() + i);
    price += (Math.random() - 0.5) * 2000; // Simulate price fluctuation
    if (price < 1000) price = 1000; // Ensure price doesn't go too low
    data.push({ timestamp: timestamp.getTime(), price });
  }
  return data;
};

const CryptoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log('CryptoDetailPage loaded for ID:', id);

  // Fetch or use placeholder data for the crypto
  const crypto = id ? getCryptoDetails(id) : null;
  const priceData = React.useMemo(() => generatePriceData(90), []); // 90 days of data

  if (!crypto) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Cryptocurrency not found.</h1>
          <p>The crypto with ID "{id}" could not be located.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/cryptocurrencies">Cryptocurrencies</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{crypto.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
             <Avatar className="w-12 h-12 mr-4">
                <AvatarImage src={crypto.imageUrl} alt={crypto.name} />
                <AvatarFallback>{crypto.symbol.substring(0,2)}</AvatarFallback>
            </Avatar>
            <H1_Heading_Crypto_Name name={crypto.name} symbol={crypto.symbol} />
          </div>
          <Button variant="outline" size="lg">
            <PlusCircle className="mr-2 h-5 w-5" /> Add to Watchlist
          </Button>
        </section>

        <section className="mb-12">
          <InteractivePriceChart data={priceData} />
        </section>

        <section className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <DetailedStatsDisplay stats={crypto.stats} title={`${crypto.name} Statistics`} />
            </div>
             <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>About {crypto.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {crypto.description}
                    </p>
                </CardContent>
            </Card>
        </section>
        
        <section>
            <Tabs defaultValue="news" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    <TabsTrigger value="news">News</TabsTrigger>
                    <TabsTrigger value="social">Social Sentiment</TabsTrigger>
                </TabsList>
                <TabsContent value="analysis">
                    <Card>
                        <CardHeader><CardTitle>Market Analysis</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Placeholder for technical analysis, charts, or expert opinions on {crypto.name}.</p>
                            {/* Example of using Textarea if it were for user input */}
                            {/* <Textarea placeholder="Your notes on the analysis..." className="mt-4" /> */}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="news">
                    <Card>
                        <CardHeader><CardTitle>Latest News</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Placeholder for aggregated news articles related to {crypto.name}.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="social">
                    <Card>
                        <CardHeader><CardTitle>Social Sentiment</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Placeholder for social media trends and sentiment indicators for {crypto.name}.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default CryptoDetailPage;
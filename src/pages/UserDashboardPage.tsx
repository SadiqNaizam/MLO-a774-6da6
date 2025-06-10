import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import H2_Heading_Watchlist from '@/components/H2_Heading_Watchlist';
import H2_Heading_Profile from '@/components/H2_Heading_Profile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"; // Assuming usage with react-hook-form
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Using Label from shadcn/ui
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link } from 'react-router-dom';
import { Trash2, Edit3, PlusCircle } from 'lucide-react';

// Placeholder watchlist data
const placeholderWatchlist = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 60000.00, change24h: 2.5, imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3500.75, change24h: 5.2, imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
];

// Zod schema for profile form
const profileFormSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }).max(50),
  email: z.string().email({ message: "Please enter a valid email." }),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8, { message: "New password must be at least 8 characters." }).optional().or(z.literal('')),
  confirmNewPassword: z.string().optional().or(z.literal('')),
}).refine(data => {
    if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
        return false;
    }
    return true;
}, {
    message: "New passwords do not match.",
    path: ["confirmNewPassword"],
});


const UserDashboardPage = () => {
  console.log('UserDashboardPage loaded');

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "CryptoUser123", // Placeholder
      email: "user@example.com", // Placeholder
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log("Profile updated:", values);
    // Handle profile update logic (e.g., API call)
    // Show success toast
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
          <p className="text-muted-foreground">Manage your watchlist and profile settings.</p>
        </header>

        <Tabs defaultValue="watchlist" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[300px] mb-6">
            <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="watchlist">
            <div className="flex justify-between items-center mb-4">
                <H2_Heading_Watchlist />
                <Link to="/cryptocurrencies">
                    <Button variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Cryptos
                    </Button>
                </Link>
            </div>
            {placeholderWatchlist.length > 0 ? (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableCaption>Your watched cryptocurrencies.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">24h %</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {placeholderWatchlist.map((crypto) => (
                      <TableRow key={crypto.id}>
                        <TableCell>
                          <Link to={`/crypto/${crypto.id}`} className="flex items-center space-x-2 hover:underline">
                            <img src={crypto.imageUrl} alt={crypto.name} className="w-6 h-6 rounded-full" />
                            <div>
                                <span className="font-medium">{crypto.name}</span>
                                <span className="text-muted-foreground ml-1">{crypto.symbol.toUpperCase()}</span>
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell className="text-right font-medium">${crypto.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        <TableCell className={`text-right font-medium ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {crypto.change24h.toFixed(2)}%
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => console.log('Remove', crypto.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove from watchlist</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
                <div className="text-center py-12 border rounded-md">
                    <p className="text-muted-foreground mb-4">Your watchlist is empty.</p>
                    <Link to="/cryptocurrencies">
                        <Button>Discover Cryptocurrencies</Button>
                    </Link>
                </div>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <H2_Heading_Profile />
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information and password.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Your username" {...field} />
                          </FormControl>
                          <FormDescription>This is your public display name.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <h3 className="text-lg font-medium pt-4 border-t">Change Password</h3>
                     <FormField
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter current password" {...field} />
                          </FormControl>
                           <FormDescription>Required only if changing password.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter new password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmNewPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirm new password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;
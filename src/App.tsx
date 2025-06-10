import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import AllCryptocurrenciesPage from "./pages/AllCryptocurrenciesPage";
import CryptoDetailPage from "./pages/CryptoDetailPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cryptocurrencies" element={<AllCryptocurrenciesPage />} />
          <Route path="/crypto/:id" element={<CryptoDetailPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/auth" element={<AuthenticationPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
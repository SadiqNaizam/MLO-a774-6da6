import React from 'react';
import { Eye } from 'lucide-react'; // Example icon

interface H2HeadingWatchlistProps {
  children?: React.ReactNode;
}

const H2_Heading_Watchlist: React.FC<H2HeadingWatchlistProps> = ({ children }) => {
  console.log("Rendering H2_Heading_Watchlist");
  return (
    <h2 className="text-2xl font-semibold tracking-tight my-4 flex items-center">
      <Eye className="w-6 h-6 mr-2 text-primary" />
      {children || "My Watchlist"}
    </h2>
  );
};

export default H2_Heading_Watchlist;
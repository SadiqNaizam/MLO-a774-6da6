import React from 'react';

interface H1HeadingCryptoNameProps {
  name: string;
  symbol?: string;
  imageUrl?: string;
}

const H1_Heading_Crypto_Name: React.FC<H1HeadingCryptoNameProps> = ({ name, symbol, imageUrl }) => {
  console.log("Rendering H1_Heading_Crypto_Name for:", name);
  return (
    <div className="flex items-center space-x-3 my-4">
      {imageUrl && <img src={imageUrl} alt={name} className="w-10 h-10 md:w-12 md:h-12 rounded-full" />}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        {name}
        {symbol && <span className="text-muted-foreground ml-2 text-xl md:text-2xl">({symbol.toUpperCase()})</span>}
      </h1>
    </div>
  );
};

export default H1_Heading_Crypto_Name;
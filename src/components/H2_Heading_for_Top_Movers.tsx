import React from 'react';

interface H2HeadingForTopMoversProps {
  children?: React.ReactNode; // Allow children to override default text
}

const H2_Heading_for_Top_Movers: React.FC<H2HeadingForTopMoversProps> = ({ children }) => {
  console.log("Rendering H2_Heading_for_Top_Movers");
  return (
    <h2 className="text-2xl font-semibold tracking-tight my-4">
      {children || "Top Movers"}
    </h2>
  );
};

export default H2_Heading_for_Top_Movers;
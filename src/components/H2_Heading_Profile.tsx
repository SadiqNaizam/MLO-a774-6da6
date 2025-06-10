import React from 'react';
import { UserCircle2 } from 'lucide-react'; // Example icon

interface H2HeadingProfileProps {
  children?: React.ReactNode;
}

const H2_Heading_Profile: React.FC<H2HeadingProfileProps> = ({ children }) => {
  console.log("Rendering H2_Heading_Profile");
  return (
    <h2 className="text-2xl font-semibold tracking-tight my-4 flex items-center">
      <UserCircle2 className="w-6 h-6 mr-2 text-primary" />
      {children || "Profile Settings"}
    </h2>
  );
};

export default H2_Heading_Profile;
import "@styles/globals.css";
import React, { ReactNode } from "react";

export const metadata = {
  title: "Sysmart.io",
  description: "A Marketplace by Sysvoy International",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <div className="main"></div>

      <div className="app gradient">{children}</div>
    </html>
  );
};

export default RootLayout;

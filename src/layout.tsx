import React, { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <div className="app gradient">{children}</div>
    </html>
  );
};

export default RootLayout;

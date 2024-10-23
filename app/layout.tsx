import "@styles/global.css";
import React, { Children, ReactNode } from "react";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "PromptVerse",
  description: "A place to Discover & Share AI generated prompts",
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children } :RootLayoutProps ) => {
  return (
    <html>
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout;
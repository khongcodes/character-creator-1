///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. React & packages
// 2. Styles

import React from "react";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode;
}

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

const Header: React.FC = () => {
  return (
    <div id="header-root">
      i'm header
    </div>
  )
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div id="layout-root">
      <Header />

      { children }
    </div>
  )
}

export default Layout;
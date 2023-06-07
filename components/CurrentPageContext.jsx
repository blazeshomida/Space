'use client'

import React, {useState} from 'react'
export const CurrentPageContext = React.createContext('/');

export const CurrentPageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState('/');
  
    return (
      <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
        {children}
      </CurrentPageContext.Provider>
    );
  };
  
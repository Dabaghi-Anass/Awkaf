import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Always scroll to top when pathname changes
  }, [pathname]);

  return null; // This component doesn’t render anything
 
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Scroll() {
  const { pathname } = useLocation();

  useEffect(() => {
  
    if(pathname === '/about-us') {
        let scroll = $('#about-us-section').position().top;
        window.scrollTo(0, scroll);
    } else if(pathname === '/contact-us') {
        let scroll = $('#contact-us-section').position().top;
        window.scrollTo(0, scroll);
    } else {
        window.scrollTo(0, 0);
    }
    
  }, [pathname]);

  return null;
}
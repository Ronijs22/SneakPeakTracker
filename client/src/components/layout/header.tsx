import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart } from '@/hooks/use-cart';
import MobileMenu from './mobile-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Header() {
  const [location, navigate] = useLocation();
  const { openCart, getCartCount } = useCart();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-gradient-to-b from-white to-gray-300 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Navigation */}
        <div className="py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-heading font-bold text-secondary flex items-center">
              <img src="/assets/logo.png" alt="SNEAKPEAK" className="h-36 w-36 object-contain" />
            </Link>
          </div>

          {/* Search with Categories */}
          <div className="hidden md:flex relative flex-1 max-w-lg mx-8">
            <div className="flex w-full">
              <div className="relative w-full flex">
                {/* Search Input */}
                <form onSubmit={handleSearch} className="flex-1">
                  <Input
                    type="text"
                    placeholder="Meklēt..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-r-none border-l-0 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#B98615] focus:border-[#B98615]"
                  />
                </form>

                {/* Search Button */}
                <Button 
                  onClick={handleSearch}
                  className="bg-[#B98615] bg-opacity-65 hover:bg-opacity-100 text-black font-heading text-4xl rounded-r-full px-6 py-2 border border-black"
                  variant="default"
                >
                  MEKLĒT
                </Button>
              </div>
            </div>
          </div>

          {/* User Icons */}
          <div className="flex items-center space-x-4">
            {/* Login Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gray-300 rounded-full border-3 border-black flex items-center justify-center hover:bg-gray-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Ielogoties</DialogTitle>
                  <DialogDescription>
                    Lūdzu, ievadiet savu e-pastu un paroli, lai ielogotos
                  </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-pasts</Label>
                    <Input id="email" type="email" placeholder="jusu@epasts.lv" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Parole</Label>
                    <Input id="password" type="password" />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Veiksmīga ielogošanās!",
                        description: "Jūs esat veiksmīgi ielogojies sistēmā.",
                      });
                    }}
                  >
                    Ielogoties
                  </Button>
                </form>
                <DialogFooter>
                  <Button variant="outline" className="w-full">Reģistrēties</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Messages Icon */}
            <Link href="/messages" className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gray-300 rounded-full border-3 border-black flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </Link>

            {/* Notifications Icon */}
            <Link href="/notifications" className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gray-300 rounded-full border-3 border-black flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </Link>

            {/* Cart Icon & Text */}
            <div className="flex flex-col items-center">
              <button onClick={openCart} className="group">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gray-300 rounded-full border-3 border-black flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {getCartCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#B98615] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                        {getCartCount()}
                      </span>
                    )}
                  </div>
                  <span className="text-xs uppercase tracking-widest mt-1 font-medium text-right">MANS GROZS<br/>PROFILS</span>
                </div>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories Button + Main Navigation */}
        <nav className="hidden md:flex items-center bg-black text-white py-3">
          {/* All Categories Button */}
          <div className="relative mr-6 ml-4">
            <button className="bg-[#B98615] text-white uppercase tracking-wider text-xs px-5 py-2 rounded-full flex items-center">
              <div className="flex items-center mr-2">
                <div className="flex flex-col items-start space-y-1">
                  <span className="w-3 h-0.5 bg-white"></span>
                  <span className="w-3 h-0.5 bg-white"></span>
                  <span className="w-3 h-0.5 bg-white"></span>
                </div>
                <span className="ml-2">VISAS KATEGORIJAS</span>
              </div>
            </button>
          </div>

          {/* Main Navigation Links */}
          <ul className="flex space-x-10 px-6 justify-center w-full">
            <li>
              <Link 
                href="/"
                className="font-heading text-4xl hover:text-[#B98615] text-[#B98615] underline decoration-[#B98615] decoration-2 underline-offset-8"
              >
                SĀKUMS
              </Link>
            </li>
            <li>
              <Link 
                href="/about"
                className="font-heading text-4xl hover:text-[#B98615] underline decoration-1 underline-offset-8"
              >
                PAR MUMS
              </Link>
            </li>
            <li>
              <Link 
                href="/photos"
                className="font-heading text-4xl hover:text-[#B98615] underline decoration-1 underline-offset-8"
              >
                GALERIJA
              </Link>
            </li>
            <li>
              <Link 
                href="/offers"
                className="font-heading text-4xl hover:text-[#B98615] underline decoration-1 underline-offset-8"
              >
                PIEDĀVĀJUMI
              </Link>
            </li>
            <li>
              <Link 
                href="/contact"
                className="font-heading text-4xl hover:text-[#B98615] underline decoration-1 underline-offset-8"
              >
                KONTAKTI
              </Link>
            </li>
            <li>
              <Link 
                href="/complaints"
                className="font-heading text-4xl hover:text-[#B98615] underline decoration-1 underline-offset-8"
              >
                SŪDZĪBAS
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <MobileMenu 
          isOpen={showMobileMenu} 
          onClose={() => setShowMobileMenu(false)} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      )}
    </header>
  );
}
import { useState } from 'react';
import { Link } from 'wouter';
import { Input } from '@/components/ui/input';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  searchQuery, 
  setSearchQuery, 
  handleSearch 
}: MobileMenuProps) {
  return (
    <div 
      className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="p-4">
        <form onSubmit={handleSearch} className="relative mb-4">
          <Input 
            type="text" 
            placeholder="Search for sneakers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </form>
        
        <ul className="space-y-4">
          <li>
            <Link 
              href="/products?category=new"
              className="block font-medium"
              onClick={onClose}
            >
              Jaunumi
            </Link>
          </li>
          <li>
            <Link 
              href="/products?category=men"
              className="block font-medium"
              onClick={onClose}
            >
              Vīriešiem
            </Link>
          </li>
          <li>
            <Link 
              href="/products?category=women"
              className="block font-medium"
              onClick={onClose}
            >
              Sievietēm
            </Link>
          </li>
          <li>
            <Link 
              href="/products?category=kids"
              className="block font-medium"
              onClick={onClose}
            >
              Bērniem
            </Link>
          </li>
          <li>
            <Link 
              href="/products"
              className="block font-medium"
              onClick={onClose}
            >
              Kolekcijas
            </Link>
          </li>
          <li>
            <Link 
              href="/products?category=sale"
              className="block font-medium"
              onClick={onClose}
            >
              Izpārdošana
            </Link>
          </li>
          <li className="border-t border-gray-100 pt-4 mt-4">
            <Link 
              href="/account"
              className="block font-medium"
              onClick={onClose}
            >
              Account
            </Link>
          </li>
          <li>
            <Link 
              href="/wishlist"
              className="block font-medium"
              onClick={onClose}
            >
              Wishlist
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

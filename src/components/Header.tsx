import { Link, useLocation } from 'react-router-dom';
import { Wallet, Menu, X, ShoppingCart, Trophy, Home, LayoutDashboard, Eye, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export function Header() {
  const { isConnected, address, balance, connect, disconnect } = useWallet();
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/play', label: 'Play', icon: Trophy },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/transparency', label: 'Transparency', icon: Eye },
    { href: '/about', label: 'About', icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-gradient-primary">
              EasyPicks
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Balance display */}
            {isConnected && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
                <span className="text-sm text-muted-foreground">Balance:</span>
                <span className="text-sm font-semibold text-gradient-gold">${balance.toFixed(2)}</span>
              </div>
            )}

            {/* Cart button */}
            {isConnected && (
              <Button
                variant="glass"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            )}

            {/* Wallet button */}
            {isConnected ? (
              <Button variant="wallet" onClick={disconnect} className="hidden sm:flex">
                <Wallet className="w-4 h-4" />
                {formatAddress(address!)}
              </Button>
            ) : (
              <Button variant="hero" onClick={connect} className="hidden sm:flex">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-border/50 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile wallet section */}
            <div className="mt-4 pt-4 border-t border-border/50">
              {isConnected ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-secondary/50">
                    <span className="text-sm text-muted-foreground">Balance</span>
                    <span className="text-sm font-semibold text-gradient-gold">${balance.toFixed(2)}</span>
                  </div>
                  <Button variant="wallet" onClick={disconnect} className="w-full">
                    <Wallet className="w-4 h-4" />
                    {formatAddress(address!)}
                  </Button>
                </div>
              ) : (
                <Button variant="hero" onClick={connect} className="w-full">
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

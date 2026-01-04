import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Gift, Copy, Check, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function Referral() {
  const { isConnected, address, connect } = useWallet();
  const [copied, setCopied] = useState(false);

  const referralCode = address ? address.slice(2, 8).toUpperCase() : 'XXXXX';
  const referralLink = `https://easypicks.io/?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock referral stats
  const stats = {
    totalReferrals: 12,
    monthlyReferrals: 3,
    monthlyLimit: 40,
    totalEarnings: 60,
  };

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
                <Gift className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Earn Rewards</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Referral Program
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                Invite friends and earn $5 for every friend who places their first bet. 
                They get $5 too!
              </p>
            </div>

            {/* How it works */}
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-display font-bold text-primary">1</span>
                </div>
                <h3 className="font-display font-semibold mb-2">Share Your Link</h3>
                <p className="text-sm text-muted-foreground">
                  Share your unique referral link with friends
                </p>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-display font-bold text-primary">2</span>
                </div>
                <h3 className="font-display font-semibold mb-2">Friend Signs Up</h3>
                <p className="text-sm text-muted-foreground">
                  They connect wallet and place their first $10+ bet
                </p>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-display font-bold text-accent">3</span>
                </div>
                <h3 className="font-display font-semibold mb-2">Both Earn $5</h3>
                <p className="text-sm text-muted-foreground">
                  You and your friend each receive $5 bonus
                </p>
              </div>
            </div>

            {/* Referral link card */}
            <div className="glass-card-elevated p-6 sm:p-8 mb-8">
              <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
                <Gift className="w-5 h-5 text-accent" />
                Your Referral Link
              </h2>

              {isConnected ? (
                <>
                  <div className="flex gap-3 mb-6">
                    <div className="flex-1 p-4 bg-secondary/50 border border-border rounded-xl font-mono text-sm break-all">
                      {referralLink}
                    </div>
                    <Button variant="gold" onClick={handleCopy} className="flex-shrink-0">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-accent/10 rounded-xl">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Your referral code: </span>
                      <span className="font-mono font-bold text-accent">{referralCode}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Connect wallet to get your referral link</p>
                  <Button variant="hero" onClick={connect}>
                    Connect Wallet
                  </Button>
                </div>
              )}
            </div>

            {/* Stats */}
            {isConnected && (
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Total Referrals</span>
                  </div>
                  <p className="text-2xl font-display font-bold">{stats.totalReferrals}</p>
                </div>
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span className="text-sm text-muted-foreground">This Month</span>
                  </div>
                  <p className="text-2xl font-display font-bold">
                    {stats.monthlyReferrals} / {stats.monthlyLimit}
                  </p>
                </div>
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-gold" />
                    <span className="text-sm text-muted-foreground">Total Earned</span>
                  </div>
                  <p className="text-2xl font-display font-bold text-gradient-gold">${stats.totalEarnings}</p>
                </div>
              </div>
            )}

            {/* Terms */}
            <div className="mt-8 p-4 bg-secondary/30 rounded-xl">
              <p className="text-sm text-muted-foreground text-center">
                Referral bonus is credited after the referred user places their first bet of $10 or more. 
                Maximum {stats.monthlyLimit} valid referrals per month.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

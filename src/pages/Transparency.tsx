import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Eye, Trophy, DollarSign, ArrowUpRight, Search, Filter, ExternalLink } from 'lucide-react';

// Mock data for transparency pages
const mockBets = [
  {
    id: '1',
    walletAddress: '0x742d...F1C8',
    tickets: 5,
    amount: 50,
    picks: ['2-1', '1-0', '3-2', '0-0', '1-1', '2-2'],
    score: 42,
    prize: 75,
    date: '2026-01-02',
  },
  {
    id: '2',
    walletAddress: '0x8f3a...92B4',
    tickets: 10,
    amount: 100,
    picks: ['1-1', '2-1', '0-0', '3-1', '2-0', '1-2'],
    score: 35,
    prize: 0,
    date: '2026-01-02',
  },
  {
    id: '3',
    walletAddress: '0x1b2c...5D6E',
    tickets: 2,
    amount: 20,
    picks: ['3-0', '2-2', '1-0', '1-1', '0-0', '2-1'],
    score: 28,
    prize: 0,
    date: '2026-01-01',
  },
];

const mockPrizeCredits = [
  {
    id: '1',
    walletAddress: '0x742d...F1C8',
    amount: 250,
    tier: '45-59 points',
    tickets: 3,
    date: '2025-12-28',
    round: 'Week 52',
  },
  {
    id: '2',
    walletAddress: '0x9e4f...3A7B',
    amount: 500,
    tier: '60 points',
    tickets: 1,
    date: '2025-12-21',
    round: 'Week 51',
  },
];

const mockWithdrawals = [
  {
    id: '1',
    walletAddress: '0x742d...F1C8',
    amount: 100,
    txHash: '0x1234...5678',
    date: '2025-12-29',
  },
  {
    id: '2',
    walletAddress: '0x9e4f...3A7B',
    amount: 450,
    txHash: '0xabcd...ef01',
    date: '2025-12-22',
  },
];

type Tab = 'bets' | 'prizes' | 'withdrawals';

export default function Transparency() {
  const [activeTab, setActiveTab] = useState<Tab>('bets');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'bets' as Tab, label: 'All Bets', icon: Eye },
    { id: 'prizes' as Tab, label: 'Prize Credits', icon: Trophy },
    { id: 'withdrawals' as Tab, label: 'Withdrawals', icon: ArrowUpRight },
  ];

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">100% Transparent</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
              Transparency Dashboard
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every bet, prize, and withdrawal is publicly visible. 
              We believe in complete transparency.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by wallet address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Content */}
          <div className="glass-card overflow-hidden">
            {activeTab === 'bets' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50 bg-secondary/30">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Wallet</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tickets</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Picks</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Score</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Prize</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBets.map((bet) => (
                      <tr key={bet.id} className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                        <td className="p-4">
                          <span className="font-mono text-sm">{bet.walletAddress}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium">{bet.tickets}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-foreground">${bet.amount}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {bet.picks.map((pick, idx) => (
                              <span key={idx} className="text-xs bg-secondary px-1.5 py-0.5 rounded">
                                {pick}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`font-display font-semibold ${
                            bet.score >= 45 ? 'text-accent' : bet.score >= 30 ? 'text-green-400' : 'text-foreground'
                          }`}>
                            {bet.score}
                          </span>
                        </td>
                        <td className="p-4">
                          {bet.prize > 0 ? (
                            <span className="font-semibold text-gradient-gold">${bet.prize}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {bet.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'prizes' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50 bg-secondary/30">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Wallet</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tier</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tickets</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Round</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPrizeCredits.map((credit) => (
                      <tr key={credit.id} className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                        <td className="p-4">
                          <span className="font-mono text-sm">{credit.walletAddress}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-display font-bold text-gradient-gold">${credit.amount}</span>
                        </td>
                        <td className="p-4">
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            credit.tier.includes('60') 
                              ? 'bg-accent/20 text-accent' 
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {credit.tier}
                          </span>
                        </td>
                        <td className="p-4 font-medium">{credit.tickets}</td>
                        <td className="p-4 text-muted-foreground">{credit.round}</td>
                        <td className="p-4 text-sm text-muted-foreground">{credit.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'withdrawals' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50 bg-secondary/30">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Wallet</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Transaction</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockWithdrawals.map((withdrawal) => (
                      <tr key={withdrawal.id} className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                        <td className="p-4">
                          <span className="font-mono text-sm">{withdrawal.walletAddress}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-foreground">${withdrawal.amount}</span>
                        </td>
                        <td className="p-4">
                          <a
                            href={`https://basescan.org/tx/${withdrawal.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-mono text-sm text-primary hover:underline"
                          >
                            {withdrawal.txHash}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{withdrawal.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Stats footer */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <div className="glass-card p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Bets</p>
              <p className="text-2xl font-display font-bold text-foreground">1,247</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Prizes Paid</p>
              <p className="text-2xl font-display font-bold text-gradient-gold">$45,680</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Withdrawals</p>
              <p className="text-2xl font-display font-bold text-foreground">$38,450</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

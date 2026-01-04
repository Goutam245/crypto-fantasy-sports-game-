import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StatsCard } from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { useApp } from '@/contexts/AppContext';
import { 
  Wallet, 
  TrendingUp, 
  Trophy, 
  Ticket, 
  ArrowUpRight, 
  Copy, 
  Check,
  History,
  Gift,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock chart data
const mockChartData = [
  { round: 'W1', score: 28 },
  { round: 'W2', score: 35 },
  { round: 'W3', score: 22 },
  { round: 'W4', score: 42 },
  { round: 'W5', score: 38 },
  { round: 'W6', score: 45 },
];

export default function Dashboard() {
  const { isConnected, address, balance, connect } = useWallet();
  const { userTickets } = useApp();
  const navigate = useNavigate();
  const [copiedReferral, setCopiedReferral] = useState(false);

  // Mock referral code
  const referralCode = address ? address.slice(2, 8).toUpperCase() : '';
  const referralLink = `https://easypicks.io/?ref=${referralCode}`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-grid-pattern">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="glass-card p-12 text-center max-w-lg mx-auto">
              <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">Connect Your Wallet</h2>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to view your dashboard, tickets, and balance.
              </p>
              <Button variant="hero" size="lg" onClick={connect}>
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Mock stats
  const stats = {
    totalWagered: 250,
    totalPrizes: 180,
    winRate: 24,
    lifetimePoints: 342,
    yearPoints: 186,
    activeTickets: 3,
  };

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
              My Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your picks, balance, and winnings
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Balance"
              value={`$${balance.toFixed(2)}`}
              subtitle="Available USDC"
              icon="dollar"
              variant="gold"
            />
            <StatsCard
              title="Active Tickets"
              value={stats.activeTickets}
              subtitle="This round"
              icon="trophy"
              variant="primary"
            />
            <StatsCard
              title="Total Prizes"
              value={`$${stats.totalPrizes}`}
              subtitle="Lifetime earnings"
              icon="trending"
            />
            <StatsCard
              title="Win Rate"
              value={`${stats.winRate}%`}
              subtitle="Prize-winning tickets"
              icon="users"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Score History Chart */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display font-semibold text-lg">Score History</h3>
                    <p className="text-sm text-muted-foreground">Average points per round</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-display font-bold text-primary">{stats.yearPoints}</span>
                    <span className="text-sm text-muted-foreground">pts this year</span>
                  </div>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockChartData}>
                      <XAxis 
                        dataKey="round" 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 4 }}
                        activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Active Tickets */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Ticket className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-semibold text-lg">Active Tickets</h3>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/play">
                      New Ticket
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                {userTickets.length === 0 ? (
                  <div className="text-center py-12">
                    <Ticket className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">No active tickets</p>
                    <Button variant="hero" className="mt-4" onClick={() => navigate('/play')}>
                      Place Your First Bet
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userTickets.map((ticket) => (
                      <div key={ticket.id} className="p-4 bg-secondary/30 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{ticket.quantity}x tickets</span>
                          <span className="text-sm text-muted-foreground">${ticket.totalCost}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {ticket.predictions.map((pred, idx) => (
                            <span key={idx} className="text-xs bg-secondary px-2 py-1 rounded">
                              {pred.homeScore}-{pred.awayScore}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Past Tickets */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <History className="w-5 h-5 text-muted-foreground" />
                  <h3 className="font-display font-semibold text-lg">Past Tickets</h3>
                </div>

                <div className="text-center py-8 text-muted-foreground">
                  <p>No past tickets yet</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="gold" className="w-full justify-start" asChild>
                    <Link to="/deposit">
                      <Wallet className="w-5 h-5" />
                      Deposit USDC
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/withdraw">
                      <ArrowUpRight className="w-5 h-5" />
                      Request Withdrawal
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Referral */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Gift className="w-5 h-5 text-accent" />
                  <h3 className="font-display font-semibold text-lg">Referral Program</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Earn $5 for every friend who places their first bet. They get $5 too!
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 text-sm bg-secondary/50 border border-border rounded-lg px-3 py-2 truncate"
                  />
                  <Button variant="secondary" size="icon" onClick={handleCopyReferral}>
                    {copiedReferral ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Referrals this month</span>
                    <span className="font-medium text-accent">0 / 40</span>
                  </div>
                </div>
              </div>

              {/* Balance Summary */}
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-lg mb-4">Balance Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Deposited</span>
                    <span className="font-medium">${stats.totalWagered}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Prizes Won</span>
                    <span className="font-medium text-accent">${stats.totalPrizes}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Wagered</span>
                    <span className="font-medium">${stats.totalWagered}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-3 border-t border-border">
                    <span className="text-muted-foreground">Current Balance</span>
                    <span className="font-display font-bold text-gradient-gold">${balance.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

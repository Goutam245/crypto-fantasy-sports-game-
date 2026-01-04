import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Eye, Zap, Trophy, Wallet, Target, Gift, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { VaultCard } from '@/components/VaultCard';
import { useWallet } from '@/contexts/WalletContext';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { isConnected, connect } = useWallet();
  const { currentRound } = useApp();
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: 'Easy to Play',
      description: 'Predict exact scores for 6 weekly matches. Each $10 ticket could win you the jackpot.',
    },
    {
      icon: Shield,
      title: 'Secure & On-Chain',
      description: 'Built on Base with USDC. Your funds are safe with transparent public wallet addresses.',
    },
    {
      icon: Eye,
      title: 'Fully Transparent',
      description: 'All bets, prizes, and withdrawals are publicly visible. Nothing hidden, ever.',
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Connect Wallet',
      description: 'Connect your wallet and deposit USDC to your balance.',
    },
    {
      step: '02',
      title: 'Make Predictions',
      description: 'Predict exact scores for 6 weekly football matches.',
    },
    {
      step: '03',
      title: 'Buy Tickets',
      description: 'Each ticket costs $10. Buy multiple with different picks.',
    },
    {
      step: '04',
      title: 'Win Prizes',
      description: 'Earn points and claim your share of the prize pool.',
    },
  ];

  const prizeTiers = [
    { points: '60', label: 'Perfect Score', percentage: '50%', color: 'text-accent' },
    { points: '45-59', label: 'Elite', percentage: '20%', color: 'text-green-400' },
    { points: '30-44', label: 'Pro', percentage: '15%', color: 'text-blue-400' },
    { points: '20-29', label: 'Solid', percentage: '5%', color: 'text-muted-foreground' },
  ];

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-primary">Live on Base • USDC Only</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Predict. Play.{' '}
              <span className="text-gradient-gold">Win Big.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              The simplest pick'em platform on crypto. Predict exact football scores, 
              compete with players worldwide, and win from the weekly prize pool.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {isConnected ? (
                <Button variant="hero" size="xl" onClick={() => navigate('/play')}>
                  <Trophy className="w-5 h-5" />
                  Start Playing
                  <ArrowRight className="w-5 h-5" />
                </Button>
              ) : (
                <Button variant="hero" size="xl" onClick={connect}>
                  <Wallet className="w-5 h-5" />
                  Connect Wallet
                  <ArrowRight className="w-5 h-5" />
                </Button>
              )}
              <Button variant="outline" size="xl" asChild>
                <Link to="/transparency">
                  <Eye className="w-5 h-5" />
                  View All Bets
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <p className="text-2xl sm:text-4xl font-display font-bold text-gradient-gold">
                  ${currentRound?.prizePool.toLocaleString() || '0'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Prize Pool</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-4xl font-display font-bold text-foreground">
                  {currentRound?.totalTickets || 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Active Tickets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-4xl font-display font-bold text-primary">
                  $10
                </p>
                <p className="text-sm text-muted-foreground mt-1">Per Ticket</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Vault Section */}
      {currentRound && (
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                This Week's Vault
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Enter now and compete for your share of the prize pool
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <VaultCard
                name={currentRound.name}
                prizePool={currentRound.prizePool}
                totalTickets={currentRound.totalTickets}
                endDate={currentRound.endDate}
                status={currentRound.status}
                onClick={() => navigate('/play')}
              />
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 sm:py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Why EasyPicks?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built for crypto-native sports fans who value simplicity and transparency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card p-6 sm:p-8 group hover:border-primary/30 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Four simple steps to start winning
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="glass-card p-6 h-full">
                  <span className="text-5xl font-display font-bold text-primary/20">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-display font-semibold mt-4 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {index < howItWorks.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-muted-foreground/30 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Tiers Section */}
      <section className="py-16 sm:py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Prize Structure
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Score more points, win bigger prizes. 90% of entries go to the prize pool.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="glass-card overflow-hidden">
              <div className="p-6 border-b border-border/50 bg-accent/5">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-accent" />
                  <span className="font-display font-semibold">Scoring: 10 pts exact, 5 pts winner, +2 pts goal diff</span>
                </div>
              </div>
              <div className="divide-y divide-border/50">
                {prizeTiers.map((tier) => (
                  <div key={tier.points} className="p-4 sm:p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`text-2xl font-display font-bold ${tier.color}`}>
                        {tier.points}
                      </span>
                      <div>
                        <p className="font-medium">{tier.label}</p>
                        <p className="text-sm text-muted-foreground">points</p>
                      </div>
                    </div>
                    <span className={`text-xl font-display font-bold ${tier.color}`}>
                      {tier.percentage}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-secondary/30 text-center text-sm text-muted-foreground">
                Unclaimed tier prizes roll over to next week
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral CTA */}
      <section className="py-16 sm:py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 sm:p-12 text-center max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
            <div className="relative z-10">
              <Gift className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
                Invite Friends, Earn Rewards
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Get $5 for every friend who places their first bet. They get $5 too. 
                It's a win-win.
              </p>
              <Button variant="gold" size="lg" asChild>
                <Link to="/referral">
                  Get Your Referral Link
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Shield, 
  Eye, 
  Users, 
  Target, 
  Zap, 
  ArrowRight,
  Twitter,
  MessageCircle,
  Globe
} from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Zap,
      title: 'Easy',
      description: 'Quick and intuitive gameplay. Predict scores, buy tickets, win prizes.',
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Built on Base with USDC. Public wallet addresses and internal balance system.',
    },
    {
      icon: Eye,
      title: 'Transparent',
      description: 'All bets, prizes, and withdrawals are publicly visible. Nothing hidden, ever.',
    },
  ];

  const roadmap = [
    {
      phase: 'Phase 1',
      title: 'MVP Launch',
      status: 'active',
      items: [
        'Weekly football vault',
        'Base USDC deposits',
        'Referral program',
        'Transparency dashboard',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Expansion',
      status: 'upcoming',
      items: [
        'Multiple sports (NBA, NFL)',
        'Special event vaults',
        'Higher stakes vaults',
        'Mobile PWA',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Community',
      status: 'future',
      items: [
        'DAO governance',
        'Community vaults',
        'Staking rewards',
        'Multi-chain support',
      ],
    },
  ];

  const team = [
    {
      name: 'Builder.eth',
      role: 'Lead Developer',
      bio: 'Full-stack developer with 8 years of experience building web3 applications.',
    },
    {
      name: 'SportsAnon',
      role: 'Sports Analytics',
      bio: 'Former sports betting analyst. Passionate about fair and transparent gaming.',
    },
    {
      name: 'CryptoDAO',
      role: 'Community Lead',
      bio: 'Community builder and governance expert. Building the future of decentralized sports.',
    },
  ];

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <section className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              About <span className="text-gradient-primary">EasyPicks</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The simplest, most transparent pick'em platform built for crypto-native sports fans.
            </p>
          </section>

          {/* Mission */}
          <section className="mb-16">
            <div className="glass-card p-8 sm:p-12 max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6 text-center">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground text-center leading-relaxed">
                We believe sports prediction should be fun, fair, and transparent. 
                EasyPicks removes the complexity from sports betting, offering a simple 
                pick'em format where skill and knowledge are rewarded. Every bet, 
                every prize, and every withdrawal is publicly visible on-chain.
              </p>
            </div>
          </section>

          {/* Core Values */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-8 text-center">
              Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="glass-card p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Team */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-8 text-center">
              The Team
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {team.map((member) => (
                <div key={member.name} className="glass-card p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-center mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary text-center mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Roadmap */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-8 text-center">
              Roadmap
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {roadmap.map((phase) => (
                <div
                  key={phase.phase}
                  className={`glass-card p-6 ${
                    phase.status === 'active' ? 'border-primary/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      phase.status === 'active'
                        ? 'bg-primary/20 text-primary'
                        : phase.status === 'upcoming'
                        ? 'bg-accent/20 text-accent'
                        : 'bg-secondary text-muted-foreground'
                    }`}>
                      {phase.phase}
                    </span>
                    {phase.status === 'active' && (
                      <span className="text-xs text-primary">• Current</span>
                    )}
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-4">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Target className="w-3 h-3 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Community */}
          <section className="mb-16">
            <div className="glass-card p-8 sm:p-12 max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
                Join Our Community
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Connect with other players, get updates, and be part of the EasyPicks journey.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="lg" asChild>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-5 h-5" />
                    Twitter
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    Discord
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://easypicks.io" target="_blank" rel="noopener noreferrer">
                    <Globe className="w-5 h-5" />
                    Website
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              Ready to Play?
            </h2>
            <p className="text-muted-foreground mb-6">
              Start making predictions and compete for prizes today.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/play">
                <Trophy className="w-5 h-5" />
                Start Playing
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

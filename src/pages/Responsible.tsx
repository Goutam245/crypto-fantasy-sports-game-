import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AlertCircle, Heart, Clock, DollarSign } from 'lucide-react';

export default function Responsible() {
  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 mb-4">
                <Heart className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Play Responsibly</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Responsible Gaming
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                At EasyPicks, we believe gaming should be fun and entertaining. 
                We're committed to promoting responsible gaming practices.
              </p>
            </div>

            <div className="space-y-6">
              {/* Key principles */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="glass-card p-6 text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-display font-semibold mb-2">Set Time Limits</h3>
                  <p className="text-sm text-muted-foreground">
                    Decide how much time you want to spend before you start playing
                  </p>
                </div>
                <div className="glass-card p-6 text-center">
                  <DollarSign className="w-8 h-8 text-accent mx-auto mb-3" />
                  <h3 className="font-display font-semibold mb-2">Set Budgets</h3>
                  <p className="text-sm text-muted-foreground">
                    Only play with money you can afford to lose
                  </p>
                </div>
                <div className="glass-card p-6 text-center">
                  <Heart className="w-8 h-8 text-destructive mx-auto mb-3" />
                  <h3 className="font-display font-semibold mb-2">Take Breaks</h3>
                  <p className="text-sm text-muted-foreground">
                    Regular breaks help maintain a healthy perspective
                  </p>
                </div>
              </div>

              <div className="glass-card p-6 sm:p-8">
                <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  Warning Signs
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you recognize any of these behaviors, it may be time to take a break:
                </p>
                <ul className="text-muted-foreground space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0" />
                    Spending more money or time than you planned
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0" />
                    Chasing losses with larger bets
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0" />
                    Neglecting work, family, or other responsibilities
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0" />
                    Borrowing money to play
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-warning mt-2 flex-shrink-0" />
                    Feeling anxious or stressed about gaming
                  </li>
                </ul>
              </div>

              <div className="glass-card p-6 sm:p-8">
                <h2 className="text-xl font-display font-semibold mb-4">Getting Help</h2>
                <p className="text-muted-foreground mb-4">
                  If you or someone you know is struggling with gambling, help is available:
                </p>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://www.ncpgambling.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      National Council on Problem Gambling
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.gamblersanonymous.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Gamblers Anonymous
                    </a>
                  </li>
                  <li>
                    <span className="text-muted-foreground">
                      National Problem Gambling Helpline: <span className="text-foreground font-medium">1-800-522-4700</span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="text-center p-6 bg-secondary/30 rounded-xl">
                <p className="text-muted-foreground">
                  Remember: Gaming should be entertainment, not a way to make money. 
                  Play smart, play safe, and know when to stop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

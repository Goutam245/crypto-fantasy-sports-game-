import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { ArrowUpRight, Wallet, AlertCircle, Check, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function Withdraw() {
  const { isConnected, balance, connect, deductFromBalance } = useWallet();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const minWithdraw = 10;
  const canWithdraw = parseFloat(withdrawAmount) >= minWithdraw && parseFloat(withdrawAmount) <= balance;

  const handleWithdraw = async () => {
    if (!canWithdraw) return;

    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    deductFromBalance(parseFloat(withdrawAmount));
    setSubmitted(true);
    setIsSubmitting(false);
    
    toast({
      title: "Withdrawal Requested",
      description: `Your request for $${withdrawAmount} USDC has been submitted for review.`,
    });
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
                Connect your wallet to request a withdrawal.
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-grid-pattern">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="glass-card p-12 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Request Submitted</h2>
              <p className="text-muted-foreground mb-6">
                Your withdrawal request has been submitted. Our team will process it within 24-48 hours.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                <Clock className="w-4 h-4" />
                <span>Processing time: 24-48 hours</span>
              </div>
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                Request Withdrawal
              </h1>
              <p className="text-muted-foreground">
                Withdraw your USDC balance to your connected wallet
              </p>
            </div>

            {/* Withdraw Card */}
            <div className="glass-card-elevated p-6 sm:p-8">
              {/* Current balance */}
              <div className="text-center mb-6 p-4 bg-secondary/30 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                <p className="text-3xl font-display font-bold text-gradient-gold">${balance.toFixed(2)}</p>
              </div>

              {/* Min notice */}
              <div className="flex items-start gap-3 p-4 bg-info/10 border border-info/20 rounded-xl mb-6">
                <AlertCircle className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-muted-foreground">
                    Minimum withdrawal: <span className="font-medium text-foreground">$10 USDC</span>
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Withdrawals are manually processed within 24-48 hours.
                  </p>
                </div>
              </div>

              {/* Amount input */}
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Withdrawal Amount (USDC)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    min={minWithdraw}
                    max={balance}
                    step="0.01"
                    className="w-full pl-8 pr-4 py-4 text-xl bg-secondary/50 border border-border rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                
                {/* Quick amounts */}
                <div className="flex gap-2 mt-3">
                  {[10, 25, 50, 100].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setWithdrawAmount(Math.min(amount, balance).toString())}
                      disabled={balance < amount && amount !== Math.floor(balance)}
                      className="flex-1 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ${amount}
                    </button>
                  ))}
                  <button
                    onClick={() => setWithdrawAmount(balance.toString())}
                    disabled={balance < minWithdraw}
                    className="flex-1 py-2 text-sm bg-primary/20 text-primary hover:bg-primary/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Max
                  </button>
                </div>
              </div>

              {/* Validation messages */}
              {withdrawAmount && parseFloat(withdrawAmount) < minWithdraw && (
                <p className="text-sm text-destructive mb-4">
                  Minimum withdrawal is ${minWithdraw}
                </p>
              )}
              {withdrawAmount && parseFloat(withdrawAmount) > balance && (
                <p className="text-sm text-destructive mb-4">
                  Insufficient balance
                </p>
              )}

              {/* Submit button */}
              <Button
                variant="gold"
                size="lg"
                className="w-full"
                onClick={handleWithdraw}
                disabled={!canWithdraw || isSubmitting}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <ArrowUpRight className="w-5 h-5" />
                    Request Withdrawal
                  </>
                )}
              </Button>

              {/* Note */}
              <p className="text-xs text-center text-muted-foreground mt-4">
                Funds will be sent to your connected wallet address after approval.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

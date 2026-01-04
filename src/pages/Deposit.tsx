import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { QrCode, Copy, Check, Wallet, AlertCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Public deposit wallet address (in production, this would be from config)
const DEPOSIT_WALLET = '0x742d35Cc6634C0532925a3b844Bc9e7595f2F1C8';

export default function Deposit() {
  const { isConnected, address, addToBalance, connect } = useWallet();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(DEPOSIT_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) < 10) return;
    
    setIsProcessing(true);
    // Simulate blockchain detection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    addToBalance(parseFloat(depositAmount));
    setIsProcessing(false);
    navigate('/play');
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
                Connect your wallet to deposit USDC and start playing.
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

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                Deposit USDC
              </h1>
              <p className="text-muted-foreground">
                Send USDC on Base to the address below to fund your account
              </p>
            </div>

            {/* Deposit Card */}
            <div className="glass-card-elevated p-6 sm:p-8">
              {/* Important notice */}
              <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/20 rounded-xl mb-6">
                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-accent mb-1">Important</p>
                  <p className="text-muted-foreground">
                    Only send <span className="font-medium text-foreground">USDC on Base chain</span>. 
                    Sending other tokens or using other networks may result in permanent loss.
                  </p>
                </div>
              </div>

              {/* QR Code placeholder */}
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 bg-secondary rounded-2xl flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <QrCode className="w-20 h-20 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">QR Code</p>
                  </div>
                </div>
              </div>

              {/* Wallet address */}
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Deposit Address (Base USDC)
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 bg-secondary/50 border border-border rounded-xl font-mono text-sm break-all">
                    {DEPOSIT_WALLET}
                  </div>
                  <Button variant="secondary" onClick={handleCopy} className="flex-shrink-0">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* Network badge */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm font-medium text-primary">Base Network</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
                  <span className="text-sm font-medium text-accent">USDC Only</span>
                </div>
              </div>

              {/* Minimum deposit */}
              <div className="text-center text-sm text-muted-foreground mb-6">
                Minimum deposit: <span className="font-medium text-foreground">$10 USDC</span>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">Demo Mode</span>
                </div>
              </div>

              {/* Demo deposit simulation */}
              <div className="space-y-4">
                <p className="text-sm text-center text-muted-foreground">
                  For demo purposes, simulate a deposit:
                </p>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Amount (min $10)"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    min="10"
                    className="flex-1 px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:border-primary"
                  />
                  <Button
                    variant="gold"
                    size="lg"
                    onClick={simulateDeposit}
                    disabled={!depositAmount || parseFloat(depositAmount) < 10 || isProcessing}
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        Simulate
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Help links */}
              <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <a
                  href="https://base.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  Learn about Base
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="hidden sm:inline text-border">•</span>
                <a
                  href="https://www.circle.com/usdc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  What is USDC?
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

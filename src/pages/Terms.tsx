import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-8">
              Terms of Service
            </h1>

            <div className="glass-card p-6 sm:p-8 prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: January 2026
              </p>

              <h2 className="text-xl font-display font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-6">
                By accessing or using EasyPicks, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our platform.
              </p>

              <h2 className="text-xl font-display font-semibold mb-4">2. Eligibility</h2>
              <p className="text-muted-foreground mb-6">
                You must be at least 18 years old and legally permitted to participate in prediction 
                games in your jurisdiction to use EasyPicks. You are responsible for ensuring compliance 
                with local laws and regulations.
              </p>

              <h2 className="text-xl font-display font-semibold mb-4">3. Account & Wallet</h2>
              <p className="text-muted-foreground mb-6">
                You are responsible for maintaining the security of your wallet and any activities 
                conducted through your connected wallet address. EasyPicks is not responsible for any 
                losses resulting from unauthorized access to your wallet.
              </p>

              <h2 className="text-xl font-display font-semibold mb-4">4. Deposits & Withdrawals</h2>
              <p className="text-muted-foreground mb-6">
                All deposits must be made in USDC on the Base network. Minimum deposit and withdrawal 
                amounts apply. Withdrawals are processed manually and may take up to 48 hours.
              </p>

              <h2 className="text-xl font-display font-semibold mb-4">5. Game Rules</h2>
              <p className="text-muted-foreground mb-6">
                Each ticket costs $10 USDC. Points are awarded based on prediction accuracy. 
                Prize distribution follows the published tier structure. EasyPicks retains a 10% 
                rake from the prize pool.
              </p>

              <h2 className="text-xl font-display font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-6">
                EasyPicks is provided "as is" without warranties of any kind. We are not liable for 
                any losses incurred through use of the platform, including but not limited to 
                blockchain transaction failures or smart contract vulnerabilities.
              </p>

              <h2 className="text-xl font-display font-semibold mb-4">7. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Continued use of the platform 
                constitutes acceptance of any changes.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

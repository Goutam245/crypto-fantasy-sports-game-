import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-8">
              Privacy Policy
            </h1>

            <div className="glass-card p-6 sm:p-8 prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: January 2026
              </p>

              <h2 className="text-xl font-display font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-6">
                EasyPicks collects minimal information necessary to operate the platform:
              </p>
              <ul className="text-muted-foreground mb-6 list-disc pl-6 space-y-2">
                <li>Wallet addresses connected to our platform</li>
                <li>Transaction history and betting records</li>
                <li>Referral relationships</li>
              </ul>

              <h2 className="text-xl font-display font-semibold mb-4">2. How We Use Information</h2>
              <p className="text-muted-foreground mb-6">
                We use collected information to:
              </p>
              <ul className="text-muted-foreground mb-6 list-disc pl-6 space-y-2">
                <li>Process deposits, bets, and withdrawals</li>
                <li>Calculate and distribute prizes</li>
                <li>Prevent fraud and ensure fair play</li>
                <li>Improve our services</li>
              </ul>

              <h2 className="text-xl font-display font-semibold mb-4">3. Public Information</h2>
              <p className="text-muted-foreground mb-6">
                As part of our transparency commitment, certain information is publicly visible:
              </p>
              <ul className="text-muted-foreground mb-6 list-disc pl-6 space-y-2">
                <li>Masked wallet addresses (first and last 4 characters)</li>
                <li>Bet amounts and predictions</li>
                <li>Prize distributions</li>
                <li>Withdrawal transactions</li>
              </ul>

              <h2 className="text-xl font-display font-semibold mb-4">4. Blockchain Data</h2>
              <p className="text-muted-foreground mb-6">
                All transactions on the Base blockchain are public by nature. EasyPicks does not 
                control or have the ability to delete blockchain data.
              </p>

              <h2 className="text-xl font-display font-semibold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground mb-6">
                We implement industry-standard security measures to protect your data. However, 
                no system is completely secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-xl font-display font-semibold mb-4">6. Contact</h2>
              <p className="text-muted-foreground">
                For privacy-related inquiries, please contact us through our Discord or Twitter channels.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MatchCard } from '@/components/MatchCard';
import { Button } from '@/components/ui/button';
import { useApp, Match } from '@/contexts/AppContext';
import { useCart, MatchPrediction } from '@/contexts/CartContext';
import { useWallet } from '@/contexts/WalletContext';
import { ShoppingCart, Plus, Minus, Trophy, Clock, AlertCircle } from 'lucide-react';

export default function Play() {
  const { currentRound, scoringRules } = useApp();
  const { addToCart, setIsCartOpen, totalItems } = useCart();
  const { isConnected, connect, balance } = useWallet();
  const navigate = useNavigate();

  const [predictions, setPredictions] = useState<Record<string, { homeScore: number; awayScore: number }>>({});
  const [quantity, setQuantity] = useState(1);

  const handlePredictionChange = (matchId: string, homeScore: number, awayScore: number) => {
    setPredictions(prev => ({
      ...prev,
      [matchId]: { homeScore, awayScore },
    }));
  };

  const allMatchesPredicted = currentRound?.matches.every(match => predictions[match.id] !== undefined) ?? false;

  const handleAddToCart = () => {
    if (!currentRound || !allMatchesPredicted) return;

    const matchPredictions: MatchPrediction[] = currentRound.matches.map(match => ({
      matchId: match.id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeScore: predictions[match.id].homeScore,
      awayScore: predictions[match.id].awayScore,
      matchDate: match.matchDate,
    }));

    addToCart(matchPredictions, quantity);
    setPredictions({});
    setQuantity(1);
  };

  const ticketPrice = 10;
  const totalCost = quantity * ticketPrice;

  if (!currentRound) {
    return (
      <div className="min-h-screen bg-grid-pattern">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="glass-card p-12 text-center max-w-lg mx-auto">
              <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">No Active Round</h2>
              <p className="text-muted-foreground">
                Check back soon for the next round of matches.
              </p>
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
          {/* Round header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-success/20 text-green-400 text-sm font-medium rounded-full pulse-live">
                Live Round
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
              {currentRound.name}
            </h1>
            <p className="text-muted-foreground">
              Predict exact scores for all 6 matches to maximize your points
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Matches grid */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-semibold">Matches</h2>
                <span className="text-sm text-muted-foreground">
                  {Object.keys(predictions).length} / {currentRound.matches.length} predicted
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {currentRound.matches.map(match => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    prediction={predictions[match.id]}
                    onPredictionChange={handlePredictionChange}
                    disabled={!isConnected}
                  />
                ))}
              </div>
            </div>

            {/* Ticket builder sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card-elevated p-6 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg">Your Ticket</h3>
                    <p className="text-sm text-muted-foreground">Build your picks</p>
                  </div>
                </div>

                {!isConnected ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Connect wallet to place picks</p>
                    <Button variant="hero" onClick={connect} className="w-full">
                      Connect Wallet
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Predictions summary */}
                    <div className="space-y-2 mb-6">
                      {currentRound.matches.map(match => {
                        const pred = predictions[match.id];
                        return (
                          <div
                            key={match.id}
                            className={`flex items-center justify-between text-sm p-2 rounded-lg ${
                              pred ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/50'
                            }`}
                          >
                            <span className={pred ? 'text-foreground' : 'text-muted-foreground'}>
                              {match.homeTeam.slice(0, 3).toUpperCase()} vs {match.awayTeam.slice(0, 3).toUpperCase()}
                            </span>
                            <span className={`font-medium ${pred ? 'text-primary' : 'text-muted-foreground'}`}>
                              {pred ? `${pred.homeScore} - ${pred.awayScore}` : '? - ?'}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quantity selector */}
                    <div className="mb-6">
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Number of tickets
                      </label>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <input
                          type="number"
                          min="1"
                          max="1000"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
                          className="w-20 text-center text-xl font-display font-bold bg-transparent border-b-2 border-border focus:border-primary outline-none"
                        />
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => setQuantity(Math.min(1000, quantity + 1))}
                          disabled={quantity >= 1000}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Price breakdown */}
                    <div className="space-y-2 mb-6 p-4 bg-secondary/30 rounded-xl">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price per ticket</span>
                        <span>${ticketPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Quantity</span>
                        <span>×{quantity}</span>
                      </div>
                      <div className="flex justify-between text-lg font-display font-bold pt-2 border-t border-border">
                        <span>Total</span>
                        <span className="text-gradient-gold">${totalCost}</span>
                      </div>
                    </div>

                    {/* Balance check */}
                    {balance < totalCost && (
                      <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                        Insufficient balance. You need ${(totalCost - balance).toFixed(2)} more.
                      </div>
                    )}

                    {/* Add to cart button */}
                    <Button
                      variant="gold"
                      size="lg"
                      className="w-full mb-3"
                      onClick={handleAddToCart}
                      disabled={!allMatchesPredicted}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </Button>

                    {totalItems > 0 && (
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => setIsCartOpen(true)}
                      >
                        View Cart ({totalItems} tickets)
                      </Button>
                    )}

                    {/* Scoring info */}
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <p className="text-xs text-muted-foreground text-center">
                        Scoring: {scoringRules.exactScore} pts exact • {scoringRules.correctWinner} pts winner • +{scoringRules.correctGoalDifference} pts goal diff
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

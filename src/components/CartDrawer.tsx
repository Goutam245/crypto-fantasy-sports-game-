import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, CartItem } from '@/contexts/CartContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const { balance, deductFromBalance, isConnected } = useWallet();
  const navigate = useNavigate();

  const canAfford = balance >= totalPrice;

  const handleCheckout = () => {
    if (!canAfford) {
      navigate('/deposit');
      setIsCartOpen(false);
      return;
    }

    if (deductFromBalance(totalPrice)) {
      // In production, this would create the tickets in the database
      clearCart();
      setIsCartOpen(false);
      navigate('/dashboard');
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md glass-card-elevated border-l border-border z-50 animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-display font-semibold">Your Cart</h2>
              {totalItems > 0 && (
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {totalItems} tickets
                </span>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Add picks to get started</p>
              </div>
            ) : (
              items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemove={() => removeFromCart(item.id)}
                  onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                />
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-border space-y-4">
              {/* Balance info */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Your balance</span>
                <span className={`font-semibold ${canAfford ? 'text-success' : 'text-destructive'}`}>
                  ${balance.toFixed(2)}
                </span>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-display font-bold text-gradient-gold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Checkout button */}
              {isConnected ? (
                <Button
                  variant={canAfford ? 'gold' : 'default'}
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                >
                  {canAfford ? 'Confirm Purchase' : 'Deposit to Continue'}
                </Button>
              ) : (
                <Button variant="hero" size="lg" className="w-full" disabled>
                  Connect Wallet to Continue
                </Button>
              )}

              {/* Clear cart */}
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

interface CartItemCardProps {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}

function CartItemCard({ item, onRemove, onUpdateQuantity }: CartItemCardProps) {
  return (
    <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
      {/* Predictions summary */}
      <div className="space-y-2">
        {item.predictions.map((pred, idx) => (
          <div key={pred.matchId} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground truncate flex-1">
              {pred.homeTeam} vs {pred.awayTeam}
            </span>
            <span className="font-medium text-foreground ml-2">
              {pred.homeScore} - {pred.awayScore}
            </span>
          </div>
        ))}
      </div>

      {/* Quantity and price */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            disabled={item.quantity >= 1000}
          >
            <Plus className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground ml-2">tickets</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-foreground">
            ${(item.quantity * item.pricePerTicket).toFixed(2)}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={onRemove}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

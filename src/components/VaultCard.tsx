import { Trophy } from 'lucide-react';

interface VaultCardProps {
  name: string;
  prizePool: number;
  totalTickets: number;
  endDate: string;
  status: 'upcoming' | 'active' | 'scoring' | 'completed';
  onClick?: () => void;
}

export function VaultCard({ name, prizePool, totalTickets, endDate, status, onClick }: VaultCardProps) {
  const statusConfig = {
    upcoming: {
      label: 'Coming Soon',
      className: 'bg-muted text-muted-foreground',
    },
    active: {
      label: 'Live Now',
      className: 'bg-success/20 text-green-400 pulse-live',
    },
    scoring: {
      label: 'Scoring',
      className: 'bg-warning/20 text-accent',
    },
    completed: {
      label: 'Completed',
      className: 'bg-secondary text-muted-foreground',
    },
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <button
      onClick={onClick}
      className="w-full glass-card p-6 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Trophy className="w-7 h-7 text-accent" />
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[status].className}`}>
          {statusConfig[status].label}
        </span>
      </div>

      <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
        {name}
      </h3>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Prize Pool</span>
          <span className="text-lg font-display font-bold text-gradient-gold">
            ${prizePool.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Tickets</span>
          <span className="text-sm font-medium text-foreground">{totalTickets}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Ends</span>
          <span className="text-sm font-medium text-foreground">{formatDate(endDate)}</span>
        </div>
      </div>

      {status === 'active' && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="text-center text-sm font-medium text-primary">
            Click to enter →
          </div>
        </div>
      )}
    </button>
  );
}

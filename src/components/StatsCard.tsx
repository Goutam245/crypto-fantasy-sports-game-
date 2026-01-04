import { Trophy, DollarSign, Users, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: 'trophy' | 'dollar' | 'users' | 'trending';
  variant?: 'default' | 'gold' | 'primary';
}

export function StatsCard({ title, value, subtitle, icon, variant = 'default' }: StatsCardProps) {
  const icons = {
    trophy: Trophy,
    dollar: DollarSign,
    users: Users,
    trending: TrendingUp,
  };

  const Icon = icons[icon];

  const variants = {
    default: 'bg-secondary/50 border-border',
    gold: 'bg-accent/10 border-accent/30',
    primary: 'bg-primary/10 border-primary/30',
  };

  const iconVariants = {
    default: 'bg-secondary text-foreground',
    gold: 'bg-accent/20 text-accent',
    primary: 'bg-primary/20 text-primary',
  };

  return (
    <div className={`glass-card p-4 sm:p-6 border ${variants[variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className={`text-2xl sm:text-3xl font-display font-bold ${variant === 'gold' ? 'text-gradient-gold' : variant === 'primary' ? 'text-primary' : 'text-foreground'}`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${iconVariants[variant]}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
    </div>
  );
}

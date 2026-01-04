import { useState } from 'react';
import { Match } from '@/contexts/AppContext';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MatchCardProps {
  match: Match;
  prediction?: { homeScore: number; awayScore: number };
  onPredictionChange: (matchId: string, homeScore: number, awayScore: number) => void;
  disabled?: boolean;
}

export function MatchCard({ match, prediction, onPredictionChange, disabled }: MatchCardProps) {
  const [homeScore, setHomeScore] = useState(prediction?.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState(prediction?.awayScore ?? 0);

  const handleScoreChange = (team: 'home' | 'away', delta: number) => {
    if (disabled) return;
    
    if (team === 'home') {
      const newScore = Math.max(0, Math.min(15, homeScore + delta));
      setHomeScore(newScore);
      onPredictionChange(match.id, newScore, awayScore);
    } else {
      const newScore = Math.max(0, Math.min(15, awayScore + delta));
      setAwayScore(newScore);
      onPredictionChange(match.id, homeScore, newScore);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="glass-card p-4 sm:p-6 transition-all duration-300 hover:border-primary/30">
      {/* League and date header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
          {match.league}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatDate(match.matchDate)} • {match.matchTime}
        </span>
      </div>

      {/* Match content */}
      <div className="flex items-center justify-between gap-4">
        {/* Home team */}
        <div className="flex-1 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-secondary flex items-center justify-center">
            <span className="text-lg font-bold text-foreground">
              {match.homeTeam.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <p className="font-medium text-sm text-foreground truncate">{match.homeTeam}</p>
          <p className="text-xs text-muted-foreground">Home</p>
        </div>

        {/* Score prediction */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Home score */}
          <div className="flex flex-col items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleScoreChange('home', 1)}
              disabled={disabled}
            >
              <Plus className="w-4 h-4" />
            </Button>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary border border-border flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold font-display text-foreground">
                {homeScore}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleScoreChange('home', -1)}
              disabled={disabled || homeScore === 0}
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>

          {/* VS divider */}
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-muted-foreground">-</span>
          </div>

          {/* Away score */}
          <div className="flex flex-col items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleScoreChange('away', 1)}
              disabled={disabled}
            >
              <Plus className="w-4 h-4" />
            </Button>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary border border-border flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold font-display text-foreground">
                {awayScore}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleScoreChange('away', -1)}
              disabled={disabled || awayScore === 0}
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Away team */}
        <div className="flex-1 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-secondary flex items-center justify-center">
            <span className="text-lg font-bold text-foreground">
              {match.awayTeam.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <p className="font-medium text-sm text-foreground truncate">{match.awayTeam}</p>
          <p className="text-xs text-muted-foreground">Away</p>
        </div>
      </div>

      {/* Status indicator for finished matches */}
      {match.status === 'finished' && match.homeScore !== undefined && match.awayScore !== undefined && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Final:</span>
            <span className="text-lg font-bold text-foreground">
              {match.homeScore} - {match.awayScore}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

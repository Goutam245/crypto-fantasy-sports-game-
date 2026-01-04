import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  league: string;
  matchDate: string;
  matchTime: string;
  status: 'upcoming' | 'live' | 'finished';
  homeScore?: number;
  awayScore?: number;
}

export interface Ticket {
  id: string;
  walletAddress: string;
  predictions: {
    matchId: string;
    homeScore: number;
    awayScore: number;
  }[];
  quantity: number;
  totalCost: number;
  createdAt: string;
  roundId: string;
  status: 'active' | 'scored' | 'won' | 'lost';
  totalPoints?: number;
  prizeWon?: number;
}

export interface Round {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  matches: Match[];
  status: 'upcoming' | 'active' | 'scoring' | 'completed';
  prizePool: number;
  totalTickets: number;
}

export interface ScoringRules {
  exactScore: number;
  correctWinner: number;
  correctGoalDifference: number;
}

interface AppState {
  currentRound: Round | null;
  pastRounds: Round[];
  userTickets: Ticket[];
  scoringRules: ScoringRules;
}

interface AppContextType extends AppState {
  setCurrentRound: (round: Round | null) => void;
  addTicket: (ticket: Ticket) => void;
}

const defaultScoringRules: ScoringRules = {
  exactScore: 10,
  correctWinner: 5,
  correctGoalDifference: 2,
};

// Mock data for current round
const mockMatches: Match[] = [
  {
    id: '1',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    league: 'Premier League',
    matchDate: '2026-01-05',
    matchTime: '17:30',
    status: 'upcoming',
  },
  {
    id: '2',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    league: 'La Liga',
    matchDate: '2026-01-05',
    matchTime: '21:00',
    status: 'upcoming',
  },
  {
    id: '3',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    league: 'Bundesliga',
    matchDate: '2026-01-06',
    matchTime: '18:30',
    status: 'upcoming',
  },
  {
    id: '4',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    league: 'Ligue 1',
    matchDate: '2026-01-06',
    matchTime: '20:45',
    status: 'upcoming',
  },
  {
    id: '5',
    homeTeam: 'Juventus',
    awayTeam: 'AC Milan',
    league: 'Serie A',
    matchDate: '2026-01-07',
    matchTime: '20:45',
    status: 'upcoming',
  },
  {
    id: '6',
    homeTeam: 'Ajax',
    awayTeam: 'Feyenoord',
    league: 'Eredivisie',
    matchDate: '2026-01-07',
    matchTime: '14:30',
    status: 'upcoming',
  },
];

const mockCurrentRound: Round = {
  id: 'round-1',
  name: 'Week 1 - January 2026',
  startDate: '2026-01-05',
  endDate: '2026-01-07',
  matches: mockMatches,
  status: 'active',
  prizePool: 2500,
  totalTickets: 278,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentRound, setCurrentRound] = useState<Round | null>(mockCurrentRound);
  const [pastRounds] = useState<Round[]>([]);
  const [userTickets, setUserTickets] = useState<Ticket[]>([]);
  const [scoringRules] = useState<ScoringRules>(defaultScoringRules);

  const addTicket = (ticket: Ticket) => {
    setUserTickets(prev => [...prev, ticket]);
  };

  return (
    <AppContext.Provider
      value={{
        currentRound,
        pastRounds,
        userTickets,
        scoringRules,
        setCurrentRound,
        addTicket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

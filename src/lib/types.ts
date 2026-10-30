export type Language = 'ru' | 'en';

export type TransferTier = 1 | 2 | 3;

export type LeagueKey =
  | 'laliga'
  | 'epl'
  | 'seriea'
  | 'ucl'
  | 'spl'
  | 'mls'
  | 'bundesliga'
  | 'ligue1';

export type MatchStatus = 'LIVE' | 'HT' | 'FT' | 'UPCOMING';

export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'FWD';

export interface BilingualText {
  ru: string;
  en: string;
}

export interface LineupPlayer {
  id: string;
  fotmobId: number;
  name: BilingualText;
  number: number;
  position: PlayerPosition;
  role?: BilingualText;
  /** Horizontal coordinate on dark tactical pitch (0 = left goal line, 100 = right goal line) */
  x: number;
  /** Vertical coordinate on dark tactical pitch (0 = top touchline, 100 = bottom touchline) */
  y: number;
  rating?: number;
  isCaptain?: boolean;
  goals?: number;
  assists?: number;
  yellowCard?: boolean;
  redCard?: boolean;
  subbedOutMinute?: number;
  subbedInMinute?: number;
  photoUrl: string;
}

export interface SubstitutionPlayerInfo {
  name: BilingualText;
  number: number;
  position: PlayerPosition;
  fotmobId: number;
  photoUrl: string;
  rating?: number;
}

export interface SubstitutionEvent {
  id: string;
  matchId: string;
  team: 'home' | 'away';
  teamName: BilingualText;
  minute: string;
  playerIn: SubstitutionPlayerInfo;
  playerOut: SubstitutionPlayerInfo;
  reason?: BilingualText;
  tacticalNote?: BilingualText;
}

export interface MatchScorerEvent {
  minute: string;
  player: BilingualText;
  team: 'home' | 'away';
  assist?: BilingualText;
  isPenalty?: boolean;
  isOwnGoal?: boolean;
}

export interface MatchTeamInfo {
  name: BilingualText;
  shortName: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor?: string;
  score: number;
  formation: string;
}

export interface MatchItem {
  id: string;
  espnEventId?: string;
  league: BilingualText;
  leagueKey: LeagueKey;
  status: MatchStatus;
  minute: string;
  kickoffIso: string;
  venue: BilingualText;
  homeTeam: MatchTeamInfo;
  awayTeam: MatchTeamInfo;
  scorers: MatchScorerEvent[];
  homeLineup: LineupPlayer[];
  awayLineup: LineupPlayer[];
  substitutions: SubstitutionEvent[];
  telegramHighlightUrl: string;
  isTrackedByBot?: boolean;
}

export type ArticleCategory =
  | 'match-report'
  | 'transfer-radar'
  | 'tactics'
  | 'breaking'
  | 'record';

export interface NewsArticle {
  id: string;
  slug: string;
  title: BilingualText;
  summary: BilingualText;
  content: BilingualText;
  category: ArticleCategory;
  categoryLabel: BilingualText;
  publishedAt: string;
  updatedAt?: string;
  readTimeMinutes: number;
  author: BilingualText;
  imageUrl: string;
  tags: BilingualText[];
  isBreaking?: boolean;
  isTransfer?: boolean;
  transferTier?: TransferTier;
  transferReliabilityPercent?: 100 | 90 | 50;
  transferSource?: string;
  playerFotmobId?: number;
  fromClub?: BilingualText;
  toClub?: BilingualText;
  transferFee?: string;
  telegramPostUrl: string;
  relatedMatchId?: string;
}

export interface StandingRow {
  rank: number;
  leagueKey: LeagueKey;
  team: BilingualText;
  shortName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  form: Array<'W' | 'D' | 'L'>;
  zone?: 'ucl' | 'uel' | 'relegation' | 'none';
}

export interface PollOption {
  id: string;
  label: BilingualText;
  emoji: string;
  votes: number;
}

export interface PollItem {
  id: string;
  matchId?: string;
  articleId?: string;
  question: BilingualText;
  totalVotes: number;
  options: PollOption[];
  telegramChannelUrl: string;
}

export interface FutbolnayaJaraMatchState {
  home: string;
  away: string;
  lineup_sent: boolean;
  poll_10m_sent: boolean;
  kickoff_sent: boolean;
  ht_sent: boolean;
  ft_sent: boolean;
  second_half_sent?: boolean;
  seen_events: string[];
  seen_comm?: string[];
}

export interface FutbolnayaJaraStateFile {
  matches: Record<string, FutbolnayaJaraMatchState>;
  source_idx?: number;
}

export interface LiveFeedResult {
  matches: MatchItem[];
  trackerActiveMatchIds: string[];
  trackerTrackedCount: number;
  source: 'espn+tracker' | 'tracker+mock' | 'espn+mock' | 'mock';
  fetchedAt: string;
}

export function getFotmobPlayerImage(fotmobId: number): string {
  return `https://images.fotmob.com/image_resources/playerimages/${fotmobId}.png`;
}

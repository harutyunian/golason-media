export type EditorialCategory =
  | 'la-liga'
  | 'epl'
  | 'ucl'
  | 'serie-a'
  | 'transfers'
  | 'tactics';

export type TransferReliabilityScore = 100 | 90 | 75 | 50;

export interface EditorialArticle {
  id: string;
  slug: string;
  category: EditorialCategory;
  categoryLabelRu: string;
  categoryLabelEn: string;
  titleRu: string;
  titleEn: string;
  subtitleRu: string;
  subtitleEn: string;
  bodyRu: string[];
  bodyEn: string[];
  authorRu: string;
  authorEn: string;
  authorRoleRu?: string;
  authorRoleEn?: string;
  publishedAtRu: string;
  publishedAtEn: string;
  publishedAtIso?: string;
  readTimeMinutes: number;
  imageUrl: string;
  imageCaptionRu: string;
  imageCaptionEn: string;
  clubLogoUrl: string;
  clubNameRu?: string;
  clubNameEn?: string;
  relatedMatchId: string;
  isLeadStory: boolean;
  isTrending: boolean;
  transferReliability?: TransferReliabilityScore;
  transferSource?: string;
  tagsRu?: string[];
  tagsEn?: string[];
  keyTakeawaysRu?: string[];
  keyTakeawaysEn?: string[];
}

export type EditorialMatchEventType =
  | 'goal'
  | 'penalty-goal'
  | 'own-goal'
  | 'yellow-card'
  | 'red-card'
  | 'substitution'
  | 'var';

export interface EditorialMatchEvent {
  id: string;
  minute: string;
  type: EditorialMatchEventType;
  team: 'home' | 'away';
  playerRu: string;
  playerEn: string;
  secondaryPlayerRu?: string;
  secondaryPlayerEn?: string;
  detailRu: string;
  detailEn: string;
  scoreAfter?: string;
}

export interface EditorialMatchStat {
  labelRu: string;
  labelEn: string;
  homeValue: string;
  awayValue: string;
  homePercent: number;
  awayPercent: number;
}

export interface EditorialMatchTeam {
  id: string;
  nameRu: string;
  nameEn: string;
  shortName: string;
  logoUrl: string;
  score: number;
  formation: string;
  coachRu: string;
  coachEn: string;
}

export interface EditorialMatchDetail {
  id: string;
  leagueKey: EditorialCategory | 'saudi';
  leagueRu: string;
  leagueEn: string;
  roundRu: string;
  roundEn: string;
  status: string;
  statusRu: string;
  statusEn: string;
  kickoffRu: string;
  kickoffEn: string;
  stadiumRu: string;
  stadiumEn: string;
  refereeRu: string;
  refereeEn: string;
  attendance: string;
  homeTeamRu: string;
  homeTeamEn: string;
  homeShortName: string;
  homeLogoUrl: string;
  homeScore: number;
  homeFormation: string;
  awayTeamRu: string;
  awayTeamEn: string;
  awayShortName: string;
  awayLogoUrl: string;
  awayScore: number;
  awayFormation: string;
  homeTeam: EditorialMatchTeam;
  awayTeam: EditorialMatchTeam;
  events: EditorialMatchEvent[];
  stats: EditorialMatchStat[];
  reportTitleRu: string;
  reportTitleEn: string;
  reportRu: string[];
  reportEn: string[];
  relatedArticleSlugs: string[];
  telegramHighlightUrl: string;
}

export interface TransferDealItem {
  id: string;
  playerRu: string;
  playerEn: string;
  positionRu: string;
  positionEn: string;
  age: number;
  fromClubRu: string;
  fromClubEn: string;
  fromClubLogoUrl: string;
  toClubRu: string;
  toClubEn: string;
  toClubLogoUrl: string;
  feeRu: string;
  feeEn: string;
  status: 'confirmed' | 'advanced' | 'negotiating' | 'monitoring';
  statusLabelRu: string;
  statusLabelEn: string;
  reliability: TransferReliabilityScore;
  source: string;
  summaryRu: string;
  summaryEn: string;
  relatedArticleSlug: string;
}

export type EditorialSearchResult = EditorialArticle[] & {
  articles: EditorialArticle[];
  matches: EditorialMatchDetail[];
  transfers: TransferDealItem[];
};

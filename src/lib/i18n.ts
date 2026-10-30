import { BilingualText, Language, LeagueKey, TransferTier } from './types';

export const DEFAULT_LANGUAGE: Language = 'ru';
export const SUPPORTED_LANGUAGES: readonly Language[] = ['ru', 'en'] as const;
export const TELEGRAM_CHANNEL_HANDLE = '@futbolnaya_jara';
export const TELEGRAM_CHANNEL_URL = 'https://t.me/futbolnaya_jara';

export interface UIMessages {
  brand: {
    name: string;
    tagline: string;
    editionLabel: string;
    liveBadge: string;
  };
  nav: {
    home: string;
    liveCenter: string;
    newsFeed: string;
    transferRadar: string;
    tacticalPitch: string;
    substitutions: string;
    standings: string;
    fanPolls: string;
    telegramCta: string;
    switchLangLabel: string;
  };
  ticker: {
    title: string;
    liveNow: string;
    halftime: string;
    fulltime: string;
    upcoming: string;
    botSynced: string;
    espnLive: string;
    allMatches: string;
    watchReplay: string;
  };
  transferRadar: {
    title: string;
    subtitle: string;
    reliabilityLabel: string;
    sourceLabel: string;
    feeLabel: string;
    routeLabel: string;
    filterAll: string;
    tiers: {
      1: {
        badge: string;
        shortLabel: string;
        reliability: string;
        percent: 100;
        description: string;
      };
      2: {
        badge: string;
        shortLabel: string;
        reliability: string;
        percent: 90;
        description: string;
      };
      3: {
        badge: string;
        shortLabel: string;
        reliability: string;
        percent: 50;
        description: string;
      };
    };
  };
  tactics: {
    title: string;
    subtitle: string;
    horizontalPitchBadge: string;
    homeLineup: string;
    awayLineup: string;
    formation: string;
    playerRating: string;
    captain: string;
    goals: string;
    assists: string;
    subbedOut: string;
    fotmobHeadshotsNote: string;
    selectMatchPrompt: string;
    attackDirection: string;
    positions: {
      GK: string;
      DEF: string;
      MID: string;
      FWD: string;
    };
  };
  substitutions: {
    title: string;
    subtitle: string;
    broadcastGraphicBadge: string;
    playerInLabel: string;
    playerOutLabel: string;
    minuteLabel: string;
    reasonLabel: string;
    tacticalImpactLabel: string;
    emptyState: string;
  };
  news: {
    sectionTitle: string;
    sectionSubtitle: string;
    breakingBadge: string;
    readMore: string;
    readTimeSuffix: string;
    filterAll: string;
    filterMatches: string;
    filterTransfers: string;
    filterTactics: string;
    authorPrefix: string;
  };
  standings: {
    title: string;
    subtitle: string;
    rank: string;
    team: string;
    played: string;
    won: string;
    drawn: string;
    lost: string;
    goalsDiff: string;
    points: string;
    form: string;
    uclQualification: string;
    uelQualification: string;
    relegationZone: string;
    leagues: Record<LeagueKey, string>;
  };
  polls: {
    title: string;
    subtitle: string;
    totalVotesLabel: string;
    votedConfirmation: string;
    clickToVote: string;
    discussOnTelegram: string;
  };
  telegram: {
    handle: string;
    url: string;
    watchVideoCta: string;
    instantReplayCta: string;
    channelBannerTitle: string;
    channelBannerSubtitle: string;
    joinChannelButton: string;
    liveTrackerStatus: string;
  };
  footer: {
    aboutText: string;
    poweredBy: string;
    copyright: string;
  };
}

export const DICTIONARY: Record<Language, UIMessages> = {
  ru: {
    brand: {
      name: 'GOLASON MEDIA',
      tagline: 'Футбольная аналитика, тактические разборы, радар трансферов и лайв-матч-центр',
      editionLabel: 'RU / МЕЖДУНАРОДНОЕ ИЗДАНИЕ',
      liveBadge: 'В ЭФИРЕ',
    },
    nav: {
      home: 'Главная',
      liveCenter: 'Матч-центр',
      newsFeed: 'Главные новости',
      transferRadar: 'Радар трансферов',
      tacticalPitch: 'Тактическая схема',
      substitutions: 'Замены (TV-графика)',
      standings: 'Таблицы лиг',
      fanPolls: 'Опросы фанатов',
      telegramCta: 'Видео голов в @futbolnaya_jara',
      switchLangLabel: 'EN',
    },
    ticker: {
      title: 'ТАБЛО МАТЧЕЙ',
      liveNow: 'LIVE',
      halftime: 'ПЕРЕРЫВ',
      fulltime: 'ОКОНЧЕН',
      upcoming: 'СКОРО',
      botSynced: 'Синхронизировано с трекером @futbolnaya_jara',
      espnLive: 'Данные ESPN Scoreboard + Live Bot',
      allMatches: 'Все топ-матчи',
      watchReplay: 'Смотреть голы в Telegram',
    },
    transferRadar: {
      title: 'РАДАР ТРАНСФЕРОВ',
      subtitle: 'Индекс достоверности инсайдов: от официальных коммюнике клубов до слухов таблоидов',
      reliabilityLabel: 'Индекс надежности',
      sourceLabel: 'Источник',
      feeLabel: 'Сумма сделки',
      routeLabel: 'Маршрут перехода',
      filterAll: 'Все уровни',
      tiers: {
        1: {
          badge: 'TIER 1 • 100% ОФИЦИАЛЬНО',
          shortLabel: 'Официально / Клуб',
          reliability: '100% Подтверждено',
          percent: 100,
          description: 'Официальное заявление клуба, зарегистрированный контракт или прямое коммюнике лиги.',
        },
        2: {
          badge: 'TIER 2 • 90% ТОП-ИНСАЙДЕР',
          shortLabel: 'Tier-1 Инсайдер',
          reliability: '90% Высокая точность',
          percent: 90,
          description: 'Проверенные инсайдеры первой величины (Фабрицио Романо, Дэвид Орнштейн, Маттео Моретто).',
        },
        3: {
          badge: 'TIER 3 • 50% СЛУХ / РАДАР',
          shortLabel: 'Слухи / Медиа',
          reliability: '50% На карандаше',
          percent: 50,
          description: 'Ранний скаутский интерес или сообщения региональной спортивной прессы, требующие подтверждения.',
        },
      },
    },
    tactics: {
      title: 'ТАКТИЧЕСКАЯ ДОСКА (SOFASCORE DARK PITCH)',
      subtitle: 'Горизонтальная расстановка 11x11 с реальными портретами игроков FotMob и рейтингами матча',
      horizontalPitchBadge: 'PRO TACTICAL VIEW • 11v11',
      homeLineup: 'Состав хозяев',
      awayLineup: 'Состав гостей',
      formation: 'Тактическая схема',
      playerRating: 'Рейтинг',
      captain: 'Капитан (C)',
      goals: 'Голы',
      assists: 'Ассисты',
      subbedOut: 'Заменен',
      fotmobHeadshotsNote: 'Официальные портреты игроков FotMob CDN + координаты тепловой расстановки',
      selectMatchPrompt: 'Выберите матч для разбора стартовых составов',
      attackDirection: 'Направление атаки',
      positions: {
        GK: 'ВРТ',
        DEF: 'ЗАЩ',
        MID: 'ПЗЩ',
        FWD: 'НАП',
      },
    },
    substitutions: {
      title: 'КАРТОЧКИ ЗАМЕН • ТВ-ТРАНСЛЯЦИЯ',
      subtitle: 'Визуализация ключевых перестановок тренеров с тактическим контекстом и таймингом',
      broadcastGraphicBadge: 'LIVE TV GRAPHIC',
      playerInLabel: 'ВЫШЕЛ НА ПОЛЕ',
      playerOutLabel: 'ПОКИНУЛ ПОЛЕ',
      minuteLabel: 'Минута',
      reasonLabel: 'Причина замены',
      tacticalImpactLabel: 'Тактический эффект',
      emptyState: 'В выбранном матче замен пока не зафиксировано.',
    },
    news: {
      sectionTitle: 'ГЛАВНЫЕ МАТЕРИАЛЫ И ИНСАЙДЫ',
      sectionSubtitle: 'Эксклюзивная хроника топ-лиг, разборы VAR, рекорды и трансферная аналитика на двух языках',
      breakingBadge: 'МОЛНИЯ',
      readMore: 'Читать полный разбор',
      readTimeSuffix: 'мин чтения',
      filterAll: 'Все материалы',
      filterMatches: 'Обзоры матчей',
      filterTransfers: 'Трансферы',
      filterTactics: 'Тактика и рекорды',
      authorPrefix: 'Автор:',
    },
    standings: {
      title: 'ТУРНИРНЫЕ ТАБЛИЦЫ ТОП-ЛИГ',
      subtitle: 'Актуальное положение команд, разница мячей и серия последних 5 матчей',
      rank: '#',
      team: 'Клуб',
      played: 'И',
      won: 'В',
      drawn: 'Н',
      lost: 'П',
      goalsDiff: 'РМ',
      points: 'О',
      form: 'Форма',
      uclQualification: 'Зона Лиги чемпионов УЕФА',
      uelQualification: 'Зона еврокубков / плей-офф',
      relegationZone: 'Зона вылета',
      leagues: {
        laliga: 'Ла Лига',
        epl: 'АПЛ',
        seriea: 'Серия А',
        ucl: 'Лига чемпионов',
        spl: 'Саудовская Про-лига',
        mls: 'МЛС',
        bundesliga: 'Бундеслига',
        ligue1: 'Лига 1',
      },
    },
    polls: {
      title: 'ГОЛОС ТРИБУН • ЭКСПРЕСС-ОПРОСЫ',
      subtitle: 'Голосуйте в один клик и сверяйте мнение с подписчиками @futbolnaya_jara',
      totalVotesLabel: 'голосов болельщиков',
      votedConfirmation: 'Ваш голос учтен!',
      clickToVote: 'Нажмите на вариант для мгновенного голосования',
      discussOnTelegram: 'Обсудить в чате @futbolnaya_jara',
    },
    telegram: {
      handle: TELEGRAM_CHANNEL_HANDLE,
      url: TELEGRAM_CHANNEL_URL,
      watchVideoCta: 'Смотреть видео голов и хайлайты в Telegram @futbolnaya_jara',
      instantReplayCta: 'Мгновенный видеоповтор гола в @futbolnaya_jara',
      channelBannerTitle: 'ФУТБОЛЬНАЯ ЖАРА • LIVE В TELEGRAM',
      channelBannerSubtitle:
        'Видео каждого гола через 15 секунд после удара, карточки составов, таблицы и инсайды без задержек.',
      joinChannelButton: 'Перейти в @futbolnaya_jara',
      liveTrackerStatus: 'Бот-трекер активен 24/7',
    },
    footer: {
      aboutText:
        'Golason Media — двуязычная (RU/EN) цифровая футбольная платформа нового поколения: живая телеметрия матчей, тактические расстановки и проверенный радар трансферов.',
      poweredBy: 'Синхронизировано с live-ядром @futbolnaya_jara и ESPN Scoreboard API',
      copyright: '© 2026 Golason Media. Все права защищены.',
    },
  },
  en: {
    brand: {
      name: 'GOLASON MEDIA',
      tagline: 'Football Intelligence, Tactical Lineups, Transfer Reliability Radar & Live Match Center',
      editionLabel: 'EN / GLOBAL EDITION',
      liveBadge: 'LIVE',
    },
    nav: {
      home: 'Home',
      liveCenter: 'Match Center',
      newsFeed: 'Top Stories',
      transferRadar: 'Transfer Radar',
      tacticalPitch: 'Tactical Pitch',
      substitutions: 'Substitutions (TV)',
      standings: 'Standings',
      fanPolls: 'Fan Polls',
      telegramCta: 'Goal Videos on @futbolnaya_jara',
      switchLangLabel: 'RU',
    },
    ticker: {
      title: 'LIVE MATCH TICKER',
      liveNow: 'LIVE',
      halftime: 'HT',
      fulltime: 'FT',
      upcoming: 'SOON',
      botSynced: 'Synced with @futbolnaya_jara Live Tracker',
      espnLive: 'ESPN Scoreboard + Live Bot Telemetry',
      allMatches: 'All Featured Matches',
      watchReplay: 'Watch Goal Clips on Telegram',
    },
    transferRadar: {
      title: 'TRANSFER RELIABILITY RADAR',
      subtitle: 'Verified insider index: from 100% official club announcements to early scouting radar',
      reliabilityLabel: 'Reliability Rating',
      sourceLabel: 'Source',
      feeLabel: 'Projected Fee',
      routeLabel: 'Transfer Route',
      filterAll: 'All Tiers',
      tiers: {
        1: {
          badge: 'TIER 1 • 100% OFFICIAL',
          shortLabel: 'Official / Club Confirmed',
          reliability: '100% Verified',
          percent: 100,
          description: 'Official club communiqué, signed contract registration, or direct league confirmation.',
        },
        2: {
          badge: 'TIER 2 • 90% TIER-1 INSIDER',
          shortLabel: 'Tier-1 Insider',
          reliability: '90% High Reliability',
          percent: 90,
          description: 'Gold-standard transfer journalists (Fabrizio Romano, David Ornstein, Matteo Moretto).',
        },
        3: {
          badge: 'TIER 3 • 50% RUMOR / RADAR',
          shortLabel: 'Scouting / Rumor',
          reliability: '50% Early Radar',
          percent: 50,
          description: 'Initial scouting links or regional sport press reports awaiting Tier-1 corroboration.',
        },
      },
    },
    tactics: {
      title: 'TACTICAL PITCH (SOFASCORE DARK VIEW)',
      subtitle: 'Horizontal 11v11 tactical formation board with verified FotMob player headshots & live ratings',
      horizontalPitchBadge: 'PRO TACTICAL VIEW • 11v11',
      homeLineup: 'Home Starting XI',
      awayLineup: 'Away Starting XI',
      formation: 'Formation',
      playerRating: 'Match Rating',
      captain: 'Captain (C)',
      goals: 'Goals',
      assists: 'Assists',
      subbedOut: 'Subbed Out',
      fotmobHeadshotsNote: 'Verified FotMob CDN player portraits + positional heat coordinates',
      selectMatchPrompt: 'Select a match to inspect starting tactical lineups',
      attackDirection: 'Direction of Attack',
      positions: {
        GK: 'GK',
        DEF: 'DEF',
        MID: 'MID',
        FWD: 'FWD',
      },
    },
    substitutions: {
      title: 'TV BROADCAST SUBSTITUTION CARDS',
      subtitle: 'Real-time managerial changes with player-in / player-out split cards and tactical breakdown',
      broadcastGraphicBadge: 'LIVE TV GRAPHIC',
      playerInLabel: 'SUBBED ON',
      playerOutLabel: 'SUBBED OFF',
      minuteLabel: 'Minute',
      reasonLabel: 'Reason',
      tacticalImpactLabel: 'Tactical Shift',
      emptyState: 'No substitutions recorded for this match yet.',
    },
    news: {
      sectionTitle: 'EDITORIAL HEADLINES & TRANSFER RADAR',
      sectionSubtitle: 'Bilingual match reports, VAR controversies, historic milestones, and tactical deep-dives',
      breakingBadge: 'BREAKING',
      readMore: 'Read Full Analysis',
      readTimeSuffix: 'min read',
      filterAll: 'All Stories',
      filterMatches: 'Match Reports',
      filterTransfers: 'Transfer Radar',
      filterTactics: 'Tactics & Records',
      authorPrefix: 'By',
    },
    standings: {
      title: 'TOP LEAGUE STANDINGS',
      subtitle: 'Live table positions, goal differential, and 5-match form guide across elite competitions',
      rank: '#',
      team: 'Club',
      played: 'P',
      won: 'W',
      drawn: 'D',
      lost: 'L',
      goalsDiff: 'GD',
      points: 'PTS',
      form: 'Form',
      uclQualification: 'UEFA Champions League Qualification',
      uelQualification: 'Continental / Playoff Qualification',
      relegationZone: 'Relegation Zone',
      leagues: {
        laliga: 'La Liga',
        epl: 'Premier League',
        seriea: 'Serie A',
        ucl: 'Champions League',
        spl: 'Saudi Pro League',
        mls: 'MLS',
        bundesliga: 'Bundesliga',
        ligue1: 'Ligue 1',
      },
    },
    polls: {
      title: '1-CLICK FAN PULSE POLLS',
      subtitle: 'Cast your instant vote and compare with the @futbolnaya_jara community',
      totalVotesLabel: 'fan votes cast',
      votedConfirmation: 'Vote recorded!',
      clickToVote: 'Click an option to vote instantly',
      discussOnTelegram: 'Discuss live on @futbolnaya_jara',
    },
    telegram: {
      handle: TELEGRAM_CHANNEL_HANDLE,
      url: TELEGRAM_CHANNEL_URL,
      watchVideoCta: 'Watch Instant Goal Videos & Highlights on Telegram @futbolnaya_jara',
      instantReplayCta: 'Instant Goal Video Replay on @futbolnaya_jara',
      channelBannerTitle: 'FUTBOLNAYA JARA • INSTANT TELEGRAM GOAL HUB',
      channelBannerSubtitle:
        'HD goal clips within 15 seconds of the net bulging, dark-mode lineup cards, and breaking transfer alerts.',
      joinChannelButton: 'Open @futbolnaya_jara on Telegram',
      liveTrackerStatus: '24/7 Automated Match Tracker Active',
    },
    footer: {
      aboutText:
        'Golason Media is a next-gen bilingual (EN/RU) football journalism and live tactical telemetry platform built for modern supporters.',
      poweredBy: 'Powered by the @futbolnaya_jara Live Engine & ESPN Scoreboard API',
      copyright: '© 2026 Golason Media. All rights reserved.',
    },
  },
};

export function normalizeLanguage(input?: string | null): Language {
  if (input === 'en' || input === 'ru') {
    return input;
  }
  return DEFAULT_LANGUAGE;
}

export function getDictionary(lang: Language = DEFAULT_LANGUAGE): UIMessages {
  return DICTIONARY[lang] ?? DICTIONARY[DEFAULT_LANGUAGE];
}

export function t(value: BilingualText | string | undefined, lang: Language = DEFAULT_LANGUAGE): string {
  if (!value) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  return value[lang] ?? value.ru ?? value.en ?? '';
}

export function getTransferTierMeta(tier: TransferTier, lang: Language = DEFAULT_LANGUAGE) {
  return getDictionary(lang).transferRadar.tiers[tier];
}

import { DEFAULT_LANGUAGE, getDictionary, t, TELEGRAM_CHANNEL_URL } from './i18n';
import { Language, MatchItem, NewsArticle } from './types';

export const SITE_URL = 'https://golason.media';
export const SITE_NAME = 'Golason Media';

export interface NewsArticleJsonLd {
  '@context': 'https://schema.org';
  '@type': 'NewsArticle';
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
  headline: string;
  description: string;
  image: string[];
  datePublished: string;
  dateModified: string;
  inLanguage: 'ru-RU' | 'en-US';
  author: {
    '@type': 'Person' | 'Organization';
    name: string;
    url: string;
  };
  publisher: {
    '@type': 'NewsMediaOrganization';
    name: string;
    url: string;
    sameAs: string[];
    logo: {
      '@type': 'ImageObject';
      url: string;
      width: number;
      height: number;
    };
  };
  articleSection: string;
  keywords: string;
  isAccessibleForFree: boolean;
}

export interface SportsEventJsonLd {
  '@context': 'https://schema.org';
  '@type': 'SportsEvent';
  name: string;
  description: string;
  startDate: string;
  eventStatus: string;
  sport: 'Soccer';
  location: {
    '@type': 'StadiumOrArena';
    name: string;
  };
  homeTeam: {
    '@type': 'SportsTeam';
    name: string;
  };
  awayTeam: {
    '@type': 'SportsTeam';
    name: string;
  };
  competitor: Array<{
    '@type': 'SportsTeam';
    name: string;
    result?: string;
  }>;
  organizer: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
}

export function buildNewsArticleJsonLd(
  article: NewsArticle,
  lang: Language = DEFAULT_LANGUAGE
): NewsArticleJsonLd {
  const headline = t(article.title, lang);
  const description = t(article.summary, lang);
  const authorName = t(article.author, lang);
  const section = t(article.categoryLabel, lang);
  const keywords = article.tags.map((tag) => t(tag, lang)).join(', ');

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${lang}/news/${article.slug}`,
    },
    headline,
    description,
    image: [article.imageUrl],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: lang === 'ru' ? 'ru-RU' : 'en-US',
    author: {
      '@type': 'Person',
      name: authorName,
      url: TELEGRAM_CHANNEL_URL,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: [TELEGRAM_CHANNEL_URL],
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 600,
        height: 60,
      },
    },
    articleSection: section,
    keywords,
    isAccessibleForFree: true,
  };
}

export function buildSportsEventJsonLd(
  match: MatchItem,
  lang: Language = DEFAULT_LANGUAGE
): SportsEventJsonLd {
  const homeName = t(match.homeTeam.name, lang);
  const awayName = t(match.awayTeam.name, lang);
  const leagueName = t(match.league, lang);
  const venueName = t(match.venue, lang);

  const eventStatusMap: Record<MatchItem['status'], string> = {
    LIVE: 'https://schema.org/EventInProgress',
    HT: 'https://schema.org/EventInProgress',
    FT: 'https://schema.org/EventCompleted',
    UPCOMING: 'https://schema.org/EventScheduled',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${homeName} vs ${awayName} (${leagueName})`,
    description: `${leagueName}: ${homeName} ${match.homeTeam.score} - ${match.awayTeam.score} ${awayName}`,
    startDate: match.kickoffIso,
    eventStatus: eventStatusMap[match.status],
    sport: 'Soccer',
    location: {
      '@type': 'StadiumOrArena',
      name: venueName,
    },
    homeTeam: {
      '@type': 'SportsTeam',
      name: homeName,
    },
    awayTeam: {
      '@type': 'SportsTeam',
      name: awayName,
    },
    competitor: [
      {
        '@type': 'SportsTeam',
        name: homeName,
        result: String(match.homeTeam.score),
      },
      {
        '@type': 'SportsTeam',
        name: awayName,
        result: String(match.awayTeam.score),
      },
    ],
    organizer: {
      '@type': 'Organization',
      name: leagueName,
      url: SITE_URL,
    },
  };
}

export function buildHomePageJsonLd(
  articles: NewsArticle[],
  matches: MatchItem[],
  lang: Language = DEFAULT_LANGUAGE
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...articles.map((article) => buildNewsArticleJsonLd(article, lang)),
      ...matches.map((match) => buildSportsEventJsonLd(match, lang)),
    ],
  };
}

export function buildBilingualOpenGraphMetadata(
  lang: Language = DEFAULT_LANGUAGE,
  article?: NewsArticle
) {
  const dict = getDictionary(lang);
  const title = article
    ? `${t(article.title, lang)} | ${SITE_NAME}`
    : `${SITE_NAME} — ${dict.brand.tagline}`;
  const description = article ? t(article.summary, lang) : dict.footer.aboutText;
  const canonicalUrl = article ? `${SITE_URL}/${lang}/news/${article.slug}` : `${SITE_URL}/${lang}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ru-RU': article ? `${SITE_URL}/ru/news/${article.slug}` : `${SITE_URL}/ru`,
        'en-US': article ? `${SITE_URL}/en/news/${article.slug}` : `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      alternateLocale: lang === 'ru' ? ['en_US'] : ['ru_RU'],
      type: article ? ('article' as const) : ('website' as const),
      images: [
        {
          url: article?.imageUrl ?? `${SITE_URL}/og-cover.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [article?.imageUrl ?? `${SITE_URL}/og-cover.png`],
    },
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

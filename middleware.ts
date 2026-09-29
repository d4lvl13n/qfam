import { next, rewrite } from '@vercel/edge';

/**
 * Vercel Edge Middleware — Route social crawlers to OG meta endpoint
 *
 * Social media bots (Facebook, Twitter, LinkedIn, etc.) don't execute JS,
 * so they can't see React Helmet meta tags. This middleware detects bot
 * user-agents and rewrites the request to /api/og which returns proper
 * og:title, og:description, og:image for social sharing.
 */

const BOT_PATTERN = /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|Slackbot|Discordbot|TelegramBot|Pinterest|Pinterestbot|Applebot|Embedly|Quora Link Preview|Showyoubot|vkShare|Outbrain|W3C_Validator|redditbot|Rocket\.Chat/i;

const OG_ROUTES = /^\/(blog|category|tag|experiences)(\/[^/]+)?\/?$/;

export default function middleware(request: Request) {
  const userAgent = request.headers.get('user-agent') || '';

  if (!BOT_PATTERN.test(userAgent)) {
    return next();
  }

  const url = new URL(request.url);

  if (!OG_ROUTES.test(url.pathname)) {
    return next();
  }

  // Strip trailing slash for consistent path matching
  const cleanPath = url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname;

  const ogUrl = new URL(`/api/og`, request.url);
  ogUrl.searchParams.set('path', cleanPath);

  return rewrite(ogUrl);
}

export const config = {
  matcher: ['/blog/:path*', '/category/:path*', '/tag/:path*', '/experiences/:path*'],
};

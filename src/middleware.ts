import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Helper function to detect search engine bots
function isBot(userAgent: string): boolean {
  if (!userAgent) return false;
  
  try {
    const botPatterns = [
      'googlebot', 'bingbot', 'yandex', 'baiduspider', 'facebookexternalhit',
      'twitterbot', 'rogerbot', 'linkedinbot', 'embedly', 'quora link preview',
      'showyoubot', 'outbrain', 'pinterest', 'slackbot', 'vkShare', 'W3C_Validator',
      'crawler', 'spider', 'bot', 'lighthouse', 'Chrome-Lighthouse', 'chrome-lighthouse'
    ];
    
    const lowercasedUA = userAgent.toLowerCase();
    return botPatterns.some(pattern => lowercasedUA.includes(pattern));
  } catch (error) {
    console.error('Error in bot detection:', error);
    return false;
  }
}

export function middleware(request: NextRequest) {
  try {
    // Get the user agent
    const userAgent = request.headers.get('user-agent') || '';
    
    // If it's a bot, skip any complex middleware processing
    if (isBot(userAgent)) {
      return NextResponse.next();
    }
    
    // Your existing middleware logic for regular users
    // ...
    
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // Always allow the request to proceed in case of errors
    return NextResponse.next();
  }
}

// Configure the middleware to ignore certain paths that are critical for SEO
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)' 
  ],
}; 
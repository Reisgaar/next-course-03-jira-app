import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    // return NextResponse.redirect(new URL('/home', req.url));
    if (req.nextUrl.pathname.startsWith('/api/entries/')) {
        const id = req.nextUrl.pathname.replace('/api/entries/', '');
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        if (!checkMongoIDRegExp.test(id)) {
            const url = req.nextUrl.clone();
            url.pathname = '/api/bad-request';
            url.search = `?message=${id} is not a valid MongoID`;
            return NextResponse.rewrite(url);
        }
    }
    
    return NextResponse.next(); // Middleware doesn't do anythig, let the user continue to requested route
}
 
// See "Matching Paths" below to learn more
export const config = {
    // matcher: '/about/:path*',
    matcher: [
        // '/api/:path',
        '/api/entries/:path*'
    ]
}
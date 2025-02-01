import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Example: Log the request URL (or any other logic)
  console.log('Request URL:', request.url);

  // Continue to the next middleware or request handler
  return NextResponse.next();
}

// Alternatively, you can use a default export
// export default function middleware(request) {
//   return NextResponse.next();
// }

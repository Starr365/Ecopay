import { NextRequest, NextResponse } from 'next/server';
import { handleCors } from '@/lib/cors';

export async function POST(request: NextRequest) {
  // Handle CORS
  const response = NextResponse.next();
  // CORS is handled by the rewrites in next.config.ts

  try {
    const body = await request.json();
    const { email, password } = body;

    // TODO: Implement actual authentication logic
    // For now, return a mock response
    if (email && password) {
      return NextResponse.json({
        success: true,
        user: {
          id: '1',
          name: 'Test User',
          email: email,
          balance: 1000
        },
        token: 'mock-jwt-token'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const response = NextResponse.next();
  // CORS is handled by the rewrites in next.config.ts
  return response;
}
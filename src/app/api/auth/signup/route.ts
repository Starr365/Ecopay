import { NextRequest, NextResponse } from 'next/server';
import { handleCors } from '@/lib/cors';

export async function POST(request: NextRequest) {
  // Handle CORS
  const response = NextResponse.next();
  // CORS is handled by the rewrites in next.config.ts

  try {
    const body = await request.json();
    const { fullName, email, password } = body;

    // TODO: Implement actual user registration logic
    // For now, return a mock response
    if (fullName && email && password) {
      return NextResponse.json({
        success: true,
        user: {
          id: '1',
          name: fullName,
          email: email,
          balance: 0
        },
        token: 'mock-jwt-token'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid registration data' },
      { status: 400 }
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
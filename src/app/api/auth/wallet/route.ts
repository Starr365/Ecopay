import { NextRequest, NextResponse } from 'next/server';
import { createProxyHandler, mockResponses } from '@/lib/proxy';

const proxyHandler = createProxyHandler('auth/wallet');

export async function POST(request: NextRequest) {
  // Return mock data for development
  return NextResponse.json({
    success: true,
    data: mockResponses.wallet.post
  });
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.next();
}
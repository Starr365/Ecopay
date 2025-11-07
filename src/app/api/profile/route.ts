import { NextRequest, NextResponse } from 'next/server';
import { createProxyHandler, mockResponses } from '@/lib/proxy';

const proxyHandler = createProxyHandler('profile');

export async function GET(request: NextRequest) {
  // Return mock data for development
  return NextResponse.json(mockResponses.profile);
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.next();
}
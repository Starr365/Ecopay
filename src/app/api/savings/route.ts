import { NextRequest, NextResponse } from 'next/server';
import { createProxyHandler, mockResponses } from '@/lib/proxy';

const proxyHandler = createProxyHandler('savings');

export async function GET(request: NextRequest) {
  // Return mock data for development
  return NextResponse.json(mockResponses.savings.get);
}

export async function POST(request: NextRequest) {
  // Return mock data for development
  return NextResponse.json({
    success: true,
    data: mockResponses.savings.post
  });
}

export async function PUT(request: NextRequest) {
  // Return mock data for development
  return NextResponse.json({
    success: true,
    data: { ...mockResponses.savings.post, updated: true }
  });
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.next();
}
import { NextRequest, NextResponse } from 'next/server';
import { createProxyHandler, mockResponses } from '@/lib/proxy';

const proxyHandler = createProxyHandler('projects');

export async function GET(request: NextRequest) {
  // Return mock data for development
  return NextResponse.json(mockResponses.projects.get);
}

export async function POST(request: NextRequest) {
  // Return mock data for development
  return NextResponse.json({
    success: true,
    data: mockResponses.projects.post
  });
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.next();
}
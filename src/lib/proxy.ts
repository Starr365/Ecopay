import { NextRequest, NextResponse } from 'next/server';

const PRODUCTION_API_URL = 'https://ecopay-eight.vercel.app/api';

export async function createProxyHandler(endpoint: string, method: string = 'GET') {
  return async function handler(request: NextRequest) {
    try {
      const url = new URL(request.url);
      const pathParts = url.pathname.split('/').filter(Boolean);

      // Remove 'api' from path parts
      const apiIndex = pathParts.indexOf('api');
      if (apiIndex !== -1) {
        pathParts.splice(apiIndex, 1);
      }

      // Reconstruct the target URL
      const targetPath = pathParts.join('/');
      const targetUrl = `${PRODUCTION_API_URL}/${targetPath}${url.search}`;

      // Get request body for POST/PUT requests
      let body = undefined;
      if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
        try {
          body = await request.json();
        } catch (e) {
          // Body might not be JSON
        }
      }

      // Forward the request to the production API
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': request.headers.get('authorization') || '',
          // Forward other relevant headers
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      // Return the response
      const responseData = await response.json().catch(() => ({}));

      return NextResponse.json(responseData, {
        status: response.status,
        headers: {
          'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production'
            ? 'https://ecopay-eight.vercel.app'
            : '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });

    } catch (error) {
      console.error(`Proxy error for ${endpoint}:`, error);
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

// Mock data for development/testing
export const mockResponses = {
  transactions: {
    get: [
      {
        id: '1',
        type: 'sent' as const,
        description: 'Transfer to John Doe',
        amount: 15000,
        time: '2 hours ago',
        fee: 5
      },
      {
        id: '2',
        type: 'received' as const,
        description: 'Payment from EcoShop',
        amount: 8500,
        time: '1 day ago'
      }
    ],
    post: { id: 'new-transaction', success: true }
  },

  profile: {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    balance: 1000,
    walletAddress: '0x123...'
  },

  savings: {
    get: [
      {
        id: '1',
        name: 'Emergency Fund',
        target: 500000,
        current: 320000,
        deadline: '2024-12-31'
      }
    ],
    post: { id: 'new-saving', success: true }
  },

  projects: {
    get: [
      {
        id: '1',
        name: 'Reforestation Project',
        description: 'Planting trees in Amazon',
        impact: 'Reduces CO2 by 100kg per tree',
        status: 'active' as const
      }
    ],
    post: { id: 'new-project', success: true }
  },

  balance: {
    post: { balance: 1500, success: true }
  },

  wallet: {
    post: { connected: true, success: true }
  }
};
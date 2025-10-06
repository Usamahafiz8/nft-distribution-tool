import { NextRequest, NextResponse } from 'next/server';
import { virtualItemStorePrisma } from '@/lib/data-store-prisma';

// GET /api/virtual-items/stats - Get database statistics
export async function GET(request: NextRequest) {
  try {
    const stats = await virtualItemStorePrisma.getStats();
    
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

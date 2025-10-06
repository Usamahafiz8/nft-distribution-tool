import { NextRequest, NextResponse } from 'next/server';
import { virtualItemStorePrisma } from '@/lib/data-store-prisma';

// GET /api/virtual-items/filters - Get unique values for filter dropdowns
export async function GET(request: NextRequest) {
  try {
    const filters = {
      platforms: await virtualItemStorePrisma.getUniqueValues('platform'),
      intellectualProperties: await virtualItemStorePrisma.getUniqueValues('intellectualProperty'),
      categories: await virtualItemStorePrisma.getUniqueValues('category'),
      types: await virtualItemStorePrisma.getUniqueValues('type'),
      collections: await virtualItemStorePrisma.getUniqueValues('collection'),
      series: await virtualItemStorePrisma.getUniqueValues('series'),
      artists: await virtualItemStorePrisma.getUniqueValues('artist'),
      rarities: await virtualItemStorePrisma.getUniqueValues('rarity'),
    };
    
    return NextResponse.json({
      success: true,
      data: filters
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch filter options' },
      { status: 500 }
    );
  }
}

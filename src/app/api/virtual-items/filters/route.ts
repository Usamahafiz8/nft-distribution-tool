import { NextRequest, NextResponse } from 'next/server';
import { virtualItemStore } from '@/lib/data-store';

// GET /api/virtual-items/filters - Get unique values for filter dropdowns
export async function GET(request: NextRequest) {
  try {
    const filters = {
      platforms: virtualItemStore.getUniqueValues('platform'),
      intellectualProperties: virtualItemStore.getUniqueValues('intellectualProperty'),
      categories: virtualItemStore.getUniqueValues('category'),
      types: virtualItemStore.getUniqueValues('type'),
      collections: virtualItemStore.getUniqueValues('collection'),
      series: virtualItemStore.getUniqueValues('series'),
      artists: virtualItemStore.getUniqueValues('artist'),
      rarities: virtualItemStore.getUniqueValues('rarity'),
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

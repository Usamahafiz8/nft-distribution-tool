import { NextRequest, NextResponse } from 'next/server';
import { virtualItemStorePrisma } from '@/lib/data-store-prisma';
import { VirtualItemCreateInput, VirtualItemFilters } from '@/types/virtual-item';

// GET /api/virtual-items - Get all virtual items with optional filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters: VirtualItemFilters = {};
    
    // Extract filter parameters from query string
    if (searchParams.get('platform')) filters.platform = searchParams.get('platform')!;
    if (searchParams.get('intellectualProperty')) filters.intellectualProperty = searchParams.get('intellectualProperty')!;
    if (searchParams.get('category')) filters.category = searchParams.get('category')!;
    if (searchParams.get('type')) filters.type = searchParams.get('type')!;
    if (searchParams.get('collection')) filters.collection = searchParams.get('collection')!;
    if (searchParams.get('series')) filters.series = searchParams.get('series')!;
    if (searchParams.get('artist')) filters.artist = searchParams.get('artist')!;
    if (searchParams.get('rarity')) filters.rarity = searchParams.get('rarity')!;
    if (searchParams.get('search')) filters.search = searchParams.get('search')!;

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const result = await virtualItemStorePrisma.getAllWithPagination(filters, skip, limit);
    
    return NextResponse.json({
      success: true,
      data: result.items,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
        hasNext: page < Math.ceil(result.total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching virtual items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch virtual items' },
      { status: 500 }
    );
  }
}

// POST /api/virtual-items - Create a new virtual item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['platform', 'title', 'category', 'type'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    const newItem = await virtualItemStorePrisma.create(body as VirtualItemCreateInput);
    
    return NextResponse.json({
      success: true,
      data: newItem
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating virtual item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create virtual item' },
      { status: 500 }
    );
  }
}

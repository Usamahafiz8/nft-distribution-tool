import { NextRequest, NextResponse } from 'next/server';
import { virtualItemStore } from '@/lib/data-store';

// GET /api/virtual-items/[id] - Get a specific virtual item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = virtualItemStore.getById(params.id);
    
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Virtual item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error fetching virtual item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch virtual item' },
      { status: 500 }
    );
  }
}

// PUT /api/virtual-items/[id] - Update a virtual item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const updatedItem = virtualItemStore.update(params.id, body);
    
    if (!updatedItem) {
      return NextResponse.json(
        { success: false, error: 'Virtual item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    console.error('Error updating virtual item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update virtual item' },
      { status: 500 }
    );
  }
}

// DELETE /api/virtual-items/[id] - Delete a virtual item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = virtualItemStore.delete(params.id);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Virtual item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Virtual item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting virtual item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete virtual item' },
      { status: 500 }
    );
  }
}

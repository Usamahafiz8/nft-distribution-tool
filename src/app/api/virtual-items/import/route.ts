import { NextRequest, NextResponse } from 'next/server';
import { virtualItemStorePrisma } from '@/lib/data-store-prisma';

// POST /api/virtual-items/import - Import virtual items from CSV data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { csvData } = body;
    
    if (!csvData || !Array.isArray(csvData)) {
      return NextResponse.json(
        { success: false, error: 'Invalid CSV data provided' },
        { status: 400 }
      );
    }

    const importedItems = await virtualItemStorePrisma.importFromCSV(csvData);
    
    return NextResponse.json({
      success: true,
      data: importedItems,
      count: importedItems.length,
      message: `Successfully imported ${importedItems.length} virtual items`
    });
  } catch (error) {
    console.error('Error importing virtual items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to import virtual items' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { virtualItemStorePrisma } from '@/lib/data-store-prisma';

// GET /api/virtual-items/export - Export all virtual items as CSV
export async function GET() {
  try {
    const csvData = await virtualItemStorePrisma.exportToCSV();
    
    return NextResponse.json({
      success: true,
      data: csvData,
      count: csvData.length
    });
  } catch (error) {
    console.error('Error exporting virtual items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to export virtual items' },
      { status: 500 }
    );
  }
}

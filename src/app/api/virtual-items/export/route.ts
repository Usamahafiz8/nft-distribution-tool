import { NextRequest, NextResponse } from 'next/server';
import { virtualItemStore } from '@/lib/data-store';

// GET /api/virtual-items/export - Export all virtual items as CSV
export async function GET(request: NextRequest) {
  try {
    const csvData = virtualItemStore.exportToCSV();
    
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

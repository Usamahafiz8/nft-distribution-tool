'use client';

import { useState } from 'react';

interface ImportExportButtonsProps {
  onImportSuccess: () => void;
}

export function ImportExportButtons({ onImportSuccess }: ImportExportButtonsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/virtual-items/export');
      const data = await response.json();

      if (data.success) {
        // Convert to CSV format
        const csvContent = convertToCSV(data.data);
        
        // Download the file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `virtual-items-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        setError(data.error || 'Failed to export items');
      }
    } catch (err) {
      setError('Failed to export items');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset file input
    event.target.value = '';

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setLoading(true);
        setError(null);

        const csvText = e.target?.result as string;
        console.log('CSV Text length:', csvText.length);
        
        const csvData = parseCSV(csvText);
        console.log('Parsed CSV data:', csvData.length, 'rows');
        
        if (csvData.length === 0) {
          setError('No valid data found in CSV file. Please check the file format.');
          return;
        }

        const response = await fetch('/api/virtual-items/import', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ csvData }),
        });

        const data = await response.json();

        if (data.success) {
          alert(`Successfully imported ${data.count} items`);
          onImportSuccess();
        } else {
          setError(data.error || 'Failed to import items');
        }
      } catch (err) {
        console.error('Import error:', err);
        setError(`Failed to import items: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(file);
  };

  const convertToCSV = (data: Record<string, unknown>[]) => {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];

    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in values
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  };

  const parseCSV = (csvText: string) => {
    const lines = csvText.split('\n');
    const data = [];
    
    // Find the actual header row (skip empty rows and metadata rows)
    let headerRowIndex = -1;
    let headers: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && line.includes('Platform') && line.includes('Title')) {
        headerRowIndex = i;
        headers = line.split(',').map(h => h.trim().replace(/"/g, ''));
        break;
      }
    }
    
    if (headerRowIndex === -1) {
      throw new Error('Could not find valid header row in CSV');
    }
    
    // Parse data rows
    for (let i = headerRowIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines
      if (!line) continue;
      
      // Skip lines that are all commas (empty rows)
      if (line.split(',').every(cell => cell.trim() === '')) continue;
      
      // Parse the CSV row properly handling quoted values
      const values = parseCSVRow(line);
      
      // Only process rows that have essential data (Platform and Title)
      if (values.length > 0 && values[0] && values[7]) { // Platform and Title columns
        const row: Record<string, unknown> = {};
        
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        
        data.push(row);
      }
    }

    return data;
  };

  // Helper function to parse CSV row handling quoted values
  const parseCSVRow = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add the last field
    result.push(current.trim());
    
    return result;
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Import Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex gap-3">
        <button
          onClick={handleExport}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {loading ? 'Exporting...' : 'Export CSV'}
        </button>

        <label className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors flex items-center gap-2 disabled:opacity-50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          {loading ? 'Importing...' : 'Import CSV'}
          <input
            type="file"
            accept=".csv"
            onChange={handleImport}
            className="hidden"
            disabled={loading}
          />
        </label>
      </div>
    </div>
  );
}

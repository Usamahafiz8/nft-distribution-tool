'use client';

interface PageSizeSelectorProps {
  currentLimit: number;
  onLimitChange: (limit: number) => void;
}

export function PageSizeSelector({ currentLimit, onLimitChange }: PageSizeSelectorProps) {
  const pageSizes = [5, 10, 25, 50, 100];

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="page-size" className="text-sm font-medium text-gray-700">
        Show:
      </label>
      <select
        id="page-size"
        value={currentLimit}
        onChange={(e) => onLimitChange(parseInt(e.target.value))}
        className="block w-20 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        {pageSizes.map(size => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <span className="text-sm text-gray-500">per page</span>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { VirtualItem, VirtualItemFilters } from '@/types/virtual-item';
import { VirtualItemsList } from './VirtualItemsList';
import { VirtualItemForm } from './VirtualItemForm';
import { VirtualItemsFilters } from './VirtualItemsFilters';
import { ImportExportButtons } from './ImportExportButtons';

export function VirtualItemsManager() {
  const [items, setItems] = useState<VirtualItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<VirtualItem | null>(null);
  const [filters, setFilters] = useState<VirtualItemFilters>({});
  const [filterOptions, setFilterOptions] = useState<any>({});

  // Fetch items from API
  const fetchItems = async (currentFilters?: VirtualItemFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams();
      if (currentFilters?.platform) queryParams.append('platform', currentFilters.platform);
      if (currentFilters?.intellectualProperty) queryParams.append('intellectualProperty', currentFilters.intellectualProperty);
      if (currentFilters?.category) queryParams.append('category', currentFilters.category);
      if (currentFilters?.type) queryParams.append('type', currentFilters.type);
      if (currentFilters?.collection) queryParams.append('collection', currentFilters.collection);
      if (currentFilters?.series) queryParams.append('series', currentFilters.series);
      if (currentFilters?.artist) queryParams.append('artist', currentFilters.artist);
      if (currentFilters?.rarity) queryParams.append('rarity', currentFilters.rarity);
      if (currentFilters?.search) queryParams.append('search', currentFilters.search);

      const response = await fetch(`/api/virtual-items?${queryParams.toString()}`);
      const data = await response.json();

      if (data.success) {
        setItems(data.data);
      } else {
        setError(data.error || 'Failed to fetch items');
      }
    } catch (err) {
      setError('Failed to fetch items');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      const response = await fetch('/api/virtual-items/filters');
      const data = await response.json();
      
      if (data.success) {
        setFilterOptions(data.data);
      }
    } catch (err) {
      console.error('Error fetching filter options:', err);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchItems(filters);
    fetchFilterOptions();
  }, []);

  // Handle filter changes
  const handleFiltersChange = (newFilters: VirtualItemFilters) => {
    setFilters(newFilters);
    fetchItems(newFilters);
  };

  // Handle item creation
  const handleItemCreate = async (itemData: any) => {
    try {
      const response = await fetch('/api/virtual-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      const data = await response.json();

      if (data.success) {
        setShowForm(false);
        fetchItems(filters); // Refresh the list
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to create item' };
    }
  };

  // Handle item update
  const handleItemUpdate = async (id: string, itemData: any) => {
    try {
      const response = await fetch(`/api/virtual-items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      const data = await response.json();

      if (data.success) {
        setEditingItem(null);
        fetchItems(filters); // Refresh the list
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to update item' };
    }
  };

  // Handle item deletion
  const handleItemDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const response = await fetch(`/api/virtual-items/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchItems(filters); // Refresh the list
      } else {
        alert(data.error || 'Failed to delete item');
      }
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  // Handle edit item
  const handleEditItem = (item: VirtualItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  // Handle form close
  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading virtual items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-medium mb-2">Error</h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => fetchItems(filters)}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Virtual Items ({items.length})
          </h2>
          <p className="text-gray-600">
            Manage your virtual item metadata
          </p>
        </div>
        
        <div className="flex gap-3">
          <ImportExportButtons onImportSuccess={() => fetchItems(filters)} />
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <VirtualItemsFilters
        filters={filters}
        filterOptions={filterOptions}
        onFiltersChange={handleFiltersChange}
      />

      {/* Items List */}
      <VirtualItemsList
        items={items}
        onEdit={handleEditItem}
        onDelete={handleItemDelete}
      />

      {/* Form Modal */}
      {showForm && (
        <VirtualItemForm
          item={editingItem}
          onSave={editingItem ? handleItemUpdate : handleItemCreate}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

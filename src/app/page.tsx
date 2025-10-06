'use client';

import { VirtualItemsManager } from '@/components/VirtualItemsManager';
import { DataVisualization } from '@/components/DataVisualization';
import { CSVTestComponent } from '@/components/CSVTestComponent';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'items' | 'analytics'>('items');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Inspector Gadget Distribution Tool
          </h1>
          <p className="text-lg text-gray-600">
            Manage virtual item metadata for your collectibles
          </p>
        </header>
        
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('items')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'items'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Virtual Items
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Data Analytics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'items' && (
          <div>
            <div className="mb-8">
              <CSVTestComponent />
            </div>
            <VirtualItemsManager />
          </div>
        )}

        {activeTab === 'analytics' && (
          <DataVisualization />
        )}
      </div>
    </div>
  );
}
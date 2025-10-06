'use client';

import { VirtualItemsManager } from '@/components/VirtualItemsManager';

export default function Home() {
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
        
        <VirtualItemsManager />
      </div>
    </div>
  );
}
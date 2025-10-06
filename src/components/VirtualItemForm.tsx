'use client';

import { useState, useEffect } from 'react';
import { VirtualItem } from '@/types/virtual-item';

interface VirtualItemFormProps {
  item?: VirtualItem | null;
  onSave: (data: any) => Promise<{ success: boolean; error?: string }>;
  onClose: () => void;
}

export function VirtualItemForm({ item, onSave, onClose }: VirtualItemFormProps) {
  const [formData, setFormData] = useState({
    platform: '',
    platformUrl: '',
    intellectualProperty: '',
    ageRating: '',
    category: '',
    type: '',
    subType: '',
    title: '',
    mintSupply: '',
    includeSerialNumber: '',
    preMintCount: '',
    reservedSerialNumbers: '',
    serialNumberTransferOrder: '',
    purchaseCurrency1: '',
    purchasePrice1: '',
    andOr: '',
    purchaseCurrency2: '',
    purchasePrice2: '',
    unlockCurrency: '',
    unlockThreshold: '',
    mediaPrimaryGoogleUrl: '',
    mediaDisplayGoogleUrl: '',
    mediaPrimaryS3Bucket: '',
    mediaDisplayS3Bucket: '',
    transferability: '',
    p2pSaleRoyalty: '',
    description: '',
    mintLimitPerWallet: '',
    p2pLimitPerWallet: '',
    collection: '',
    series: '',
    episode: '',
    set: '',
    season: '',
    level: '',
    rank: '',
    enhancement: '',
    levelRankUpgradeType: '',
    artist: '',
    editionType: '',
    rarity: '',
    bonusMediaUrl: '',
    copyright: '',
    comments: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setFormData({
        platform: item.platform || '',
        platformUrl: item.platformUrl || '',
        intellectualProperty: item.intellectualProperty || '',
        ageRating: item.ageRating || '',
        category: item.category || '',
        type: item.type || '',
        subType: item.subType || '',
        title: item.title || '',
        mintSupply: item.mintSupply || '',
        includeSerialNumber: item.includeSerialNumber || '',
        preMintCount: item.preMintCount || '',
        reservedSerialNumbers: item.reservedSerialNumbers || '',
        serialNumberTransferOrder: item.serialNumberTransferOrder || '',
        purchaseCurrency1: item.purchaseCurrency1 || '',
        purchasePrice1: item.purchasePrice1 || '',
        andOr: item.andOr || '',
        purchaseCurrency2: item.purchaseCurrency2 || '',
        purchasePrice2: item.purchasePrice2 || '',
        unlockCurrency: item.unlockCurrency || '',
        unlockThreshold: item.unlockThreshold || '',
        mediaPrimaryGoogleUrl: item.mediaPrimaryGoogleUrl || '',
        mediaDisplayGoogleUrl: item.mediaDisplayGoogleUrl || '',
        mediaPrimaryS3Bucket: item.mediaPrimaryS3Bucket || '',
        mediaDisplayS3Bucket: item.mediaDisplayS3Bucket || '',
        transferability: item.transferability || '',
        p2pSaleRoyalty: item.p2pSaleRoyalty || '',
        description: item.description || '',
        mintLimitPerWallet: item.mintLimitPerWallet || '',
        p2pLimitPerWallet: item.p2pLimitPerWallet || '',
        collection: item.collection || '',
        series: item.series || '',
        episode: item.episode || '',
        set: item.set || '',
        season: item.season || '',
        level: item.level || '',
        rank: item.rank || '',
        enhancement: item.enhancement || '',
        levelRankUpgradeType: item.levelRankUpgradeType || '',
        artist: item.artist || '',
        editionType: item.editionType || '',
        rarity: item.rarity || '',
        bonusMediaUrl: item.bonusMediaUrl || '',
        copyright: item.copyright || '',
        comments: item.comments || '',
      });
    }
  }, [item]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await onSave(item ? { id: item.id, ...formData } : formData);
      
      if (result.success) {
        onClose();
      } else {
        setError(result.error || 'Failed to save item');
      }
    } catch (err) {
      setError('Failed to save item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {item ? 'Edit Virtual Item' : 'Add New Virtual Item'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900">Basic Information</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform *
                </label>
                <input
                  type="text"
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Intellectual Property
                </label>
                <input
                  type="text"
                  name="intellectualProperty"
                  value={formData.intellectualProperty}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Collectible">Collectible</option>
                  <option value="Utility">Utility</option>
                  <option value="Access">Access</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="Trading Card">Trading Card</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Avatar">Avatar</option>
                  <option value="Accessory">Accessory</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub-Type
                </label>
                <input
                  type="text"
                  name="subType"
                  value={formData.subType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Collection Information */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900">Collection Information</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collection
                </label>
                <input
                  type="text"
                  name="collection"
                  value={formData.collection}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Series
                </label>
                <input
                  type="text"
                  name="series"
                  value={formData.series}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Artist
                </label>
                <input
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rarity
                </label>
                <select
                  name="rarity"
                  value={formData.rarity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Rarity</option>
                  <option value="Common">Common</option>
                  <option value="Uncommon">Uncommon</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                  <option value="Legendary">Legendary</option>
                  <option value="Limited">Limited</option>
                  <option value="Special">Special</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Edition Type
                </label>
                <input
                  type="text"
                  name="editionType"
                  value={formData.editionType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Media URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Media URL (Google)
              </label>
              <input
                type="url"
                name="mediaPrimaryGoogleUrl"
                value={formData.mediaPrimaryGoogleUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Media URL (Google)
              </label>
              <input
                type="url"
                name="mediaDisplayGoogleUrl"
                value={formData.mediaDisplayGoogleUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comments
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Saving...' : (item ? 'Update Item' : 'Create Item')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

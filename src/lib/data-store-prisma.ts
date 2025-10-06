import { prisma } from './prisma';
import { VirtualItem, VirtualItemCreateInput, VirtualItemFilters } from '@/types/virtual-item';

// Prisma-based data store
class VirtualItemStorePrisma {
  // Create a new virtual item
  async create(itemData: VirtualItemCreateInput): Promise<VirtualItem> {
    const newItem = await prisma.virtualItem.create({
      data: {
        platform: itemData.platform,
        platformUrl: itemData.platformUrl || '',
        intellectualProperty: itemData.intellectualProperty || '',
        ageRating: itemData.ageRating || '',
        category: itemData.category,
        type: itemData.type,
        subType: itemData.subType || '',
        title: itemData.title,
        mintSupply: itemData.mintSupply || '',
        includeSerialNumber: itemData.includeSerialNumber || '',
        preMintCount: itemData.preMintCount || '',
        reservedSerialNumbers: itemData.reservedSerialNumbers || '',
        serialNumberTransferOrder: itemData.serialNumberTransferOrder || '',
        purchaseCurrency1: itemData.purchaseCurrency1 || '',
        purchasePrice1: itemData.purchasePrice1 || '',
        andOr: itemData.andOr || '',
        purchaseCurrency2: itemData.purchaseCurrency2 || '',
        purchasePrice2: itemData.purchasePrice2 || '',
        unlockCurrency: itemData.unlockCurrency || '',
        unlockThreshold: itemData.unlockThreshold || '',
        mediaPrimaryGoogleUrl: itemData.mediaPrimaryGoogleUrl || '',
        mediaDisplayGoogleUrl: itemData.mediaDisplayGoogleUrl || '',
        mediaPrimaryS3Bucket: itemData.mediaPrimaryS3Bucket || '',
        mediaDisplayS3Bucket: itemData.mediaDisplayS3Bucket || '',
        transferability: itemData.transferability || '',
        p2pSaleRoyalty: itemData.p2pSaleRoyalty || '',
        description: itemData.description || '',
        mintLimitPerWallet: itemData.mintLimitPerWallet || '',
        p2pLimitPerWallet: itemData.p2pLimitPerWallet || '',
        collection: itemData.collection || '',
        series: itemData.series || '',
        episode: itemData.episode || '',
        set: itemData.set || '',
        season: itemData.season || '',
        level: itemData.level || '',
        rank: itemData.rank || '',
        enhancement: itemData.enhancement || '',
        levelRankUpgradeType: itemData.levelRankUpgradeType || '',
        artist: itemData.artist || '',
        editionType: itemData.editionType || '',
        rarity: itemData.rarity || '',
        bonusMediaUrl: itemData.bonusMediaUrl || '',
        copyright: itemData.copyright || '',
        comments: itemData.comments || '',
      },
    });

    return newItem as VirtualItem;
  }

  // Get all items with optional filtering
  async getAll(filters?: VirtualItemFilters): Promise<VirtualItem[]> {
    const where: Record<string, unknown> = {};

    if (filters) {
      if (filters.platform) {
        where.platform = { contains: filters.platform, mode: 'insensitive' };
      }
      if (filters.intellectualProperty) {
        where.intellectualProperty = { contains: filters.intellectualProperty, mode: 'insensitive' };
      }
      if (filters.category) {
        where.category = { contains: filters.category, mode: 'insensitive' };
      }
      if (filters.type) {
        where.type = { contains: filters.type, mode: 'insensitive' };
      }
      if (filters.collection) {
        where.collection = { contains: filters.collection, mode: 'insensitive' };
      }
      if (filters.series) {
        where.series = { contains: filters.series, mode: 'insensitive' };
      }
      if (filters.artist) {
        where.artist = { contains: filters.artist, mode: 'insensitive' };
      }
      if (filters.rarity) {
        where.rarity = { contains: filters.rarity, mode: 'insensitive' };
      }
      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
          { intellectualProperty: { contains: filters.search, mode: 'insensitive' } },
          { artist: { contains: filters.search, mode: 'insensitive' } },
        ];
      }
    }

    const items = await prisma.virtualItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return items as VirtualItem[];
  }

  // Get all items with pagination
  async getAllWithPagination(filters?: VirtualItemFilters, skip: number = 0, limit: number = 10): Promise<{ items: VirtualItem[]; total: number }> {
    const where: Record<string, unknown> = {};

    if (filters) {
      if (filters.platform) {
        where.platform = { contains: filters.platform, mode: 'insensitive' };
      }
      if (filters.intellectualProperty) {
        where.intellectualProperty = { contains: filters.intellectualProperty, mode: 'insensitive' };
      }
      if (filters.category) {
        where.category = { contains: filters.category, mode: 'insensitive' };
      }
      if (filters.type) {
        where.type = { contains: filters.type, mode: 'insensitive' };
      }
      if (filters.collection) {
        where.collection = { contains: filters.collection, mode: 'insensitive' };
      }
      if (filters.series) {
        where.series = { contains: filters.series, mode: 'insensitive' };
      }
      if (filters.artist) {
        where.artist = { contains: filters.artist, mode: 'insensitive' };
      }
      if (filters.rarity) {
        where.rarity = { contains: filters.rarity, mode: 'insensitive' };
      }
      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } },
          { intellectualProperty: { contains: filters.search, mode: 'insensitive' } },
          { artist: { contains: filters.search, mode: 'insensitive' } },
        ];
      }
    }

    const [items, total] = await Promise.all([
      prisma.virtualItem.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.virtualItem.count({ where })
    ]);

    return {
      items: items as VirtualItem[],
      total
    };
  }

  // Get a single item by ID
  async getById(id: string): Promise<VirtualItem | null> {
    const item = await prisma.virtualItem.findUnique({
      where: { id },
    });

    return item as VirtualItem | null;
  }

  // Update an existing item
  async update(id: string, updateData: Partial<VirtualItemCreateInput>): Promise<VirtualItem | null> {
    try {
      const updatedItem = await prisma.virtualItem.update({
        where: { id },
        data: updateData,
      });

      return updatedItem as VirtualItem;
    } catch (error) {
      console.error('Error updating item:', error);
      return null;
    }
  }

  // Delete an item
  async delete(id: string): Promise<boolean> {
    try {
      await prisma.virtualItem.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting item:', error);
      return false;
    }
  }

  // Get unique values for filter dropdowns
  async getUniqueValues(field: keyof VirtualItem): Promise<string[]> {
    const items = await prisma.virtualItem.findMany({
      select: { [field]: true },
      distinct: [field],
    });

    const values: string[] = [];
    for (const item of items) {
      const value = item[field as keyof typeof item] as unknown;
      if (typeof value === 'string' && value.trim() !== '') {
        values.push(value.trim());
      }
    }

    return [...new Set(values)].sort();
  }

  // Import items from CSV data
  async importFromCSV(csvData: Record<string, unknown>[]): Promise<VirtualItem[]> {
    const importedItems: VirtualItem[] = [];
    
    console.log('Importing CSV data:', csvData.length, 'rows');
    
    for (const row of csvData) {
      // Check if row has essential data
      const platform = row.Platform as string;
      const title = row.Title as string;
      if (platform && title && platform.trim() !== '' && title.trim() !== '') {
        console.log('Processing row:', title);
        
        const itemData: VirtualItemCreateInput = {
          platform: platform,
          platformUrl: (row['Platform URL'] as string) || '',
          intellectualProperty: (row['Intellectual Property'] as string) || '',
          ageRating: (row['Age Rating'] as string) || '',
          category: (row.Category as string) || '',
          type: (row.Type as string) || '',
          subType: (row['Sub-Type'] as string) || '',
          title: title,
          mintSupply: (row['Mint Supply'] as string) || '',
          includeSerialNumber: (row['Include Serial #'] as string) || '',
          preMintCount: (row['Pre-Mint Count'] as string) || '',
          reservedSerialNumbers: (row['Reserved Serial #s'] as string) || '',
          serialNumberTransferOrder: (row['Serial # Transfer Order'] as string) || '',
          purchaseCurrency1: (row['Purchase Currency - 1'] as string) || '',
          purchasePrice1: (row['Purchase Price - 1'] as string) || '',
          andOr: (row['And / Or'] as string) || '',
          purchaseCurrency2: (row['Purchase Currency - 2'] as string) || '',
          purchasePrice2: (row['Purchase Price - 2'] as string) || '',
          unlockCurrency: (row['Unlock Currency'] as string) || '',
          unlockThreshold: (row['Unlock Threshold'] as string) || '',
          mediaPrimaryGoogleUrl: (row['Media - Primary (Google URL)'] as string) || '',
          mediaDisplayGoogleUrl: (row['Media - Display (Google URL)'] as string) || '',
          mediaPrimaryS3Bucket: (row['Media - Primary (S3 bucket)'] as string) || '',
          mediaDisplayS3Bucket: (row['Media - Display (S3 bucket)'] as string) || '',
          transferability: (row.Transferabilty as string) || '',
          p2pSaleRoyalty: (row['P2P Sale Royalty'] as string) || '',
          description: (row.Description as string) || '',
          mintLimitPerWallet: (row['Mint Limit / Wallet'] as string) || '',
          p2pLimitPerWallet: (row['P2P Limit / Wallet'] as string) || '',
          collection: (row.Collection as string) || '',
          series: (row.Series as string) || '',
          episode: (row.Episode as string) || '',
          set: (row.Set as string) || '',
          season: (row.Season as string) || '',
          level: (row.Level as string) || '',
          rank: (row.Rank as string) || '',
          enhancement: (row.Enhancement as string) || '',
          levelRankUpgradeType: (row['Level/Rank Upgrade Type (Dynamic or Additional)'] as string) || '',
          artist: (row.Artist as string) || '',
          editionType: (row['Edition Type'] as string) || '',
          rarity: (row.Rarity as string) || '',
          bonusMediaUrl: (row['Bonus Media URL (e.g., YouTube link)'] as string) || '',
          copyright: (row.Copyright as string) || '',
          comments: (row.Comments as string) || '',
        };

        const newItem = await this.create(itemData);
        importedItems.push(newItem);
      } else {
        console.log('Skipping row - missing essential data:', row);
      }
    }

    console.log('Successfully imported:', importedItems.length, 'items');
    return importedItems;
  }

  // Export items to CSV format
  async exportToCSV(): Promise<Record<string, unknown>[]> {
    const items = await prisma.virtualItem.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map(item => ({
      'Platform': item.platform,
      'Platform URL': item.platformUrl,
      'Intellectual Property': item.intellectualProperty,
      'Age Rating': item.ageRating,
      'Category': item.category,
      'Type': item.type,
      'Sub-Type': item.subType,
      'Title': item.title,
      'Mint Supply': item.mintSupply,
      'Include Serial #': item.includeSerialNumber,
      'Pre-Mint Count': item.preMintCount,
      'Reserved Serial #s': item.reservedSerialNumbers,
      'Serial # Transfer Order': item.serialNumberTransferOrder,
      'Purchase Currency - 1': item.purchaseCurrency1,
      'Purchase Price - 1': item.purchasePrice1,
      'And / Or': item.andOr,
      'Purchase Currency - 2': item.purchaseCurrency2,
      'Purchase Price - 2': item.purchasePrice2,
      'Unlock Currency': item.unlockCurrency,
      'Unlock Threshold': item.unlockThreshold,
      'Media - Primary (Google URL)': item.mediaPrimaryGoogleUrl,
      'Media - Display (Google URL)': item.mediaDisplayGoogleUrl,
      'Media - Primary (S3 bucket)': item.mediaPrimaryS3Bucket,
      'Media - Display (S3 bucket)': item.mediaDisplayS3Bucket,
      'Transferabilty': item.transferability,
      'P2P Sale Royalty': item.p2pSaleRoyalty,
      'Description': item.description,
      'Mint Limit / Wallet': item.mintLimitPerWallet,
      'P2P Limit / Wallet': item.p2pLimitPerWallet,
      'Collection': item.collection,
      'Series': item.series,
      'Episode': item.episode,
      'Set': item.set,
      'Season': item.season,
      'Level': item.level,
      'Rank': item.rank,
      'Enhancement': item.enhancement,
      'Level/Rank Upgrade Type (Dynamic or Additional)': item.levelRankUpgradeType,
      'Artist': item.artist,
      'Edition Type': item.editionType,
      'Rarity': item.rarity,
      'Bonus Media URL (e.g., YouTube link)': item.bonusMediaUrl,
      'Copyright': item.copyright,
      'Comments': item.comments,
    }));
  }

  // Get database statistics
  async getStats(): Promise<{
    totalItems: number;
    byPlatform: { platform: string; count: number }[];
    byCategory: { category: string; count: number }[];
    byRarity: { rarity: string; count: number }[];
  }> {
    const totalItems = await prisma.virtualItem.count();

    const byPlatform = await prisma.virtualItem.groupBy({
      by: ['platform'],
      _count: { platform: true },
      orderBy: { _count: { platform: 'desc' } },
    });

    const byCategory = await prisma.virtualItem.groupBy({
      by: ['category'],
      _count: { category: true },
      orderBy: { _count: { category: 'desc' } },
    });

    const byRarity = await prisma.virtualItem.groupBy({
      by: ['rarity'],
      _count: { rarity: true },
      orderBy: { _count: { rarity: 'desc' } },
    });

    return {
      totalItems,
      byPlatform: byPlatform.map(item => ({ platform: item.platform, count: item._count.platform })),
      byCategory: byCategory.map(item => ({ category: item.category, count: item._count.category })),
      byRarity: byRarity.map(item => ({ rarity: item.rarity || 'Unknown', count: item._count.rarity })),
    };
  }
}

// Export singleton instance
export const virtualItemStorePrisma = new VirtualItemStorePrisma();
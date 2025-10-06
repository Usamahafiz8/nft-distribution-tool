import { prisma } from './prisma';
import { VirtualItem, VirtualItemCreateInput, VirtualItemUpdateInput, VirtualItemFilters } from '@/types/virtual-item';

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
    const where: any = {};

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
    const where: any = {};

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
      const value = item[field as keyof typeof item] as any;
      if (typeof value === 'string' && value.trim() !== '') {
        values.push(value.trim());
      }
    }

    return [...new Set(values)].sort();
  }

  // Import items from CSV data
  async importFromCSV(csvData: any[]): Promise<VirtualItem[]> {
    const importedItems: VirtualItem[] = [];
    
    console.log('Importing CSV data:', csvData.length, 'rows');
    
    for (const row of csvData) {
      // Check if row has essential data
      if (row.Platform && row.Title && row.Platform.trim() !== '' && row.Title.trim() !== '') {
        console.log('Processing row:', row.Title);
        
        const itemData: VirtualItemCreateInput = {
          platform: row.Platform || '',
          platformUrl: row['Platform URL'] || '',
          intellectualProperty: row['Intellectual Property'] || '',
          ageRating: row['Age Rating'] || '',
          category: row.Category || '',
          type: row.Type || '',
          subType: row['Sub-Type'] || '',
          title: row.Title || '',
          mintSupply: row['Mint Supply'] || '',
          includeSerialNumber: row['Include Serial #'] || '',
          preMintCount: row['Pre-Mint Count'] || '',
          reservedSerialNumbers: row['Reserved Serial #s'] || '',
          serialNumberTransferOrder: row['Serial # Transfer Order'] || '',
          purchaseCurrency1: row['Purchase Currency - 1'] || '',
          purchasePrice1: row['Purchase Price - 1'] || '',
          andOr: row['And / Or'] || '',
          purchaseCurrency2: row['Purchase Currency - 2'] || '',
          purchasePrice2: row['Purchase Price - 2'] || '',
          unlockCurrency: row['Unlock Currency'] || '',
          unlockThreshold: row['Unlock Threshold'] || '',
          mediaPrimaryGoogleUrl: row['Media - Primary (Google URL)'] || '',
          mediaDisplayGoogleUrl: row['Media - Display (Google URL)'] || '',
          mediaPrimaryS3Bucket: row['Media - Primary (S3 bucket)'] || '',
          mediaDisplayS3Bucket: row['Media - Display (S3 bucket)'] || '',
          transferability: row.Transferabilty || '',
          p2pSaleRoyalty: row['P2P Sale Royalty'] || '',
          description: row.Description || '',
          mintLimitPerWallet: row['Mint Limit / Wallet'] || '',
          p2pLimitPerWallet: row['P2P Limit / Wallet'] || '',
          collection: row.Collection || '',
          series: row.Series || '',
          episode: row.Episode || '',
          set: row.Set || '',
          season: row.Season || '',
          level: row.Level || '',
          rank: row.Rank || '',
          enhancement: row.Enhancement || '',
          levelRankUpgradeType: row['Level/Rank Upgrade Type (Dynamic or Additional)'] || '',
          artist: row.Artist || '',
          editionType: row['Edition Type'] || '',
          rarity: row.Rarity || '',
          bonusMediaUrl: row['Bonus Media URL (e.g., YouTube link)'] || '',
          copyright: row.Copyright || '',
          comments: row.Comments || '',
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
  async exportToCSV(): Promise<any[]> {
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
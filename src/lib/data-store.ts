import { VirtualItem, VirtualItemCreateInput, VirtualItemUpdateInput, VirtualItemFilters } from '@/types/virtual-item';

// In-memory data store (replace with database later)
class VirtualItemStore {
  private items: VirtualItem[] = [];
  private nextId = 1;

  // Create a new virtual item
  create(itemData: VirtualItemCreateInput): VirtualItem {
    const newItem: VirtualItem = {
      id: this.nextId.toString(),
      ...itemData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.items.push(newItem);
    this.nextId++;
    return newItem;
  }

  // Get all items with optional filtering
  getAll(filters?: VirtualItemFilters): VirtualItem[] {
    let filteredItems = [...this.items];

    if (filters) {
      if (filters.platform) {
        filteredItems = filteredItems.filter(item => 
          item.platform.toLowerCase().includes(filters.platform!.toLowerCase())
        );
      }

      if (filters.intellectualProperty) {
        filteredItems = filteredItems.filter(item => 
          item.intellectualProperty.toLowerCase().includes(filters.intellectualProperty!.toLowerCase())
        );
      }

      if (filters.category) {
        filteredItems = filteredItems.filter(item => 
          item.category.toLowerCase().includes(filters.category!.toLowerCase())
        );
      }

      if (filters.type) {
        filteredItems = filteredItems.filter(item => 
          item.type.toLowerCase().includes(filters.type!.toLowerCase())
        );
      }

      if (filters.collection) {
        filteredItems = filteredItems.filter(item => 
          item.collection.toLowerCase().includes(filters.collection!.toLowerCase())
        );
      }

      if (filters.series) {
        filteredItems = filteredItems.filter(item => 
          item.series.toLowerCase().includes(filters.series!.toLowerCase())
        );
      }

      if (filters.artist) {
        filteredItems = filteredItems.filter(item => 
          item.artist.toLowerCase().includes(filters.artist!.toLowerCase())
        );
      }

      if (filters.rarity) {
        filteredItems = filteredItems.filter(item => 
          item.rarity.toLowerCase().includes(filters.rarity!.toLowerCase())
        );
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredItems = filteredItems.filter(item => 
          item.title.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.intellectualProperty.toLowerCase().includes(searchTerm) ||
          item.artist.toLowerCase().includes(searchTerm)
        );
      }
    }

    return filteredItems;
  }

  // Get a single item by ID
  getById(id: string): VirtualItem | undefined {
    return this.items.find(item => item.id === id);
  }

  // Update an existing item
  update(id: string, updateData: Partial<VirtualItemCreateInput>): VirtualItem | null {
    const itemIndex = this.items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return null;
    }

    this.items[itemIndex] = {
      ...this.items[itemIndex],
      ...updateData,
      updatedAt: new Date(),
    };

    return this.items[itemIndex];
  }

  // Delete an item
  delete(id: string): boolean {
    const itemIndex = this.items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return false;
    }

    this.items.splice(itemIndex, 1);
    return true;
  }

  // Get unique values for filter dropdowns
  getUniqueValues(field: keyof VirtualItem): string[] {
    const values = this.items
      .map(item => item[field])
      .filter((value): value is string => typeof value === 'string' && value.trim() !== '')
      .map(value => value.trim());
    
    return [...new Set(values)].sort();
  }

  // Import items from CSV data
  importFromCSV(csvData: any[]): VirtualItem[] {
    const importedItems: VirtualItem[] = [];
    
    for (const row of csvData) {
      if (row.Platform && row.Title) { // Only import rows with essential data
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

        const newItem = this.create(itemData);
        importedItems.push(newItem);
      }
    }

    return importedItems;
  }

  // Export items to CSV format
  exportToCSV(): any[] {
    return this.items.map(item => ({
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
}

// Export singleton instance
export const virtualItemStore = new VirtualItemStore();

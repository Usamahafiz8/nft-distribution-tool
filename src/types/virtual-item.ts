export interface VirtualItem {
  id?: string;
  platform: string;
  platformUrl: string;
  intellectualProperty: string;
  ageRating: string;
  category: string;
  type: string;
  subType: string;
  title: string;
  mintSupply: string;
  includeSerialNumber: string;
  preMintCount: string;
  reservedSerialNumbers: string;
  serialNumberTransferOrder: string;
  purchaseCurrency1: string;
  purchasePrice1: string;
  andOr: string;
  purchaseCurrency2: string;
  purchasePrice2: string;
  unlockCurrency: string;
  unlockThreshold: string;
  mediaPrimaryGoogleUrl: string;
  mediaDisplayGoogleUrl: string;
  mediaPrimaryS3Bucket: string;
  mediaDisplayS3Bucket: string;
  transferability: string;
  p2pSaleRoyalty: string;
  description: string;
  mintLimitPerWallet: string;
  p2pLimitPerWallet: string;
  collection: string;
  series: string;
  episode: string;
  set: string;
  season: string;
  level: string;
  rank: string;
  enhancement: string;
  levelRankUpgradeType: string;
  artist: string;
  editionType: string;
  rarity: string;
  bonusMediaUrl: string;
  copyright: string;
  comments: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VirtualItemCreateInput {
  platform: string;
  platformUrl: string;
  intellectualProperty: string;
  ageRating: string;
  category: string;
  type: string;
  subType: string;
  title: string;
  mintSupply?: string;
  includeSerialNumber?: string;
  preMintCount?: string;
  reservedSerialNumbers?: string;
  serialNumberTransferOrder?: string;
  purchaseCurrency1?: string;
  purchasePrice1?: string;
  andOr?: string;
  purchaseCurrency2?: string;
  purchasePrice2?: string;
  unlockCurrency?: string;
  unlockThreshold?: string;
  mediaPrimaryGoogleUrl?: string;
  mediaDisplayGoogleUrl?: string;
  mediaPrimaryS3Bucket?: string;
  mediaDisplayS3Bucket?: string;
  transferability?: string;
  p2pSaleRoyalty?: string;
  description?: string;
  mintLimitPerWallet?: string;
  p2pLimitPerWallet?: string;
  collection?: string;
  series?: string;
  episode?: string;
  set?: string;
  season?: string;
  level?: string;
  rank?: string;
  enhancement?: string;
  levelRankUpgradeType?: string;
  artist?: string;
  editionType?: string;
  rarity?: string;
  bonusMediaUrl?: string;
  copyright?: string;
  comments?: string;
}

export interface VirtualItemUpdateInput extends Partial<VirtualItemCreateInput> {
  id: string;
}

export interface VirtualItemFilters {
  platform?: string;
  intellectualProperty?: string;
  category?: string;
  type?: string;
  collection?: string;
  series?: string;
  artist?: string;
  rarity?: string;
  search?: string;
}

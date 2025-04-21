export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    parentId: string | null;
    isActive: boolean;
    imageUrl: string;
    productsCount: number;
    createdAt: string;
  }
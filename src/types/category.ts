interface Shape {
    shape_id: string;
    shape_name: string;
    description: string;
}

interface Brand {
    brand_id: string;
    brand_name: string;
    description: string;
}

interface Collection {
    collection_id: string;
    collection_name: string;
    description: string;
}

interface ShapesCollectionsBrands {
    shapes?: Shape[];
    brands?: Brand[];
    collections?: Collection[];
}

interface Subcategory {
    subcategory_id: number;
    subcategory_name: string;
    shapes_collections_brands: ShapesCollectionsBrands[];
}

export interface Category {
    category_id: string;
    category_name: string;
    subcategories: Subcategory[];
}
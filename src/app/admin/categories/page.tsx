'use client';
// CategoryManagement.tsx - Updated implementation with common dialog
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, PlusCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryTable } from "./CategoryTable";
import { CategoryDialog } from "./dialogs/CategoryDialog";
import { Category } from "./types";

// Sample data
const sampleCategories: Category[] = [
    {
      id: "1",
      name: "Eyeglasses",
      slug: "eyeglasses",
      description: "Prescription eyeglasses for men, women and kids",
      parentId: null,
      isActive: true,
      imageUrl: "/images/categories/eyeglasses.jpg",
      productsCount: 432,
      createdAt: "2025-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Sunglasses",
      slug: "sunglasses",
      description: "Stylish sunglasses for all occasions",
      parentId: null,
      isActive: true,
      imageUrl: "/images/categories/sunglasses.jpg",
      productsCount: 253,
      createdAt: "2025-01-20T14:15:00Z",
    },
    {
      id: "3",
      name: "Contact Lenses",
      slug: "contact-lenses",
      description: "Daily and monthly contact lenses",
      parentId: null,
      isActive: true,
      imageUrl: "/images/categories/contact-lenses.jpg",
      productsCount: 87,
      createdAt: "2025-02-05T09:45:00Z",
    },
    {
      id: "4",
      name: "Men's Eyeglasses",
      slug: "mens-eyeglasses",
      description: "Eyeglasses designed for men",
      parentId: "1",
      isActive: true,
      imageUrl: "/images/categories/mens-eyeglasses.jpg",
      productsCount: 187,
      createdAt: "2025-02-10T11:20:00Z",
    },
    {
      id: "5",
      name: "Women's Eyeglasses",
      slug: "womens-eyeglasses",
      description: "Eyeglasses designed for women",
      parentId: "1",
      isActive: true,
      imageUrl: "/images/categories/womens-eyeglasses.jpg",
      productsCount: 195,
      createdAt: "2025-02-12T16:50:00Z",
    },
  ];

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>(sampleCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  // Filter categories based on search term and active status
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!showActiveOnly || category.isActive)
  );

  // Get parent category name by ID
  const getParentName = (parentId: string | null) => {
    if (!parentId) return "—";
    const parent = categories.find((cat) => cat.id === parentId);
    return parent ? parent.name : "Unknown";
  };

  // Delete a category
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  // Open dialog to add a new category
  const handleAddNew = () => {
    setCurrentCategory(null); // null means add mode
    setIsDialogOpen(true);
  };

  // Open dialog to edit existing category
  const handleEdit = (category: Category) => {
    setCurrentCategory(category); // existing category means edit mode
    setIsDialogOpen(true);
  };

  // Save category (handles both add and edit)
  const handleSaveCategory = (categoryData: Partial<Category>) => {
    if (currentCategory) {
      // Edit existing category
      setCategories(
        categories.map((cat) =>
          cat.id === currentCategory.id ? { ...cat, ...categoryData } : cat
        )
      );
    } else {
      // Add new category
      const newCategory: Category = {
        id: `${categories.length + 1}`,
        name: categoryData.name || "",
        slug: categoryData.slug || categoryData.name?.toLowerCase().replace(/\s+/g, "-") || "",
        description: categoryData.description || "",
        parentId: categoryData.parentId,
        isActive: categoryData.isActive || true,
        imageUrl: categoryData.imageUrl || "/images/categories/placeholder.jpg",
        productsCount: 0,
        createdAt: new Date().toISOString(),
      };
      
      setCategories([...categories, newCategory]);
    }
    
    setIsDialogOpen(false);
    setCurrentCategory(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
          <p className="text-gray-500 mt-1">
            Manage product categories and subcategories
          </p>
        </div>
        <Button 
          onClick={handleAddNew}
          className="flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            You have {categories.length} categories in total.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Bar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search categories..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="active-only" 
                checked={showActiveOnly}
                onCheckedChange={(checked) => 
                  setShowActiveOnly(checked === true)
                }
              />
              <label 
                htmlFor="active-only" 
                className="text-sm text-gray-700 cursor-pointer"
              >
                Active only
              </label>
            </div>
          </div>

          <CategoryTable
            categories={filteredCategories}
            getParentName={getParentName}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-sm text-gray-500">
            Showing {filteredCategories.length} of {categories.length} categories
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Common Dialog for both Add and Edit */}
      <CategoryDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        category={currentCategory}
        categories={categories}
        onSave={handleSaveCategory}
      />
    </div>
  );
}
// CategoryTable.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { Category } from "./types";

interface CategoryTableProps {
  categories: Category[];
  getParentName: (parentId: string | null) => string;
  handleDelete: (id: string) => void;
  setCurrentCategory: (category: Category) => void;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  handleEdit: (category: Category) => void;
}

export function CategoryTable({
  categories,
  getParentName,
  handleDelete,
  handleEdit,
}: CategoryTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">
                  <CategoryNameCell category={category} />
                </TableCell>
                <TableCell>{getParentName(category.parentId)}</TableCell>
                <TableCell>{category.productsCount} products</TableCell>
                <TableCell>
                  <StatusBadge isActive={category.isActive} />
                </TableCell>
                <TableCell className="text-right">
                  <CategoryActions
                    category={category}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    // setCurrentCategory={setCurrentCategory}
                    // setIsEditDialogOpen={setIsEditDialogOpen}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                No categories found. Try adjusting your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// Category name with image
interface CategoryNameCellProps {
  category: Category;
}

function CategoryNameCell({ category }: CategoryNameCellProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
        <img 
          src="/api/placeholder/40/40" 
          alt={category.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="font-medium">{category.name}</div>
        <div className="text-xs text-gray-500">{category.slug}</div>
      </div>
    </div>
  );
}

// Status badge component
interface StatusBadgeProps {
  isActive: boolean;
}

function StatusBadge({ isActive }: StatusBadgeProps) {
  if (isActive) {
    return (
      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
        Active
      </Badge>
    );
  }
  
  return (
    <Badge variant="outline" className="text-gray-500">
      Inactive
    </Badge>
  );
}

// Category actions dropdown
interface CategoryActionsProps {
  category: Category;
  handleDelete: (id: string) => void;
  setCurrentCategory: (category: Category) => void;
  setIsEditDialogOpen: (isOpen: boolean) => void;
}

// Updated CategoryActions component with handleEdit
function CategoryActions({
    category,
    handleDelete,
    handleEdit,
  }: {
    category: Category;
    handleDelete: (id: string) => void;
    handleEdit: (category: Category) => void;
  }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => handleEdit(category)}
            className="cursor-pointer"
          >
            <Edit className="h-4 w-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Eye className="h-4 w-4 mr-2" /> View Products
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleDelete(category.id)}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
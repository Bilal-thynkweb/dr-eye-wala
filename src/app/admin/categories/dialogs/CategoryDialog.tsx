// dialogs/CategoryDialog.tsx
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Image } from "lucide-react";
import { Category } from "@/types/category";

interface CategoryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category?: Category | null; // Existing category for edit mode, null for add mode
  categories: Category[];
  onSave: (category: Partial<Category>) => void;
}

export function CategoryDialog({
  isOpen,
  setIsOpen,
  category,
  categories,
  onSave,
}: CategoryDialogProps) {
  const isEditMode = !!category;
  
  // Default empty form or existing category data
  const defaultFormValues: Partial<Category> = {
    name: "",
    slug: "",
    description: "",
    parent_id: null,
    isActive: true,
    imageUrl: "/images/categories/placeholder.jpg",
  };
  
  const [formValues, setFormValues] = React.useState<Partial<Category>>(defaultFormValues);

  // Reset form when dialog opens/closes or category changes
  useEffect(() => {
    if (isOpen) {
      setFormValues(category || defaultFormValues);
    }
  }, [isOpen, category]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace("category-", "");
    
    setFormValues({
      ...formValues,
      [fieldName]: value,
    });
    
    // Auto-generate slug from name if in add mode and slug is empty
    if (fieldName === "name" && (!isEditMode || !formValues.slug)) {
      setFormValues(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/\s+/g, "-"),
      }));
    }
  };

  // Handle switch change for active status
  const handleSwitchChange = (checked: boolean) => {
    setFormValues({
      ...formValues,
      isActive: checked,
    });
  };

  // Close dialog and reset form
  const handleClose = () => {
    setIsOpen(false);
  };

  // Save category data
  const handleSave = () => {
    onSave(formValues);
    setIsOpen(false);
  };

  // Filter out current category from parent options (to prevent self-reference)
  const parentOptions = categories.filter(cat => 
    cat.parent_id === null && (!isEditMode || cat.id !== category?.id)
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Category" : "Add New Category"}</DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? "Update the category details. Click save when you're done."
              : "Create a new product category. Click save when you're done."
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category-name" className="text-right">
              Name
            </Label>
            <Input
              id="category-name"
              placeholder="Category name"
              className="col-span-3"
              value={formValues.name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category-slug" className="text-right">
              Slug
            </Label>
            <Input
              id="category-slug"
              placeholder="category-slug"
              className="col-span-3"
              value={formValues.slug || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="category-description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="category-description"
              placeholder="Category description"
              className="col-span-3"
              rows={3}
              value={formValues.description || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category-parentId" className="text-right">
              Parent
            </Label>
            <select
              id="category-parentId"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formValues.parent_id || ""}
              onChange={handleInputChange}
            >
              <option value="">None (Top Level)</option>
              {parentOptions.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Status</Label>
            <div className="flex items-center gap-2 col-span-3">
              <Switch 
                id="category-active-status" 
                checked={formValues.isActive} 
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="category-active-status">Active</Label>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Image</Label>
            <div className="col-span-3">
              <div className="border-2 border-dashed rounded-lg p-6 text-center border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
                {isEditMode && formValues.imageUrl ? (
                  <img 
                    src="/api/placeholder/100/100" 
                    alt="Category thumbnail" 
                    className="mx-auto h-24 w-24 object-cover rounded"
                  />
                ) : (
                  <Image className="mx-auto h-10 w-10 text-gray-400" />
                )}
                <div className="mt-2 text-sm text-gray-500">
                  <span className="font-medium text-primary">
                    {isEditMode ? "Click to upload new image" : "Click to upload"}
                  </span>{" "}
                  {!isEditMode && "or drag and drop"}
                </div>
                {!isEditMode && (
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 2MB
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isEditMode ? "Save Changes" : "Save Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
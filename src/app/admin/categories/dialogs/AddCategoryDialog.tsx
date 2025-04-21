// dialogs/AddCategoryDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Image } from "lucide-react";
import { Category } from "../types";
import { CategoryFormFields } from "./CategoryFormFields";

interface AddCategoryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleAddCategory: (category: Partial<Category>) => void;
  categories: Category[];
}

export function AddCategoryDialog({
  isOpen,
  setIsOpen,
  handleAddCategory,
  categories,
}: AddCategoryDialogProps) {
  // State to manage form values
  const [formValues, setFormValues] = React.useState<Partial<Category>>({
    name: "",
    slug: "",
    description: "",
    parentId: null,
    isActive: true,
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace("add-", "");
    
    setFormValues({
      ...formValues,
      [fieldName]: value,
    });
    
    // Auto-generate slug from name if slug field is empty
    if (fieldName === "name" && (!formValues.slug || formValues.slug === "")) {
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

  // Reset form on close
  const handleClose = () => {
    setFormValues({
      name: "",
      slug: "",
      description: "",
      parentId: null,
      isActive: true,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new product category. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <CategoryFormFields 
          formValues={formValues}
          handleInputChange={handleInputChange}
          handleSwitchChange={handleSwitchChange}
          categories={categories}
          prefix="add"
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => handleAddCategory(formValues)}>
            Save Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
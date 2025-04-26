// dialogs/EditCategoryDialog.tsx
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
import { Category } from "@/types/category";
import { CategoryFormFields } from "./CategoryFormFields";

interface EditCategoryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentCategory: Category | null;
  categories: Category[];
  handleEditCategory: (category: Category) => void;
}

export function EditCategoryDialog({
  isOpen,
  setIsOpen,
  currentCategory,
  categories,
  handleEditCategory,
}: EditCategoryDialogProps) {
  const [formValues, setFormValues] = React.useState<Category | null>(null);

  // Initialize form values when currentCategory changes
  useEffect(() => {
    if (currentCategory) {
      setFormValues({ ...currentCategory });
    }
  }, [currentCategory]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!formValues) return;
    
    const { id, value } = e.target;
    const fieldName = id.replace("edit-", "");
    
    setFormValues({
      ...formValues,
      [fieldName]: value,
    });
  };

  // Handle switch change for active status
  const handleSwitchChange = (checked: boolean) => {
    if (!formValues) return;
    
    setFormValues({
      ...formValues,
      isActive: checked,
    });
  };

  // Reset form and close the dialog
  const handleClose = () => {
    setFormValues(null);
    setIsOpen(false);
  };

  const handleSave = () => {
    if (formValues) {
      handleEditCategory(formValues);
    }
  };

  if (!formValues) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <CategoryFormFields 
          formValues={formValues}
          handleInputChange={handleInputChange}
          handleSwitchChange={handleSwitchChange}
          categories={categories.filter(cat => cat.id !== formValues.id)}
          prefix="edit"
          isEdit
        />

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
// dialogs/CategoryFormFields.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Image } from "lucide-react";
import { Category } from "../types";

interface CategoryFormFieldsProps {
  formValues: Partial<Category>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSwitchChange: (checked: boolean) => void;
  categories: Category[];
  prefix: string;
  isEdit?: boolean;
}

export function CategoryFormFields({
  formValues,
  handleInputChange,
  handleSwitchChange,
  categories,
  prefix,
  isEdit = false,
}: CategoryFormFieldsProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${prefix}-name`} className="text-right">
          Name
        </Label>
        <Input
          id={`${prefix}-name`}
          placeholder="Category name"
          className="col-span-3"
          value={formValues.name || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${prefix}-slug`} className="text-right">
          Slug
        </Label>
        <Input
          id={`${prefix}-slug`}
          placeholder="category-slug"
          className="col-span-3"
          value={formValues.slug || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor={`${prefix}-description`} className="text-right pt-2">
          Description
        </Label>
        <Textarea
          id={`${prefix}-description`}
          placeholder="Category description"
          className="col-span-3"
          rows={3}
          value={formValues.description || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${prefix}-parentId`} className="text-right">
          Parent
        </Label>
        <select
          id={`${prefix}-parentId`}
          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formValues.parentId || ""}
          onChange={handleInputChange}
        >
          <option value="">None (Top Level)</option>
          {categories
            .filter((cat) => cat.parentId === null)
            .map((cat) => (
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
            id={`${prefix}-active-status`} 
            checked={formValues.isActive} 
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor={`${prefix}-active-status`}>Active</Label>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Image</Label>
        <div className="col-span-3">
          <div className="border-2 border-dashed rounded-lg p-6 text-center border-gray-300 hover:border-gray-400 transition-colors cursor-pointer">
            {isEdit ? (
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
                {isEdit ? "Click to upload new image" : "Click to upload"}
              </span>{" "}
              {!isEdit && "or drag and drop"}
            </div>
            {!isEdit && (
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 2MB
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
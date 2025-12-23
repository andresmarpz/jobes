"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanyDialogForm } from "./company-dialog-form";
import type { CompanyFormData } from "../schemas";
import { useState } from "react";

type CompanyDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess: (data: CompanyFormData) => void | Promise<void>;
  defaultValues?: CompanyFormData;
  title?: string;
  description?: string;
};

export function CompanyDialog({
  isOpen,
  setIsOpen,
  onSuccess,
  defaultValues,
  title,
  description,
}: CompanyDialogProps) {
  const [formKey, setFormKey] = useState(0);

  const isEditMode = defaultValues !== undefined;
  const dialogTitle = title ?? (isEditMode ? "Edit Company" : "Add Company");
  const dialogDescription = description ?? (isEditMode ? undefined : "Add a new company to your listing.");

  const handleSubmit = async (data: CompanyFormData) => {
    await onSuccess(data);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setFormKey((prev) => prev + 1);
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>
        <CompanyDialogForm
          key={formKey}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

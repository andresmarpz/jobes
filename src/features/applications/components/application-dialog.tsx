"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ApplicationDialogForm } from "./application-dialog-form";
import type { ApplicationFormData } from "../schemas";

type ApplicationDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess: (data: ApplicationFormData) => Promise<unknown> | unknown;
  defaultValues?: ApplicationFormData;
  title?: string;
  description?: string;
};

export function ApplicationDialog({
  isOpen,
  setIsOpen,
  onSuccess,
  defaultValues,
  title,
  description
}: ApplicationDialogProps) {
  const [formKey, setFormKey] = useState(0);

  const isEditMode = defaultValues !== undefined;
  const dialogTitle = title ?? (isEditMode ? "Edit Application" : "Add Application");
  const dialogDescription =
    description ?? (isEditMode ? undefined : "Track a new job application.");

  const handleSubmit = async (data: ApplicationFormData) => {
    await onSuccess(data);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setFormKey(prev => prev + 1);
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
      <DialogContent className="max-w-xl">
        <DialogHeader className="mb-4">
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && <DialogDescription>{dialogDescription}</DialogDescription>}
        </DialogHeader>
        <ApplicationDialogForm
          key={formKey}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

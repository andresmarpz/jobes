"use client";

import { useApplication } from "../hooks/use-applications";
import { ApplicationDialog } from "./application-dialog";
import type { ApplicationFormData } from "../schemas";
import type { Application } from "../types";

type EditApplicationDialogProps = {
  application: Application;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export function EditApplicationDialog({
  application,
  isOpen,
  setIsOpen
}: EditApplicationDialogProps) {
  const { updateApplication } = useApplication(application.id);

  const handleSuccess = async (data: ApplicationFormData) => {
    await updateApplication(data);
  };

  return (
    <ApplicationDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      defaultValues={application}
      onSuccess={handleSuccess}
    />
  );
}

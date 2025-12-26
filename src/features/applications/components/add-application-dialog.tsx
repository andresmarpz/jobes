"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApplicationDialog } from "./application-dialog";
import { useCreateApplicationMutation } from "../queries";
import type { ApplicationFormData } from "../schemas";
import { IconPlus } from "@tabler/icons-react";

export function AddApplicationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const createApplicationMutation = useCreateApplicationMutation();

  const handleSuccess = async (data: ApplicationFormData) => {
    await createApplicationMutation.mutateAsync(data);
  };

  return (
    <>
      <Button variant="raised" onClick={() => setIsOpen(true)}>
        <IconPlus className="h-3 w-3" />
        Add Application
      </Button>
      <ApplicationDialog isOpen={isOpen} setIsOpen={setIsOpen} onSuccess={handleSuccess} />
    </>
  );
}

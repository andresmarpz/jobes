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
      <Button onClick={() => setIsOpen(true)}>
        <IconPlus className="mr-2 h-3 w-3" />
        Add Application
      </Button>
      <ApplicationDialog isOpen={isOpen} setIsOpen={setIsOpen} onSuccess={handleSuccess} />
    </>
  );
}

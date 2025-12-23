"use client";

import { Button } from "@/components/ui/button";
import { CompanyDialog } from "./company-dialog";
import { useCreateCompanyMutation } from "@/features/companies/queries";
import type { CompanyFormData } from "@/features/companies/schemas";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function AddCompanyDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const createCompanyMutation = useCreateCompanyMutation();

  const handleSuccess = async (data: CompanyFormData) => {
    await createCompanyMutation.mutateAsync(data);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusIcon className="mr-2 h-3 w-3" />
        Add Company
      </Button>
      <CompanyDialog isOpen={isOpen} setIsOpen={setIsOpen} onSuccess={handleSuccess} />
    </>
  );
}

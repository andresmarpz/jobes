"use client";

import { Button } from "@/components/ui/button";
import { CompanyDialog } from "./company-dialog";
import { createCompany } from "@/features/companies/services/company-service";
import type { CompanyFormData } from "@/features/companies/schemas";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function AddCompanyDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = (data: CompanyFormData) => {
    createCompany(data);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusIcon className="h-3 w-3 mr-2" />
        Add Company
      </Button>
      <CompanyDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSuccess={handleSuccess}
      />
    </>
  );
}

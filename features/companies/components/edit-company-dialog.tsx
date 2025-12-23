"use client";

import { useCompany } from "@/features/companies/hooks/use-companies";
import { CompanyDialog } from "./company-dialog";
import type { CompanyFormData } from "../schemas";
import type { Company } from "../types";

type EditCompanyDialogProps = {
  company: Company;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export function EditCompanyDialog({
  company,
  isOpen,
  setIsOpen,
}: EditCompanyDialogProps) {
  const { updateCompany } = useCompany(company.id);

  const handleSuccess = async (data: CompanyFormData) => {
    await updateCompany(data);
  };

  return (
    <CompanyDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      defaultValues={company}
      onSuccess={handleSuccess}
    />
  );
}

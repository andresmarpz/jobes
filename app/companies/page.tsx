import { AddCompanyDialog } from "@/features/companies/components/add-company-dialog";
import { CompaniesTable } from "@/features/companies/components/companies-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Companies",
};

export default function Companies() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Companies</h1>
        <AddCompanyDialog />
      </div>
      <CompaniesTable />
    </div>
  );
}

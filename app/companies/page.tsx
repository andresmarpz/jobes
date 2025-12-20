import { CompanyForm } from "@/features/companies/components/company-form";
import { CompaniesTable } from "@/features/companies/components/companies-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Companies",
};

export default function Companies() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Companies</h1>
        <CompanyForm />
      </div>
      <CompaniesTable />
    </div>
  );
}

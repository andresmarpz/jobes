import { CompanyDetail } from "@/features/companies/components/company-detail";
import { Metadata } from "next";

type CompanyPageProps = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Company"
};

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { id } = await params;

  return (
    <>
      <CompanyDetail companyId={id} />
    </>
  );
}

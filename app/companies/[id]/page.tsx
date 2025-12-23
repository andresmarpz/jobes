import { CompanyDetail } from "@/features/companies/components/company-detail";

type CompanyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { id } = await params;

  return <CompanyDetail companyId={id} />;
}

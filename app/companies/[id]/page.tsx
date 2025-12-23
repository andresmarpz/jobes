import { CompanyDetail } from "@/features/companies/components/company-detail";

type CompanyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <CompanyDetail companyId={id} />
    </div>
  );
}

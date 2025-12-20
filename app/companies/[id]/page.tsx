import { CompanyDetail } from "@/features/companies/components/company-detail"

type CompanyPageProps = {
  params: Promise<{ id: string }>
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { id } = await params

  return (
    <div className="container mx-auto py-8 px-4">
      <CompanyDetail companyId={id} />
    </div>
  )
}

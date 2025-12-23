import { EditCompanyForm } from "@/features/companies/components/edit-company-form"

type EditCompanyPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditCompanyPage({ params }: EditCompanyPageProps) {
  const { id } = await params

  return (
    <div className="container mx-auto px-4 py-8">
      <EditCompanyForm companyId={id} />
    </div>
  )
}

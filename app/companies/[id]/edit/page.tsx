import { EditCompanyForm } from "@/features/companies/components/edit-company-form"

type EditCompanyPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditCompanyPage({ params }: EditCompanyPageProps) {
  const { id } = await params

  return (
    <div className="container mx-auto py-8 px-4">
      <EditCompanyForm companyId={id} />
    </div>
  )
}

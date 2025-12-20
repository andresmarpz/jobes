"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCompany } from "../hooks/use-companies"
import { CompanyForm } from "./company-form"
import type { CreateCompanyInput } from "../types"

type EditCompanyFormProps = {
  companyId: string
}

export function EditCompanyForm({ companyId }: EditCompanyFormProps) {
  const router = useRouter()
  const { company, isLoading, error, updateCompany } = useCompany(companyId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading company...</p>
      </div>
    )
  }

  if (error || !company) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-4">
        <p className="text-destructive">{error ?? "Company not found"}</p>
        <Button asChild variant="outline">
          <Link href="/companies">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Companies
          </Link>
        </Button>
      </div>
    )
  }

  const handleSubmit = async (data: CreateCompanyInput) => {
    await updateCompany(data)
    router.push(`/companies/${companyId}`)
  }

  const handleCancel = () => {
    router.push(`/companies/${companyId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/companies/${companyId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Company</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <CompanyForm
            defaultValues={{
              name: company.name,
              description: company.description,
              websiteUrl: company.websiteUrl ?? "",
              linkedinUrl: company.linkedinUrl ?? "",
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Save Changes"
          />
        </CardContent>
      </Card>
    </div>
  )
}

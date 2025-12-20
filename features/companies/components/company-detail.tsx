"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ExternalLink, Pencil, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCompany } from "../hooks/use-companies"
import { ContactList } from "./contact-list"
import { DeleteCompanyDialog } from "./delete-company-dialog"

type CompanyDetailProps = {
  companyId: string
}

export function CompanyDetail({ companyId }: CompanyDetailProps) {
  const router = useRouter()
  const {
    company,
    isLoading,
    error,
    deleteCompany,
    addContact,
    updateContact,
    removeContact,
  } = useCompany(companyId)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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

  const handleDelete = async () => {
    await deleteCompany()
    router.push("/companies")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/companies">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold flex-1">{company.name}</h1>
        <Button asChild variant="outline">
          <Link href={`/companies/${company.id}/edit`}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Link>
        </Button>
        <Button
          variant="destructive"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Description
            </h3>
            <p className="mt-1">{company.description}</p>
          </div>
          <div className="flex gap-8">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Website
              </h3>
              {company.websiteUrl ? (
                <a
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-1 text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  {company.websiteUrl}
                </a>
              ) : (
                <p className="mt-1 text-muted-foreground">Not provided</p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                LinkedIn
              </h3>
              {company.linkedinUrl ? (
                <a
                  href={company.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-1 text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  {company.linkedinUrl}
                </a>
              ) : (
                <p className="mt-1 text-muted-foreground">Not provided</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <ContactList
        contacts={company.contacts}
        onAdd={addContact}
        onUpdate={updateContact}
        onRemove={removeContact}
      />

      <DeleteCompanyDialog
        companyName={company.name}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </div>
  )
}

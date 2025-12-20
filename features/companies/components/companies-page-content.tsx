"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CompaniesTable } from "./companies-table"
import { CompanyForm } from "./company-form"
import { useCompanies } from "../hooks/use-companies"
import type { CreateCompanyInput } from "../types"

export function CompaniesPageContent() {
  const router = useRouter()
  const { createCompany } = useCompanies()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = async (data: CreateCompanyInput) => {
    const company = await createCompany(data)
    setIsDialogOpen(false)
    router.push(`/companies/${company.id}`)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Companies</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Company</DialogTitle>
            </DialogHeader>
            <CompanyForm
              onSubmit={handleSubmit}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <CompaniesTable />
    </>
  )
}

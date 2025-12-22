import { ApplicationForm } from "@/features/applications/components/application-form"
import { ApplicationsTable } from "@/features/applications/components/applications-table"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Applications",
}

export default function Applications() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Applications</h1>
        <ApplicationForm />
      </div>
      <ApplicationsTable />
    </div>
  )
}

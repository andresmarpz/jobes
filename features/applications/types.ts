export type ApplicationStatus =
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn"

export type ApplicationMethod =
  | "cold_email"
  | "contact_referral"
  | "ats_application"
  | "recruiter_outreach"
  | "linkedin_easy_apply"
  | "other"

export type StatusHistoryEntry = {
  id: string
  status: ApplicationStatus
  note: string | null
  changedAt: string
}

export type Application = {
  id: string
  position: string
  companyName: string
  companyId: string | null
  status: ApplicationStatus
  applicationDate: string
  jobUrl: string | null
  salary: string | null
  method: ApplicationMethod
  notes: string | null
  statusHistory: StatusHistoryEntry[]
  createdAt: string
  updatedAt: string
}

export type CreateApplicationInput = Omit<
  Application,
  "id" | "statusHistory" | "createdAt" | "updatedAt"
>

export type UpdateApplicationInput = Partial<CreateApplicationInput>

export type SortDirection = "asc" | "desc"

export type SortConfig = {
  column: keyof Application
  direction: SortDirection
}

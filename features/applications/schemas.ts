import { z } from "zod"

const urlSchema = z.string().url().nullable().or(z.literal(""))

export const applicationStatusSchema = z.enum([
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
])

export const applicationMethodSchema = z.enum([
  "cold_email",
  "contact_referral",
  "ats_application",
  "recruiter_outreach",
  "linkedin_easy_apply",
  "other",
])

export const applicationSchema = z.object({
  position: z.string().min(1, "Position is required"),
  companyName: z.string().min(1, "Company name is required"),
  companyId: z.string().nullable().optional().default(null),
  status: applicationStatusSchema,
  applicationDate: z.string().min(1, "Application date is required"),
  jobUrl: urlSchema.transform((val) => (val === "" ? null : val)),
  salary: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),
  method: applicationMethodSchema,
  notes: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>

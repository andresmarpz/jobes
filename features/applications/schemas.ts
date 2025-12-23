import { z } from "zod";

const urlSchema = z.url({ message: "Invalid URL" }).nullable().or(z.literal(""));

export const applicationStatusSchema = z.enum([
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn"
]);

export const applicationMethodSchema = z.enum([
  "cold_email",
  "contact_referral",
  "ats_application",
  "recruiter_outreach",
  "linkedin_easy_apply",
  "other"
]);

export const applicationSchema = z.object({
  position: z.string().min(1, "Position is required"),
  companyName: z.string().min(1, "Company name is required"),
  companyId: z
    .string()
    .nullish()
    .transform(val => val ?? null),
  status: applicationStatusSchema,
  applicationDate: z.date(),
  jobUrl: urlSchema.transform(val => (val === "" ? null : val)),
  salary: z
    .string()
    .nullish()
    .transform(val => val || null),
  method: applicationMethodSchema,
  notes: z
    .string()
    .nullish()
    .transform(val => val || null)
});

export type ApplicationFormData = z.output<typeof applicationSchema>;
export type ApplicationFormInput = z.input<typeof applicationSchema>;

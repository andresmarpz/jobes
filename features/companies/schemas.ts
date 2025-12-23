import { z } from "zod";

const urlSchema = z.url().nullable().or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  linkedinUrl: urlSchema.transform(val => (val === "" ? null : val)),
  country: z.string().min(1, "Country is required")
});

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  description: z.string().min(1, "Description is required"),
  websiteUrl: urlSchema.transform(val => (val === "" ? null : val)),
  linkedinUrl: urlSchema.transform(val => (val === "" ? null : val))
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type CompanyFormData = z.infer<typeof companySchema>;

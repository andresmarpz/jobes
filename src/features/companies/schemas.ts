import { z } from "zod";

const normalizeUrl = (val: string | null): string | null => {
  if (!val || val.trim() === "") return null;
  const trimmed = val.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
};

const urlSchema = z
  .string()
  .nullable()
  .or(z.literal(""))
  .transform(normalizeUrl)
  .refine(val => val === null || z.string().url().safeParse(val).success, {
    message: "Please enter a valid URL"
  });

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  linkedinUrl: urlSchema,
  country: z.string().min(1, "Country is required")
});

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  description: z.string(),
  websiteUrl: urlSchema,
  linkedinUrl: urlSchema
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type CompanyFormData = z.infer<typeof companySchema>;

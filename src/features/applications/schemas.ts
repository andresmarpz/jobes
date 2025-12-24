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

const salarySchema = z
  .string()
  .nullable()
  .or(z.literal(""))
  .transform(val => {
    if (!val || val.trim() === "") return null;
    return val.trim();
  })
  .refine(
    val => {
      if (val === null) return true;
      // Matches formats like $120k, $85k, $1200k (for very high salaries)
      return /^\$\d{2,4}k$/i.test(val);
    },
    { message: "Please use format like $120k" }
  );

export const applicationSchema = z.object({
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company is required"),
  status: z.enum(["applied", "screening", "interviewing", "offer", "rejected", "withdrawn"]),
  relevantUrl: urlSchema,
  method: z.enum(["cold-email", "referral", "job-board", "linkedin", "other"]),
  salary: salarySchema,
  notes: z
    .string()
    .nullable()
    .or(z.literal(""))
    .transform(val => {
      if (!val || val.trim() === "") return null;
      return val.trim();
    })
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

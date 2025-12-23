"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { companySchema, type CompanyFormData } from "../schemas";

interface Props {
  defaultValues?: CompanyFormData;
  onSubmit: (data: CompanyFormData) => Promise<unknown>;
  onCancel: () => unknown;
}

export function CompanyDialogForm({ defaultValues, onSubmit, onCancel }: Props) {
  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      websiteUrl: "",
      linkedinUrl: ""
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name*</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What does this company do?"
                  className="h-32 max-h-32 min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400">Website URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400">LinkedIn URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://linkedin.com/company/example"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <>Save</> : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

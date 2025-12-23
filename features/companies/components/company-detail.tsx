"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconExternalLink,
  IconPencil,
  IconTrash,
  IconArrowLeft,
  IconDots
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useCompany } from "../hooks/use-companies";
import { ContactList } from "./contact-list";
import { DeleteCompanyDialog } from "./delete-company-dialog";
import { EditCompanyDialog } from "./edit-company-dialog";
import { Frame } from "@/components/ui/frame";
import Head from "next/head";

type CompanyDetailProps = {
  companyId: string;
};

export function CompanyDetail({ companyId }: CompanyDetailProps) {
  const router = useRouter();
  const {
    company,
    isLoading,
    error,
    updateCompany,
    deleteCompany,
    addContact,
    updateContact,
    removeContact
  } = useCompany(companyId);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const handleBlur = useCallback(
    (field: "name" | "description", ref: React.RefObject<HTMLElement | null>) => {
      const newValue = ref.current?.innerText?.trim() ?? "";
      const originalValue = company?.[field] ?? "";
      if (newValue && newValue !== originalValue) {
        updateCompany({ [field]: newValue });
      } else if (ref.current) {
        ref.current.innerText = originalValue;
      }
    },
    [company, updateCompany]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, ref: React.RefObject<HTMLElement | null>, allowNewlines = false) => {
      if (e.key === "Enter" && !(allowNewlines && e.shiftKey)) {
        e.preventDefault();
        ref.current?.blur();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        const field = ref === nameRef ? "name" : "description";
        if (ref.current) {
          ref.current.innerText = company?.[field] ?? "";
        }
        ref.current?.blur();
      }
    },
    [company]
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading company...</p>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <p className="text-destructive">{error ?? "Company not found"}</p>
        <Button asChild variant="outline">
          <Link href="/companies">
            <IconArrowLeft className="mr-2 h-4 w-4" />
            Back to Companies
          </Link>
        </Button>
      </div>
    );
  }

  const handleDelete = async () => {
    await deleteCompany();
    router.push("/companies");
  };

  return (
    <div className="space-y-6">
      <Head>
        <title>{`Company — ${company.name}`}</title>
      </Head>
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/companies" className="cursor-default">
            <IconArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1
          ref={nameRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={() => handleBlur("name", nameRef)}
          onKeyDown={e => handleKeyDown(e, nameRef)}
          className="focus:outline-foreground/10 -mx-2 flex-1 cursor-text rounded-sm px-2 text-3xl font-bold outline-1 outline-transparent"
        >
          {company.name}
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <IconDots className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
              <IconPencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onSelect={() => setIsDeleteDialogOpen(true)}>
              <IconTrash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Frame>
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-muted-foreground text-sm font-medium">Description</h3>
              <p
                ref={descriptionRef}
                contentEditable
                suppressContentEditableWarning
                onBlur={() => handleBlur("description", descriptionRef)}
                onKeyDown={e => handleKeyDown(e, descriptionRef, true)}
                className="text-foreground/90 focus:outline-foreground/10 -mx-2 mt-1 cursor-text rounded-sm px-2 py-1 whitespace-pre-wrap outline-1 outline-transparent"
              >
                {company.description}
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">Website</h3>
                {company.websiteUrl ? (
                  <a
                    href={company.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary mt-1 inline-flex items-center gap-1 hover:underline"
                  >
                    <IconExternalLink className="h-4 w-4" />
                    {company.websiteUrl}
                  </a>
                ) : (
                  <p className="text-foreground/90 mt-1">-</p>
                )}
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm font-medium">LinkedIn</h3>
                {company.linkedinUrl ? (
                  <a
                    href={company.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary mt-1 inline-flex items-center gap-1 hover:underline"
                  >
                    <IconExternalLink className="h-4 w-4" />
                    {company.linkedinUrl}
                  </a>
                ) : (
                  <p className="text-foreground/90 mt-1">-</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Frame>

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

      <EditCompanyDialog
        company={company}
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
      />
    </div>
  );
}

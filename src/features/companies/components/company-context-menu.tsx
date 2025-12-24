"use client";

import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { IconTrash } from "@tabler/icons-react";
import type { Company } from "../types";
import { useDeleteCompanyMutation } from "../queries";
import { DeleteCompanyDialog } from "./delete-company-dialog";

type Props = React.PropsWithChildren<{
  company: Company;
}>;

export default function CompanyContextMenu({ children, company }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteMutation = useDeleteCompanyMutation();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(company.id);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger className="w-full" asChild>
          {children}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48 overflow-y-hidden">
          <ContextMenuItem variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <IconTrash className="size-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <DeleteCompanyDialog
        companyName={company.name}
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </>
  );
}

import { AddApplicationDialog } from "@/features/applications/components/add-application-dialog";
import { ApplicationsTable } from "@/features/applications/components/applications-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications"
};

export default function Applications() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Applications</h1>
        <AddApplicationDialog />
      </div>
      <ApplicationsTable />
    </div>
  );
}

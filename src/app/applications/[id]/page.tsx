import { ApplicationDetail } from "@/features/applications/components/application-detail";
import { Metadata } from "next";

type ApplicationPageProps = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Application"
};

export default async function ApplicationPage({ params }: ApplicationPageProps) {
  const { id } = await params;

  return (
    <>
      <ApplicationDetail applicationId={id} />
    </>
  );
}

"use client";

import { IconBuilding } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

interface CompanyIconProps {
  websiteUrl?: string | null;
  size?: number;
}

export function CompanyIcon({ websiteUrl, size = 16 }: CompanyIconProps) {
  const [hasError, setHasError] = useState(false);

  if (!websiteUrl || hasError) {
    return <IconBuilding className="text-muted-foreground shrink-0" size={size} />;
  }

  // Extract domain from URL for favicon service
  let domain: string;
  try {
    domain = new URL(websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`).hostname;
  } catch {
    return <IconBuilding className="text-muted-foreground shrink-0" size={size} />;
  }

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size * 2}`;

  return (
    <Image
      unoptimized
      src={faviconUrl}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-[2px] border border-white/10"
      onError={() => setHasError(true)}
    />
  );
}

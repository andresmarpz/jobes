"use client";

import { IconBuilding } from "@tabler/icons-react";
import Image from "next/image";

interface CompanyIconProps {
  iconUrls: string[];
  size?: number;
}

export function CompanyIcon({ iconUrls, size = 16 }: CompanyIconProps) {
  if (iconUrls.length === 0) {
    return <IconBuilding className="text-muted-foreground shrink-0" size={size} />;
  }

  return (
    <Image
      unoptimized
      src={iconUrls[0]}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-[2px]"
    />
  );
}

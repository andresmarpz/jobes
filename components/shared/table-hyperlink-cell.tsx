import ConditionalRender from "@/components/hoc/conditional-render";
import Link from "next/link";

interface Props {
  url: string | undefined;
}

export default function TableHyperlinkCell({ url }: Props) {
  const websiteUrl = url ? new URL(url).hostname : "-";

  return (
    <ConditionalRender
      condition={!!url}
      wrapper={children => (
        <Link href={url!} target="_blank" rel="no-referrer" className="text-primary">
          {children}
        </Link>
      )}
    >
      <span
        data-is-url={!!url}
        className="text-muted-foreground data-[is-url=true]:text-primary truncate font-mono font-medium"
      >
        {websiteUrl}
      </span>
    </ConditionalRender>
  );
}

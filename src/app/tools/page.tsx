import { Metadata } from "next";
import { toolCategories } from "./data";

export const metadata: Metadata = {
  title: "Tools"
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen">
      <main>
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Tools
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Everything you need for your job search
          </p>
        </div>

        <div className="space-y-10">
          {toolCategories.map(category => (
            <section key={category.name}>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {category.name}
                </h2>
                <div className="bg-border h-px flex-1" />
              </div>

              <div className="bg-muted/50 rounded-2xl p-1">
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
                  {category.tools.map(tool => (
                    <a
                      key={tool.name}
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-background group relative overflow-hidden rounded-xl border bg-clip-padding p-4 shadow-xs transition-all before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_1px_var(--color-black)/4%] hover:shadow-md dark:bg-clip-border dark:before:shadow-[0_-1px_var(--color-white)/8%]"
                    >
                      <div className="text-muted-foreground mb-3 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                        {tool.icon}
                      </div>
                      <div className="font-medium text-zinc-900 dark:text-zinc-100">
                        {tool.name}
                      </div>
                      <div className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                        {tool.description}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

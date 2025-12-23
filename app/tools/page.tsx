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
        </div>

        <div className="space-y-8">
          {toolCategories.map(category => (
            <section key={category.name}>
              <h2 className="mb-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {category.name}
              </h2>

              <div className="flex flex-wrap gap-2">
                {category.tools.map(tool => (
                  <a
                    key={tool.name}
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                  >
                    <span className="text-zinc-500 dark:text-zinc-400">{tool.icon}</span>
                    {tool.name}
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

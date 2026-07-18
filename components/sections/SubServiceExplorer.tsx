import type { SubService } from "@/data/services";
import ScrollspyExplorer, { type ScrollspyExplorerItem } from "@/components/ui/ScrollspyExplorer";
import Mark from "@/components/ui/Mark";
import Rule from "@/components/ui/Rule";

export type SubServiceExplorerProps = {
  subServices: SubService[];
};

export default function SubServiceExplorer({ subServices }: SubServiceExplorerProps) {
  const items: ScrollspyExplorerItem[] = subServices.map((subService) => ({
    id: subService.slug,
    label: subService.name,
    content: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Mark size={14} tone="accent" />
            <h2 className="font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-ink-soft">
              {subService.name}
            </h2>
          </div>
          <Rule variant="short" />
        </div>

        <p className="max-w-prose font-body text-body text-ink-soft">{subService.plainIntro}</p>

        {subService.deliver.length > 0 ? (
          <div className="flex flex-col gap-6">
            {subService.deliver.map((item) => (
              <div key={item.name} className="flex flex-col gap-1.5">
                <h3 className="font-display text-h3 font-semibold text-ink">{item.name}</h3>
                <p className="max-w-prose font-body text-body text-ink-soft">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {subService.scope && subService.scope.length > 0 ? (
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-ink-soft">
              Scope
            </h3>
            <ul className="flex flex-col gap-2">
              {subService.scope.map((scopeItem) => (
                <li
                  key={scopeItem}
                  className="flex items-start gap-3 font-body text-body text-ink-soft"
                >
                  <span
                    className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <span>{scopeItem}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {subService.process && subService.process.length > 0 ? (
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-mono-eyebrow uppercase tracking-[0.12em] text-ink-soft">
              Process
            </h3>
            <ol className="grid gap-6 sm:grid-cols-2">
              {subService.process.map((step, index) => (
                <li key={step} className="flex flex-col gap-2">
                  <span className="font-mono text-mono-eyebrow text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-body text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    ),
  }));

  return <ScrollspyExplorer items={items} navLabel="Sub-services" />;
}

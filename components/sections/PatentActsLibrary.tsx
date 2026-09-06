"use client";

import { useDeferredValue, useState } from "react";
import Container from "@/components/ui/Container";
import {
  officialPatentActsIndex,
  patentActs,
  type PatentAct,
} from "@/data/patent-acts";

type Filter = "All" | PatentAct["kind"];

const filters: Filter[] = ["All", "Consolidated Act", "Amendment Act", "Related Act"];

function ExternalArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="4.75" stroke="currentColor" strokeWidth="1.4" />
      <path d="m11.5 11.5 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ActRow({ act }: { act: PatentAct }) {
  return (
    <a
      href={act.sourceUrl}
      target="_blank"
      rel="noreferrer"
      className="group grid gap-5 border-t border-line py-7 transition-colors hover:bg-accent-wash sm:grid-cols-[5rem_1fr_auto] sm:px-4 sm:py-8"
    >
      <div className="font-display text-eyebrow font-medium text-accent">{act.year}</div>
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-display text-h3 font-semibold text-ink transition-colors group-hover:text-accent">
            {act.shortTitle}
          </h3>
          <span className="rounded-card border border-line px-2 py-1 font-display font-medium text-eyebrow uppercase tracking-[0.12em] text-ink-soft">
            {act.kind}
          </span>
        </div>
        <p className="mt-3 max-w-[62ch] font-body text-small text-ink-soft">{act.summary}</p>
        {act.actNumber ? (
          <p className="mt-3 font-display font-medium text-eyebrow uppercase tracking-[0.12em] text-ink-soft">
            Act no. {act.actNumber}
          </p>
        ) : null}
      </div>
      <span className="flex items-center gap-2 self-start font-display text-small font-medium text-accent sm:mt-1">
        {act.sourceLabel}
        <ExternalArrow />
      </span>
    </a>
  );
}

export default function PatentActsLibrary() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const currentAct = patentActs.find((act) => act.current);
  const results = patentActs.filter((act) => {
    if (act.current) return false;
    const matchesFilter = filter === "All" || act.kind === filter;
    const haystack = `${act.title} ${act.year} ${act.kind} ${act.actNumber ?? ""}`.toLowerCase();
    return matchesFilter && haystack.includes(deferredQuery);
  });

  return (
    <>
      <section className="border-b border-line pt-14 pb-16 md:pt-20 md:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-display text-display-2xl font-bold text-ink-strong">
                Indian patent acts
              </h1>
              <p className="mt-5 max-w-[54ch] font-body text-lead text-ink-soft">
                A working library of the principal Act and key amendments, linked to official government sources.
              </p>
            </div>
            <dl className="grid grid-cols-2 border-t border-line pt-5 lg:grid-cols-1 lg:gap-5">
              <div>
                <dt className="font-display font-medium text-eyebrow uppercase tracking-[0.12em] text-ink-soft">Jurisdiction</dt>
                <dd className="mt-2 font-display text-body font-semibold text-ink">India</dd>
              </div>
              <div>
                <dt className="font-display font-medium text-eyebrow uppercase tracking-[0.12em] text-ink-soft">Official source</dt>
                <dd className="mt-2 font-display text-body font-semibold text-ink">IP India</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          {currentAct ? (
            <a
              href={currentAct.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="group grid overflow-hidden rounded-card bg-accent-deep text-paper md:grid-cols-[11rem_1fr_auto]"
            >
              <div className="flex min-h-36 items-center justify-center border-b border-paper/15 bg-accent px-6 md:border-b-0 md:border-r">
                <div className="text-center">
                  <span className="block font-display font-medium text-eyebrow uppercase tracking-[0.12em] text-paper/70">Act</span>
                  <span className="mt-2 block font-display text-display-l font-bold">1970</span>
                </div>
              </div>
              <div className="p-7 md:p-9">
                <p className="font-display font-medium text-eyebrow uppercase tracking-[0.12em] text-paper/60">Current consolidated text</p>
                <h2 className="mt-3 font-display text-h3 font-semibold text-paper md:text-display-l">
                  {currentAct.shortTitle}
                </h2>
                <p className="mt-4 max-w-[58ch] font-body text-small text-paper/70">{currentAct.summary}</p>
              </div>
              <span className="flex items-center gap-2 self-end px-7 pb-8 font-display text-small font-medium text-paper md:self-center md:px-9 md:pb-0">
                {currentAct.sourceLabel}
                <ExternalArrow />
              </span>
            </a>
          ) : null}

          <div className="mt-16 md:mt-24">
            <div className="flex flex-col gap-8 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="font-display text-display-l font-bold text-ink-strong">Amendments & related acts</h2>
                <p className="mt-3 font-body text-body text-ink-soft">Browse the laws that shaped the current framework.</p>
              </div>
              <label className="relative block w-full lg:w-80">
                <span className="sr-only">Search patent acts</span>
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
                  <SearchIcon />
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by title or year"
                  className="min-h-12 w-full rounded-card border border-line bg-surface py-3 pl-11 pr-4 font-body text-small text-ink placeholder:text-ink-soft focus:border-accent focus:outline-none"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-2 py-6" aria-label="Filter acts">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                  className={`min-h-10 rounded-card border px-4 font-display text-small font-medium transition-colors ${
                    filter === item
                      ? "border-accent bg-accent text-paper"
                      : "border-line text-ink-soft hover:border-accent hover:text-accent"
                  }`}
                >
                  {item === "All" ? "All documents" : item.replace(" Act", "")}
                </button>
              ))}
            </div>

            <p className="pb-2 font-display font-medium text-eyebrow uppercase tracking-[0.12em] text-ink-soft" aria-live="polite">
              {results.length} {results.length === 1 ? "document" : "documents"}
            </p>

            <div>
              {results.length > 0 ? (
                results.map((act) => <ActRow key={`${act.year}-${act.kind}`} act={act} />)
              ) : (
                <div className="border-t border-line py-12 text-center">
                  <p className="font-display text-h3 font-semibold text-ink">No matching acts</p>
                  <p className="mt-2 font-body text-small text-ink-soft">Try another title, year, or filter.</p>
                </div>
              )}
            </div>

            <div className="border-t border-line pt-8 sm:flex sm:items-start sm:justify-between sm:gap-8">
              <p className="max-w-[68ch] font-body text-small text-ink-soft">
                This library is for general reference, not legal advice. Gazette notifications prevail if an online copy differs.
              </p>
              <a
                href={officialPatentActsIndex}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex flex-none items-center gap-2 font-display text-small font-medium text-accent hover:text-accent-deep sm:mt-0"
              >
                View official index
                <ExternalArrow />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

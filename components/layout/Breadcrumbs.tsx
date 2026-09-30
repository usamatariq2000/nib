import Link from "next/link";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-faint">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-ink-soft">
                  {c.name}
                </span>
              ) : (
                <Link
                  href={c.path}
                  className="transition-colors hover:text-ink"
                >
                  {c.name}
                </Link>
              )}
              {!last ? (
                <span aria-hidden="true" className="text-border-strong">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

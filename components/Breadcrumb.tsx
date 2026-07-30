import Link from "next/link";
import { ChevronRight, House } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-400"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.name} className="flex items-center gap-2">
            {index === 0 && <House className="h-4 w-4" />}

            {isLast ? (
              <span className="font-medium text-green-400">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href || "#"}
                className="transition hover:text-green-400"
              >
                {item.name}
              </Link>
            )}

            {!isLast && (
              <ChevronRight className="h-4 w-4 text-gray-600" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
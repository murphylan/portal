import { hasLocale } from "next-intl";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en"],
  defaultLocale: "zh",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];

export function getPathnameWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && hasLocale(routing.locales, first)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getLocaleAwarePath(
  currentPathname: string,
  targetPath: string,
): string {
  const segments = currentPathname.split("/").filter(Boolean);
  const first = segments[0];
  if (
    first &&
    hasLocale(routing.locales, first) &&
    first !== routing.defaultLocale
  ) {
    return `/${first}${targetPath === "/" ? "" : targetPath}`;
  }
  return targetPath;
}

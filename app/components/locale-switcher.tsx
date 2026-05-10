"use client";

import { Languages } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import {
  type AppLocale,
  getPathnameWithoutLocale,
  routing,
} from "@/i18n/routing";
import { cn } from "@/lib/utils";

export default function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("LocaleSwitcher");

  function switchLocale(nextLocale: AppLocale) {
    if (nextLocale === locale) return;

    const cleanPathname = getPathnameWithoutLocale(pathname || "/");
    const localizedPathname =
      nextLocale === routing.defaultLocale
        ? cleanPathname
        : `/${nextLocale}${cleanPathname === "/" ? "" : cleanPathname}`;
    const query = searchParams.toString();
    const hash = window.location.hash;
    window.location.assign(
      `${localizedPathname}${query ? `?${query}` : ""}${hash}`,
    );
  }

  return (
    <label
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-current/20 px-2 py-1 text-xs transition-colors",
        className,
      )}
    >
      <Languages className="h-3.5 w-3.5" />
      <span className="sr-only">{t("label")}</span>
      <select
        aria-label={t("label")}
        className="bg-transparent text-current outline-none cursor-pointer"
        value={locale}
        onChange={(event) => switchLocale(event.target.value as AppLocale)}
      >
        {routing.locales.map((nextLocale) => (
          <option key={nextLocale} value={nextLocale}>
            {t(nextLocale)}
          </option>
        ))}
      </select>
    </label>
  );
}

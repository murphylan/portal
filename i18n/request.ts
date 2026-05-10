import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const headerLocale = (await headers()).get("x-portal-locale");
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, headerLocale)
    ? headerLocale
    : hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

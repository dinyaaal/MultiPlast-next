import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ukr", "ru"],

  // Used when no locale matches
  defaultLocale: "ukr",

  // Always open the Ukrainian version from the bare domain instead of
  // redirecting by browser language or a previously saved locale cookie.
  localeDetection: false,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

"use client";

import { useEffect } from "react";

/** One listener, one event per contact intent. Never records user-entered data. */
export function ConversionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      let name: string;
      let destination: string;
      if (href.startsWith("mailto:")) { name = "email_click"; destination = "email"; }
      else if (href.startsWith("tel:")) { name = "phone_click"; destination = "phone"; }
      else {
        const url = new URL(link.href, window.location.origin);
        if (url.origin !== window.location.origin || url.pathname !== "/contact") return;
        destination = "/contact";
        name = url.searchParams.has("package") || window.location.pathname === "/pricing"
          ? "pricing_cta_click" : window.location.pathname.startsWith("/work/")
          ? "case_study_cta_click" : "primary_cta_click";
      }
      window.gtag?.("event", name, { page_path: window.location.pathname, destination,
        placement: link.closest("header") ? "header" : link.closest("footer") ? "footer" : "content" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

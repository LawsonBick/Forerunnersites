import { load } from "cheerio";

// Only these two public, static client sites need popup-free presentation pages.
// No visitor cookies, credentials, query strings, or form data go upstream.
const origins: Record<string, string> = {
  trz: "https://trzdetail.com",
  cleanz: "https://www.cleanzatx.com",
};
const popups = "#trzck, #offw, #exitPopup, #bookingNotif";

export async function GET(request: Request, context: {
  params: Promise<{ client: string; path?: string[] }>;
}) {
  const { client, path = [] } = await context.params;
  const origin = Object.hasOwn(origins, client) ? origins[client] : undefined;
  if (!origin || path.length > 4 || path.some((part) => !/^[a-z0-9-]{1,90}$/.test(part))) {
    return new Response("Not found", { status: 404 });
  }
  let source = new URL(`${origin}/${path.join("/")}`);
  source.searchParams.set("nopop", "1");
  const publicOrigin = new URL(request.url).origin;
  const prefix = `${publicOrigin}/work/preview/${client}`;

  try {
    let response: Response | undefined;
    for (let redirects = 0; redirects < 4; redirects++) {
      response = await fetch(source, {
        redirect: "manual", signal: AbortSignal.timeout(8000), next: { revalidate: 3600 },
      });
      if (response.status < 300 || response.status >= 400) break;
      const location = response.headers.get("location");
      if (!location) break;
      const next = new URL(location, source);
      if (next.origin !== origin) throw new Error("Unexpected client redirect");
      source = next;
    }
    if (!response?.ok || !response.headers.get("content-type")?.includes("text/html")) {
      throw new Error("Client page unavailable");
    }
    const html = await response.text();
    if (html.length > 2_000_000) throw new Error("Client page too large");
    const $ = load(html);
    $(popups).remove();
    $('[onclick*="trzCookieSettings"]').remove();
    $('base, noscript, meta[http-equiv], meta[name="robots"], link[rel="canonical"]').remove();
    $("script").each((_, node) => {
      const script = $(node);
      const src = script.attr("src") || "";
      const code = script.html() || "";
      if (/consent\.js|googletagmanager|google-analytics|reviews-live\.js|area-check\.js|tidio/i.test(src) ||
          script.attr("type") === "application/ld+json" ||
          /navigator\.serviceWorker|window\.GA4_ID\s*=|gtag\(['"](?:config|js)['"]/.test(code)) script.remove();
    });
    // Keep real in-page links local; all other client page links stay in this
    // presentation route, so consent banners cannot return on the next page.
    $("a[href]").each((_, node) => {
      const link = $(node);
      const href = link.attr("href")!;
      if (href.startsWith("#")) return; // handled locally by the click bridge below
      const target = new URL(href, source);
      if (target.origin === origin && /^\/(?:[a-z0-9-]+\/)*[a-z0-9-]*\/?$/.test(target.pathname)) {
        link.attr("href", prefix + target.pathname.replace(/\/$/, "") + target.hash);
      } else if (/^https?:$/.test(target.protocol)) {
        link.attr({ href: target.href, target: "_blank", rel: "noopener noreferrer" });
      }
    });
    $('button[id^="q-submit"]').text("Continue on live site ↗");
    $("head").prepend(`<base href="${source.href}"><meta name="robots" content="noindex,nofollow,noarchive">`);
    $("head").append(`<style>${popups}{display:none!important;visibility:hidden!important;pointer-events:none!important}html,body{overscroll-behavior-y:contain}</style>`);
    const bridge = `
      window.trzTrack=function(){};
      // An opaque sandbox gets temporary UI storage, never real consent or cookies.
      for(const name of ['localStorage','sessionStorage']) {
        const values=new Map();
        Object.defineProperty(window,name,{value:{getItem:k=>values.get(String(k))??null,setItem:(k,v)=>values.set(String(k),String(v)),removeItem:k=>values.delete(String(k)),clear:()=>values.clear(),key:i=>[...values.keys()][i]??null,get length(){return values.size}}});
      }
      const source=${JSON.stringify(source.href)}, prefix=${JSON.stringify(prefix)};
      document.addEventListener('click',function(event){
        const target=event.target instanceof Element?event.target:null;
        if(target?.closest('[id^="q-submit"]')) {event.preventDefault();event.stopImmediatePropagation();window.open(source,'_blank','noopener');return;}
        const link=target?.closest('a[href]');if(!link)return;
        const raw=link.getAttribute('href');
        if(raw.startsWith('#')) {event.preventDefault();const el=document.getElementById(decodeURIComponent(raw.slice(1)));if(el)el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
        const url=new URL(raw,source);
        if(url.origin===new URL(source).origin && /^\\/(?:[a-z0-9-]+\\/)*[a-z0-9-]*\\/?$/.test(url.pathname))link.href=prefix+url.pathname.replace(/\\/$/,'')+url.hash;
      },true);
      document.addEventListener('submit',function(event){event.preventDefault();event.stopImmediatePropagation();window.open(source,'_blank','noopener');},true);
    `;
    // Runs before the client's UI scripts; no tracker or popup scripts are added.
    $("head").prepend(`<script>${bridge}</script>`);
    return new Response($.html(), { headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "Content-Security-Policy": "script-src 'unsafe-inline' https://trzdetail.com https://www.cleanzatx.com https://cdn.jsdelivr.net; connect-src 'none'; object-src 'none'; form-action 'none'; frame-ancestors 'self'; sandbox allow-scripts allow-popups allow-popups-to-escape-sandbox",
    } });
  } catch {
    return new Response(`<!doctype html><html lang="en"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width"><body style="font:16px system-ui;padding:32px"><p>This preview is temporarily unavailable.</p><a href="${origin}" target="_blank" rel="noopener noreferrer">Open the live website ↗</a></body></html>`, {
      status: 502, headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" },
    });
  }
}

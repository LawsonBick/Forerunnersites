/**
 * Renders one JSON-LD block. Every piece of structured data on the site
 * goes through here so the serialisation (and its escaping) lives in one
 * place; the builders themselves are in lib/schema.ts.
 *
 * `<` is escaped so a value containing "</script>" can never terminate
 * the tag, which React's plain string interpolation would not prevent.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : data;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, "\\u003c") }}
    />
  );
}

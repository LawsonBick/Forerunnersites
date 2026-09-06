/** "UX & content structure" -> "ux-content-structure", for anchors and @ids. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

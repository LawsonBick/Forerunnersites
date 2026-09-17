/** Add only client-approved, attributable statements. Empty until supplied. */
export interface Testimonial {
  quote: string;
  clientName: string;
  company: string;
  position?: string;
  projectSlug: string;
  photo?: { src: string; alt: string; width: number; height: number };
  approvedAt: string;
  source: string;
}
export const testimonials: Testimonial[] = [];

/** A measurement needs a source and a comparable period, not just a headline. */
export interface VerifiedResult {
  label: string;
  value: string;
  period: string;
  comparisonPeriod?: string;
  methodology: string;
  sourceLabel: string;
  sourceUrl?: string;
  verifiedAt: string;
  approvedForPublication: boolean;
}
export const projectResults: Record<string, VerifiedResult[]> = {};

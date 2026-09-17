/** Describes decisions evidenced in the existing project content, not measured results. */
export const projectContext: Record<string, {development: string; search: string; conversion: string; service: string; resource: string}> = {
  manuels: {
    development: "The build separates menus, reservations, ordering, and private dining into their own paths. The menu system supports dietary filtering, while table booking hands off to Resy. Responsive layouts carry those same tasks from desktop to a phone without treating the smaller screen as an afterthought.",
    search: "Menus, dining occasions, and visit information need a clear content hierarchy. The project’s local SEO scope centers on making the restaurant’s actual offerings understandable and easy to navigate. The case study documents that structure; it does not claim a ranking improvement or contain a measured before-and-after search comparison.",
    conversion: "A table reservation, a to-go order, and a private event inquiry are different decisions. Each has its own route so a guest can move from the relevant information to the appropriate action. Booking-provider clicks should be distinguished from confirmed reservations when evaluating the site.",
    service: "restaurant-web-design", resource: "restaurant-website-design-guide",
  },
  "trz-detail": {
    development: "The site combines service pricing, an interactive before-and-after gallery, membership options, and a short booking flow. Responsive layouts keep those details usable on a phone, where the visitor may be comparing a package while standing beside the vehicle.",
    search: "Specific services and genuine West Austin coverage give the content its local context. Published service details and clear navigation help explain what TRZ does. No traffic or ranking lift is asserted here; those claims would require a verified baseline and comparable reporting period.",
    conversion: "Real vehicle work provides proof before the customer reaches pricing and booking. Service tiers help a visitor understand the commitment, while direct contact and booking paths reduce the need to search for the next step. The gallery shows detailing work, not website conversion metrics.",
    service: "service-business-web-design", resource: "local-seo-service-businesses-austin",
  },
  "cleanz-atx": {
    development: "The site brings itemized pricing, service information, recurring plans, and a short property quote flow into one responsive experience. The form collects the details needed to begin a useful inquiry, while job photography and reviews support the service explanation.",
    search: "The existing project scope includes service and area pages that describe the company’s actual work around Lakeway and West Austin. Useful local content should reflect real coverage and customer questions. This case study does not attribute a measured traffic increase to those pages.",
    conversion: "Pricing helps set expectations before the quote request. Property and service questions give the owner a starting point for follow-up. A completed request is an inquiry, not a confirmed job, and the two should remain separate when reviewing business results.",
    service: "service-business-web-design", resource: "local-seo-service-businesses-austin",
  },
};

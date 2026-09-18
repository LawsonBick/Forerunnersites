export interface WalkthroughPage {
  src: string;
  url: string;
  label: string;
}
export interface Walkthrough {
  mode: "scroll" | "photos";
  pages: WalkthroughPage[];
}
export const walkthroughs: Record<string, Walkthrough> = {
  manuels: {
    mode: "photos",
    pages: [
      {
        src: "/work/tours/manuels-home.html",
        url: "manuels.com",
        label: "Homepage photos",
      },
    ],
  },
  "trz-detail": {
    mode: "scroll",
    pages: [
      {
        src: "/work/tours/trz-home.html",
        url: "trzdetail.com",
        label: "Homepage",
      },
      {
        src: "/work/tours/trz-detail.html",
        url: "trzdetail.com/services/full-detail",
        label: "Full detail",
      },
      {
        src: "/work/tours/trz-results.html",
        url: "trzdetail.com/results",
        label: "Results",
      },
    ],
  },
  "cleanz-atx": {
    mode: "scroll",
    pages: [
      {
        src: "/work/tours/cleanz-home.html",
        url: "cleanzatx.com",
        label: "Homepage",
      },
      {
        src: "/work/tours/cleanz-pollen.html",
        url: "cleanzatx.com/pollen",
        label: "Pollen removal",
      },
      {
        src: "/work/tours/cleanz-gallery.html",
        url: "cleanzatx.com/gallery",
        label: "Gallery",
      },
    ],
  },
  "apex-window-cleaning": {
    mode: "scroll",
    pages: [
      {
        src: "/work/tours/apex-home.html",
        url: "apexwindowcleaningatx.com",
        label: "Homepage",
      },
      {
        src: "/work/tours/apex-windows.html",
        url: "apexwindowcleaningatx.com/services/window-cleaning",
        label: "Window cleaning",
      },
      {
        src: "/work/tours/apex-gallery.html",
        url: "apexwindowcleaningatx.com/gallery",
        label: "Gallery",
      },
    ],
  },
};

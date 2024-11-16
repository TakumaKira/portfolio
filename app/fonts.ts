import localFont from "next/font/local";

const permanentMarker = localFont({
  src: "./fonts/PermanentMarker-Regular.ttf",
  variable: "--font-permanent-marker",
  weight: "400",
});
const caveat = localFont({
  src: [
    {
      path: "./fonts/Caveat-VariableFont_wght.ttf",
      weight: "400",
    },
    {
      path: "./fonts/Caveat-VariableFont_wght.ttf",
      weight: "500",
    },
    {
      path: "./fonts/Caveat-VariableFont_wght.ttf",
      weight: "600",
    },
    {
      path: "./fonts/Caveat-VariableFont_wght.ttf",
      weight: "700",
    },
  ],
  variable: "--font-caveat",
});
const ptSerifRegular = localFont({
  src: "./fonts/PTSerif-Regular.ttf",
  variable: "--font-pt-serif-regular",
  weight: "400",
});
const ptSerifBold = localFont({
  src: "./fonts/PTSerif-Bold.ttf",
  variable: "--font-pt-serif-bold",
  weight: "700",
});
const ptSerifItalic = localFont({
  src: "./fonts/PTSerif-Italic.ttf",
  variable: "--font-pt-serif-italic",
  weight: "400",
});
const ptSerifBoldItalic = localFont({
  src: "./fonts/PTSerif-BoldItalic.ttf",
  variable: "--font-pt-serif-bold-italic",
  weight: "700",
});

export default { permanentMarker, caveat, ptSerifRegular, ptSerifBold, ptSerifItalic, ptSerifBoldItalic };

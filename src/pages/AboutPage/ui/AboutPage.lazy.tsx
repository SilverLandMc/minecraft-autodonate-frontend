import { lazy } from "react";
import componentLoader from "shared/lib/componentLoader/componentLoader";

export const AboutPageLazy = lazy(() =>
  componentLoader(() => import("./AboutPage")),
);

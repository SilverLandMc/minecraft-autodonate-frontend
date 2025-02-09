import { lazy } from "react";
import componentLoader from "shared/lib/componentLoader/componentLoader";

export const MainPageLazy = lazy(() =>
  componentLoader(() => import("./MainPage")),
);

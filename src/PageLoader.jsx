import React from "react";
import { navigationParams } from "./NavigationParams";

function PageLoader({ params }) {
  const currentSection = navigationParams.find((e) => e.id == params.sectionId);
  const component = currentSection.items.find((i) => i.id == params.pageId);
  return component?.component ? component.component : currentSection.element;
}

export default PageLoader;

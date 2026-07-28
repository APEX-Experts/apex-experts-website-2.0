import type { Block } from "payload";
import { highlightedTitleAndEyebrowFields } from "../fields/highlightedTitleAndEyebrow";

export const HighlightedTitleAndEyebrow: Block = {
  slug: "highlighted-title-and-eyebrow",
  interfaceName: "HighlightedTitleAndEyebrowBlock",
  fields: [...highlightedTitleAndEyebrowFields],
};

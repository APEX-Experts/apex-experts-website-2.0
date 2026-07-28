import type { Field } from "payload";

export const highlightedTitleAndEyebrowFields: Field[] = [
  {
    name: "eyebrow",
    type: "text",
    localized: true,
  },
  {
    name: "titleBeforeHighlight",
    type: "text",
    required: true,
    localized: true,
  },
  {
    name: "highlightedTitle",
    type: "text",
    localized: true,
  },
  {
    name: "titleAfterHighlight",
    type: "text",
    localized: true,
  },
  {
    name: "subtitle",
    type: "textarea",
    localized: true,
  },
];

export const getHighlightedTitleAndEyebrowFields = (prefix: string = ""): Field[] => {
  if (!prefix) return highlightedTitleAndEyebrowFields;

  return highlightedTitleAndEyebrowFields.map((field) => ({
    ...field,
    name: `${prefix}${(field as unknown as { name: string }).name.charAt(0).toUpperCase()}${(field as unknown as { name: string }).name.slice(1)}`,
  }));
};

import { Header } from "@/payload-types";

export type NavItemData = Header["navItems"];

export type MegaMenuData = NonNullable<NonNullable<NavItemData>[number]["megaMenu"]>;

export type MegaItem = NonNullable<MegaMenuData>["items"];

export type MegaSubItem = NonNullable<MegaItem>[number]["subitems"];

export type MegSublistItem = NonNullable<MegaItem>[number]["sublist"];

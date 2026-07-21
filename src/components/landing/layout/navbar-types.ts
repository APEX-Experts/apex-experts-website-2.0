export interface MegaSubItem {
  title: string;
  icon: string;
  description: string;
  href: string;
}

export interface MegaItem {
  title: string;
  subtitle: string;
  href?: string | null;
  subitems?: MegaSubItem[] | null;
  iconSvg?: string | null;
  sublist?: {
    title: string;
  }[] | null;
}

export interface MegaMenuData {
  title?: string | null;
  items?: MegaItem[] | null;
}

export interface NavItemData {
  label: string;
  link: string;
  megaMenu?: MegaMenuData | null;
}

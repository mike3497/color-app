export interface Color {
  hex: string;
  id: string;
  name: string;
  shades?: Color[];
  tints?: Color[];
}

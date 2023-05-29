export type Scheme = [number, ElementType];
export type NormalizedScheme = {
  length: number;
  type: ElementType;
  partial: boolean;
};

export type OffsetsNormalizedScheme = NormalizedScheme & {
  offset: number;
  index: number;
};

export enum ElementType {
  BOOLEAN = "boolean",
  NUMBER = "number",
  ASCII = "ascii",
}

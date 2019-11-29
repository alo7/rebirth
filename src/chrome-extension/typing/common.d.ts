export type IBasicType = number | string | boolean | null | undefined;

export type IRecursive = {
  [key in string | number]: IBasicType | IRecursive
}

export interface Header<T = Record<string, unknown>, T2 = never> {
  Name: string;
  Key: keyof T | T2;
}

export interface HeaderTyoe {
  text: string;
  value: string;
}

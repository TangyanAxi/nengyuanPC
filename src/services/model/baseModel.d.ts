declare interface API<T = any> {
  [x: string]: number;
  code?: number;
  data?: T;
  rows?: T;
  total?: number;
  user?: T;
  token?: T;
  message?: string;
}

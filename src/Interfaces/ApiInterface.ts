export interface ApiInterface<T> {
  success: boolean;
  message: string;
  data: T;
}

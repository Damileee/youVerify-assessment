export interface SWRState<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<any>;
  action: (...args: any[]) => Promise<void>;
}

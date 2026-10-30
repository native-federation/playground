import { useEffect, useState, type DependencyList } from 'react';

export interface AsyncState<T> {
  readonly value: T | undefined;
  readonly isLoading: boolean;
  readonly error?: unknown;
}

// The mocked data services resolve at once; a real app would use a data-fetching library.
export const useAsync = <T,>(load: () => Promise<T>, deps: DependencyList): AsyncState<T> => {
  const [state, setState] = useState<AsyncState<T>>({ value: undefined, isLoading: true });

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ value: prev.value, isLoading: true }));
    load().then(
      (value) => !cancelled && setState({ value, isLoading: false }),
      (error) => !cancelled && setState({ value: undefined, isLoading: false, error }),
    );
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
};

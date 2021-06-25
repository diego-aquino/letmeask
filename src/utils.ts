import { LegacyRef, MutableRefObject, RefCallback } from 'react';
import toast from 'react-hot-toast';

export function mergeRefs<T>(
  ...refs: Array<MutableRefObject<T> | LegacyRef<T>>
): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null) {
        // eslint-disable-next-line no-param-reassign
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export const notify = {
  info(message: string, duration = 2500): void {
    toast(message, { duration });
  },
  error(message: string, duration = 3000): void {
    toast.error(message, { duration });
  },
  success(message: string, duration = 2000): void {
    toast.success(message, { duration });
  },
};

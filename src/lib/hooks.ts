import {useEffect, useState} from 'react';

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      console.log('clear');
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
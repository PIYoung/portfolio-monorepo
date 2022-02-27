import { useCallback, useState } from 'react';

type ReturnProps<T> = [T | string, React.ChangeEventHandler<HTMLInputElement>, React.Dispatch<T>];

export function useInput<T>(initialValue: T | string = ''): ReturnProps<T> {
  const [value, setValue] = useState<T | string>(initialValue);
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setValue(e.target.value);
  }, []);
  return [value, onChangeHandler, setValue];
}

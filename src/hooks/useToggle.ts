import { useCallback, useState } from 'react';

type ToggleDispatch = (forceState?: boolean) => void;

function useToggle(initializer: boolean): [boolean, ToggleDispatch] {
  const [value, setValue] = useState(initializer);

  const toggle = useCallback((forceValue?: boolean) => {
    setValue((currentValue) => {
      const newValue = forceValue !== undefined ? forceValue : !currentValue;
      return newValue;
    });
  }, []);

  return [value, toggle];
}

export default useToggle;

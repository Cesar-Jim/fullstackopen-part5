// Custom Hooks
import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  // reset input fields
  const reset = () => setValue('');

  // register changes on input fields
  const onChange = (event) => {
    setValue(event.target.value);
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}
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

  const input = {
    type: type,
    value: value,
    onChange: onChange
  }

  return {
    input,
    reset,
  }
}
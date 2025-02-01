import { FC } from 'react';
import { useFormField } from './FormFieldContext'; // Adjust the import path as necessary

const FormMessage: FC = () => {
  const { error, formMessageId } = useFormField();

  // Check if error is an object with a message property
  const body = typeof error === 'string' ? error : error?.message;

  if (!body) {
    return null;
  }

  return (
    <p id={formMessageId} className="text-sm font-medium text-destructive">
      {body}
    </p>
  );
};

export default FormMessage; 
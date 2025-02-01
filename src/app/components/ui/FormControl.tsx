import {
  forwardRef,
  ComponentRef,
  ComponentPropsWithoutRef,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import { useFormField } from './FormFieldContext'; // Ensure this path is correct

const FormControl = forwardRef<
  ComponentRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

export default FormControl; 
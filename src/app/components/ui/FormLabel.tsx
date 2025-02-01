import {
  forwardRef,
  ComponentRef,
  ComponentPropsWithoutRef,
} from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useFormField } from './FormFieldContext'; // Ensure this path is correct
import { cn } from '@/utils/utils';

const FormLabel = forwardRef<
  ComponentRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

export default FormLabel; 
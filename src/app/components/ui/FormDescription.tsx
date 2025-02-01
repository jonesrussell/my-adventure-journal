import {
  forwardRef,
  HTMLAttributes,
} from 'react';
import { useFormField } from './FormFieldContext'; // Ensure this path is correct
import { cn } from '@/utils/utils';

const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

export default FormDescription; 
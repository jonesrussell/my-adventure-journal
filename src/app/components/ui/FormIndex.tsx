import {
  forwardRef,
  createContext,
  useContext,
  useId,
  HTMLAttributes,
  ComponentRef,
  ComponentPropsWithoutRef,
  ReactNode,
  FC,
} from 'react';
import { JSX } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  FieldValues,
  Control,
  FormProvider,
  FieldError,
} from 'react-hook-form';

import { cn } from '@/utils/utils';
import { Label } from '@/components/ui/label';
import { NewAdventureFormValues } from '@/types/NewAdventureFormValues';
import { useFormField } from './FormFieldContext'; // Ensure this path is correct

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: keyof T; // Use keyof T to restrict to valid keys of the form values
  render: (props: { field: FieldValues }) => JSX.Element;
}

const FormField = forwardRef<HTMLDivElement, FormFieldProps<NewAdventureFormValues>>(
  ({ control, name, render }, ref): JSX.Element => {
    return (
      <div ref={ref}>
        {render({ field: control.getFieldState(name) })}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

interface FormFieldContextValue {
  name: string; // Add the name property
  error?: FieldError; // Change to FieldError to allow access to message
  formMessageId: string; // Add formMessageId property
  formDescriptionId: string; // Add formDescriptionId property
  formItemId: string; // Add formItemId property
}

// Create the context with the defined type
const FormFieldContext = createContext<FormFieldContextValue | undefined>(undefined);

const useFormField = (): FormFieldContextValue => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error('useFormField must be used within a FormFieldProvider');
  }
  return context;
};

interface FormItemContextValue {
  id: string;
}

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const FormLabel = forwardRef<
  ComponentRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

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

const FormMessage: FC = () => {
  const { error, formMessageId } = useFormField();

  // Access message directly from FieldError
  const body = error ? error.message : null;

  if (!body) {
    return null;
  }

  return (
    <p id={formMessageId} className="text-sm font-medium text-destructive">
      {body}
    </p>
  );
};

// Define the props for the Form component
interface FormProps<T extends FieldValues> {
  control: Control<T>;
  handleSubmit: (onSubmit: (values: T) => void) => (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

// Define the Form component
const Form = <T extends FieldValues>({ control, handleSubmit, children }: FormProps<T>): JSX.Element => {
  return (
    <FormProvider {...{ control }}>
      <form onSubmit={handleSubmit((values: T) => {
        // Handle form submission here
        console.log(values);
      })}>
        {children}
      </form>
    </FormProvider>
  );
};

export {
  useFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  Form,
};

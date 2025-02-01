import {
  forwardRef,
  createContext,
  useContext,
  useId,
  HTMLAttributes,
  ComponentRef,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';
import { JSX } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  FieldValues,
  useFormContext,
  Control,
  FormProvider,
  FieldError,
} from 'react-hook-form';

import { cn } from '@/utils/utils';
import { Label } from '@/components/ui/label';
import { NewAdventureFormValues } from '@/types/NewAdventureFormValues';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: 'name' | 'location' | 'description';
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

// Define the context value type
interface FormFieldContextValue {
  name: string; // Add the name property
}

// Create the context with the defined type
const FormFieldContext = createContext<FormFieldContextValue | undefined>(undefined);

const useFormField = (): {
  id: string;
  name: string;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
  error?: string; // Change to string
} => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: fieldState.error ? (fieldState.error as FieldError).message : undefined, // Ensure error is a string
    ...fieldState,
  };
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

const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

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
      <form onSubmit={handleSubmit}>
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

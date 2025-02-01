import {
  forwardRef,
  createContext,
  useContext,
  useId,
  HTMLAttributes,
  ReactNode,
  FC,
} from 'react';
import { JSX } from 'react';
import {
  FieldValues,
  Control,
  FormProvider,
  FieldError,
  UseFormReturn,
} from 'react-hook-form';

import { cn } from '@/utils/utils';
import { NewAdventureFormValues } from '@/types/NewAdventureFormValues';
import FormLabel from './FormLabel'; // Adjust the import path as necessary
import FormControl from './FormControl'; // Adjust the import path as necessary
import FormDescription from './FormDescription'; // Adjust the import path as necessary

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
  formMethods: UseFormReturn<T>; // Change to UseFormReturn to include all methods
  children: ReactNode;
}

// Define the Form component
const Form = <T extends FieldValues>({ formMethods, children }: FormProps<T>): JSX.Element => {
  return (
    <FormProvider {...formMethods}> {/* Pass the entire formMethods object */}
      <form onSubmit={formMethods.handleSubmit((values: T) => {
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

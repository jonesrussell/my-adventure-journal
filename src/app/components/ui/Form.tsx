import { ReactNode } from 'react';
import { JSX } from 'react';
import { FormProvider, FieldValues, UseFormReturn } from 'react-hook-form';

interface FormProps<T extends FieldValues> {
  formMethods: UseFormReturn<T>;
  children: ReactNode;
}

const Form = <T extends FieldValues>({ formMethods, children }: FormProps<T>): JSX.Element => {
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit((values: T) => {
        // Handle form submission
        console.log(values); // Example usage
      })}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form; 
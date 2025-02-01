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
      <form onSubmit={formMethods.handleSubmit((_values: T) => {
        // You can leave this empty if you don't need to use it
      })}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form; 
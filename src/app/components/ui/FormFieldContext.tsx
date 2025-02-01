import { createContext, useContext } from 'react';

interface FormFieldContextValue {
  name: string;
  // Add other properties as needed
}

const FormFieldContext = createContext<FormFieldContextValue | undefined>(undefined);

export const useFormField = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error('useFormField must be used within a FormFieldProvider');
  }
  return context;
};

export default FormFieldContext; 
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the context value type
interface FormFieldContextValue {
  name: string;
  error?: string | { message: string };
  formMessageId?: string;
  formItemId?: string;
  formDescriptionId?: string;
  // Add other properties as needed
}

// Create the context
const FormFieldContext = createContext<FormFieldContextValue | undefined>(undefined);

// Define the props interface
interface FormFieldProviderProps {
  children: ReactNode; // Define children prop
}

// Create the provider component
const FormFieldProvider: React.FC<FormFieldProviderProps> = ({ children }) => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | { message: string } | undefined>(undefined);
  const [formMessageId, setFormMessageId] = useState<string | undefined>(undefined);
  const [formItemId, setFormItemId] = useState<string | undefined>(undefined);
  const [formDescriptionId, setFormDescriptionId] = useState<string | undefined>(undefined);

  const value = {
    name,
    error,
    formMessageId,
    formItemId,
    formDescriptionId,
    // Add any functions to update the state here
  };

  return (
    <FormFieldContext.Provider value={value}>
      {children}
    </FormFieldContext.Provider>
  );
};

// Create a custom hook to use the FormFieldContext
export const useFormField = (): FormFieldContextValue => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error('useFormField must be used within a FormFieldProvider');
  }
  return context;
};

export default FormFieldProvider;

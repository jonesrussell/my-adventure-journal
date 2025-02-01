import { JSX } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: keyof T;
  render: (props: { field: FieldValues }) => JSX.Element;
}

const FormField = <T extends FieldValues>({ control, name, render }: FormFieldProps<T>): JSX.Element => {
  return (
    <div>
      {render({ field: control.getFieldState(name as Path<T>) })}
    </div>
  );
};

export default FormField; 
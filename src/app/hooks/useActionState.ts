import { useState } from 'react';

interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export function useActionState(
  action: (formData: FormData) => Promise<ActionState>,
  initialState: ActionState
): [ActionState, (formData: FormData) => Promise<void>, boolean] {
  const [state, setState] = useState<ActionState>(initialState);
  const [pending, setPending] = useState<boolean>(false);

  const executeAction = async (formData: FormData): Promise<void> => {
    setPending(true);
    setState(initialState); // Reset state before action

    try {
      const result = await action(formData);
      setState(result); // Update state with the result
    } catch (error) {
      setState({
        success: false,
        message: 'An error occurred',
        errors: { general: ['An unexpected error occurred'] },
      });
      console.error(error); // Log the error for debugging
    } finally {
      setPending(false);
    }
  };

  return [state, executeAction, pending]; // Return as an array
}

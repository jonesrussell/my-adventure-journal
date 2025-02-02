'use client';

import { signup } from '@/actions/auth'; // Ensure this path is correct
import { useActionState, JSX } from 'react';

export default function SignupForm(): JSX.Element {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="Username" required />
      </div>
      {state?.errors?.username && <p className="text-red-600">{state.errors.username}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" required />
      </div>
      {state?.errors?.email && <p className="text-red-600">{state.errors.email}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error: string) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" required />
      </div>
      {state?.errors?.confirmPassword && <p className="text-red-600">{state.errors.confirmPassword}</p>}

      <button disabled={pending} type="submit">
        Sign Up
      </button>
    </form>
  );
} 
export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  hashedPassword: string;
  password?: string | null;
}

// Optionally, you can add methods related to user operations here
// e.g., a method to validate the password, etc. 
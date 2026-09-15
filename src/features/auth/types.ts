export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginFormState = {
  error: string | null;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  marketingOptIn: boolean;
};

export type SignupFormState = {
  fieldErrors: {
    password?: string;
    confirmPassword?: string;
  };
  error: string | null;
};

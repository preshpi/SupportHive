interface ErrorMessages {
  [key: string]: string;
}

const errorMessages: ErrorMessages = {
  "auth/invalid-credential": "Username or password is incorrect.",
  "auth/invalid-email": "Invalid email address.",
  "auth/email-already-in-use": "Email already in use.",
  "auth/user-disabled": "This user has been disabled.",
  "auth/user-not-found": "No user found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/weak-password": "Password should be at least 6 characters",
  default: "An unknown error occurred. Please try again.",
};

const getErrorMessage = (code: string): string => {
  return errorMessages[code] || errorMessages["default"];
};

export { getErrorMessage };

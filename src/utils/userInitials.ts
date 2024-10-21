export const getInitials = (
  firstname: string | undefined,
  lastname: string | undefined,
) => {
  const firstInitial = firstname?.charAt(0).toUpperCase(); // Get the first letter of the first name
  const lastInitial = lastname?.charAt(0).toUpperCase(); // Get the first letter of the last name
  return `${firstInitial}${lastInitial}`; // Combine initials
};

export const getInitials = (
  firstname: string | undefined,
  lastname: string | undefined
) => {
  const firstInitial = firstname?.charAt(0).toUpperCase(); // Get the first letter of the first name
  const lastInitial = lastname?.charAt(0).toUpperCase(); // Get the first letter of the last name
  return `${firstInitial}${lastInitial}`; // Combine initials
};

// Calculate days left for each campaign
export const calculateDaysLeft = (endDate: number | string) => {
  const currentDate = new Date();
  const campaignEndDate = new Date(endDate);
  const timeDiff = campaignEndDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
  return daysLeft;
};

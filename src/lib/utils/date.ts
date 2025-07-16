export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Format as "5 Jun, 24" style
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "2-digit",
  };

  return date.toLocaleDateString("en-US", options).replace(",", ",");
}

export function formatDateLong(dateString: string): string {
  const date = new Date(dateString);

  // Format as "June 5, 2024" style
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

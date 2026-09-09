export const capitalizeWords = (value) => {
  if (value === null || value === undefined) {
    return value;
  }

  return value
    .toLowerCase()
    .split(' ')
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
};
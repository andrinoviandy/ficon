// Function to check if a value is undefined, null, or an empty string
function isNullOrUndefinedOrEmpty(value) {
  return value === null || value === undefined || value === "";
};

// Recursive function to check if any property in the object or its nested arrays is empty
function isFormValueEmpty(formData) {
  for (const key in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, key)) {
      const value = formData[key];

      // If the value is an array, recursively check each element
      if (Array.isArray(value)) {
        for (const element of value) {
          if (isFormValueEmpty(element)) {
            return true; // Return true if any element is empty
          };
        };
      } else {
        // Check if the value itself is empty
        if (isNullOrUndefinedOrEmpty(value)) {
          return {
            result: true, // Return true if any property is empty
            field: key,
            values: value
          };
        };
      };
    };
  };
  return { result: false }; // Return false if all properties are valid
};

export const isEmpty = async (form) => {
  try {
    const check = await isFormValueEmpty(form);
    if (check?.result) {
      console.log(`field ${check?.field} are ${check?.values}.`);
    } else {
      console.log("All properties in the form object have values.");
    };

    return check?.result;
  } catch (error) {
    console.error(error);
  };
};

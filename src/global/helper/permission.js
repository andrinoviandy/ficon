export const normalizeActions = (actionsString = "") => {
  return actionsString
    .split(",")
    .map(a => a.trim().toUpperCase())
    .filter(Boolean);
};

export const createPermissionChecker = (actionsString) => {
  const actionSet = new Set(normalizeActions(actionsString));

  return (action) => actionSet.has(action.toUpperCase());
};
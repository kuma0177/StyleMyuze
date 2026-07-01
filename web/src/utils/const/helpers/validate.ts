const isEmpty = (v: unknown) =>
  v === undefined ||
  v === null ||
  (typeof v === 'string' && v.trim() === '') ||
  (Array.isArray(v) && v.length === 0);

export const getMissingUserFields = (inputs: Record<string, any>, rFields: string[]): string[] => {
  const missing: string[] = [];
  for (const f in rFields) {
    if (isEmpty(inputs[rFields[f]])) missing.push(rFields[f]);
  }
  return missing;
};

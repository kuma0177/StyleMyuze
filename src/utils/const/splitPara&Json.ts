export function splitParagraphAndSchema(text: any) {
  const fenceRe = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  let match = text.match(fenceRe);

  if (!match) {
    // 2. Match the first likely JSON object or array in the text
    // This regex tries to capture large {...} or [...]
    const curlyRe = /({[\s\S]*}|\[[\s\S]*\])/m;
    match = text.match(curlyRe);
  }

  if (!match) {
    return {
      paragraph: text.trim(),
      schema: null,
      parseError: "No JSON found",
    };
  }

  const jsonStr = match[1].trim();
  const paragraph = (
    text.slice(0, match.index) + text.slice(match?.index + match[0].length)
  ).trim();

  let schema = null;
  let parseError = null;

  try {
    schema = JSON.parse(jsonStr);
  } catch (e:any) {
    parseError = `JSON parse error: ${e.message}`;
  }

  return { paragraph, schema, parseError };
}
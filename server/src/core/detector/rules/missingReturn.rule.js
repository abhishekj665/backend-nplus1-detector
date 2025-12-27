export const detectMissingReturn = (code) => {
  const issues = [];
  const lines = code.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (
      line.includes("res.status(") ||
      line.includes("res.json(") ||
      line.includes("res.send(")
    ) {
      let hasReturn = false;

      if (line.includes("return")) {
        hasReturn = true;
      }

      if (i > 0 && lines[i - 1].includes("return")) {
        hasReturn = true;
      }

      let j = i + 1;
      while (j < lines.length && lines[j].trim() === "") {
        j++;
      }
      if (j < lines.length && lines[j].includes("return")) {
        hasReturn = true;
      }

      if (!hasReturn) {
        issues.push({
          issueCode: "MISSING_RETURN_AFTER_RESPONSE",
          category: "BUG",
          description:
            "Response is sent without returning, execution may continue and cause multiple responses",
          lineNumber: i + 1,
        });
      }
    }
  }

  return issues;
};

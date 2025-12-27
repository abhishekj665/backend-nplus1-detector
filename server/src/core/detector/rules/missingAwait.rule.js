export const detectMissingAwait = (code) => {
  const issues = [];
  const lines = code.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes("bcrypt.compare(")) {
      const hasAwaitSameLine = line.includes("await");
      const hasAwaitPrevLine = i > 0 && lines[i - 1].includes("await");

      if (!hasAwaitSameLine && !hasAwaitPrevLine) {
        issues.push({
          issueCode: "MISSING_AWAIT_BCRYPT_COMPARE",
          category: "BUG",
          description:
            "bcrypt.compare returns a Promise but is used without await",
          lineNumber: i + 1,
        });
      }
    }
  }

  return issues;
};

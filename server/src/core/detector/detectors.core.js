import { detectMissingAwait } from "./rules/missingAwait.rule.js";
import { detectMissingReturn } from "./rules/missingReturn.rule.js";

export const runDetector = (codeInput) => {
  let issues = [];

  issues.push(...detectMissingAwait(codeInput));
  issues.push(...detectMissingReturn(codeInput));

  return issues;
};

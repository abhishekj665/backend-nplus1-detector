import { AnalysisJob } from "../models/index.model.js";
import DetectIssue from "../models/DetectIssue.model.js";
import { runDetector } from "./detector/detectors.core.js";
import { analyzeWithAI } from "./ai/llm.core.js";

export async function processAnalysisJob(jobId) {
  const job = await AnalysisJob.findByPk(jobId);
  if (!job) throw new Error("Job not found");

  await job.update({ status: "DETECTING" });

  const detectedIssues = runDetector(job.codeInput);

  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  for (const issue of detectedIssues) {
    await DetectIssue.create({
      analysisJobId: job.id,
      ...issue,
      expiresAt,
    });
  }
  await job.update({ status: "AI_PROCESSING" });

  const aiResult = await analyzeWithAI({
    codeInput: job.codeInput,
    detectedIssues,
  });

  if (aiResult) {
    await job.update({
      status: "COMPLETED",
      completedAt: new Date(),
    });
  } else {
    await job.update({
      status: "FAILED",
      completedAt: new Date(),
      failureReason: "AI analysis failed",
    });
  }
  return {
    detectedIssues,
    aiResult,
  };
}

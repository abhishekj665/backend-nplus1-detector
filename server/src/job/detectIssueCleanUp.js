import DetectIssue from "../models/DetectIssue.model.js";
import { Op } from "sequelize";

export async function cleanupExpiredDetectIssues() {
  await DetectIssue.destroy({
    where: {
      expiresAt: {
        [Op.lt]: new Date(),
      },
    },
  });
}

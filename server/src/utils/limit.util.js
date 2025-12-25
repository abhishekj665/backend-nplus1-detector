import rateLimit from "express-rate-limit";

export const analyzeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many analysis requests. Try again later.",
});

export const clearCookie = (res, name) => {
  res.clearCookie(name, {
    httpOnly: true,
    sameSite: "strict",
  });
  return { success: true, message: "Cookie cleared successfully" };
};

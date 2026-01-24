export const successResponse = (res, data, message = "Success") => {
  return res.status(200).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (res, data = null, message, status = 400) => {
  return res.status(status).json({
    success: false,
    data,
    message
  });
};

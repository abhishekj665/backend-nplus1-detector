import Education from "../../models/Education.model.js";

export const getEducationService = async (userId) => {
  try {
    const education = await Education.findAll({
      where: { userId },
      order: [["startDate", "DESC"]],
    });

    if (!education || education.length === 0) {
      return {
        success: false,
        message: "No education records found",
      };
    }

    return {
      success: true,
      data: education,
      message: "Education fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const createEducationService = async (userId, data) => {
  try {
    const education = await Education.create({
      ...data,
      userId,
    });

    return {
      success: true,
      data: education,
      message: "Education added successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateEducationService = async (id, userId, data) => {
  try {
    const education = await Education.findOne({
      where: { id, userId },
    });

    if (!education) {
      return {
        success: false,
        message: "Education record not found",
      };
    }

    const updatedEducation = await education.update(data);

    return {
      success: true,
      data: updatedEducation,
      message: "Education updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteEducationService = async (id, userId) => {
  try {
    const education = await Education.findOne({
      where: { id, userId },
    });

    if (!education) {
      return {
        success: false,
        message: "Education record not found",
      };
    }

    await education.destroy();

    return {
      success: true,
      data: education,
      message: "Education deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

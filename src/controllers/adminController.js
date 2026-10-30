const { createSchedule, getAllBookings } = require("../services/adminService");

const postSchedule = async (req, res, next) => {
  try {
    const schedule = await createSchedule(req.body);
    return res.status(201).json(schedule);
  } catch (err) {
    next(err);
  }
};

const listBookings = async (req, res, next) => {
  try {
    const bookings = await getAllBookings();
    return res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

module.exports = { postSchedule, listBookings };
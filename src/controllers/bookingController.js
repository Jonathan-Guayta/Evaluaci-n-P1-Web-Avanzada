const bookingService = require("../services/bookingService");

const create = async (req, res, next) => {
  try {
    // El userId sale del token, nunca del body
    const booking = await bookingService.createBooking(req.user.id, req.body);
    return res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingById(req.booking.id);
    return res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const booking = await bookingService.updateBooking(req.booking.id, req.body);
    return res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await bookingService.deleteBooking(req.booking.id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, getOne, update, remove };

const listByUser = async (req, res, next) => {
  try {
    const bookings = await bookingService.getUserBookings(Number(req.params.id));
    return res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, getOne, update, remove, listByUser };
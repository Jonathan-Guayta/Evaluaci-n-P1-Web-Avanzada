const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const httpError = require("../utils/httpError");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const parseInput = (date, scheduleId) => {
  const d = new Date(date);
  const sid = Number(scheduleId);
  if (!date || isNaN(d.getTime()) || !Number.isInteger(sid)) {
    throw httpError(400, "date (válida) y scheduleId son obligatorios");
  }
  return { d, sid };
};

const createBooking = async (userId, { date, scheduleId }) => {
  const { d, sid } = parseInput(date, scheduleId);

  const schedule = await prisma.schedule.findUnique({ where: { id: sid } });
  if (!schedule) throw httpError(400, "El horario no existe");

  const taken = await prisma.booking.findFirst({
    where: { date: d, scheduleId: sid },
  });
  if (taken) throw httpError(400, "El horario ya está ocupado");

  return prisma.booking.create({
    data: { date: d, userId, scheduleId: sid },
  });
};

const getBookingById = async (id) => {
  return prisma.booking.findUnique({
    where: { id },
    include: { schedule: true },
  });
};

const updateBooking = async (id, { date, scheduleId }) => {
  const { d, sid } = parseInput(date, scheduleId);

  const schedule = await prisma.schedule.findUnique({ where: { id: sid } });
  if (!schedule) throw httpError(400, "El horario no existe");

  // Ocupado por OTRA reserva: se excluye la que se está editando
  const taken = await prisma.booking.findFirst({
    where: { date: d, scheduleId: sid, NOT: { id } },
  });
  if (taken) throw httpError(400, "El horario ya está ocupado");

  return prisma.booking.update({
    where: { id },
    data: { date: d, scheduleId: sid },
  });
};

const deleteBooking = async (id) => {
  return prisma.booking.delete({ where: { id } });
};

module.exports = {
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
};
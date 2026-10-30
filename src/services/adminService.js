const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const httpError = require("../utils/httpError");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const createSchedule = async ({ court, startTime, endTime }) => {
  if (!court || !startTime || !endTime) {
    throw httpError(400, "court, startTime y endTime son obligatorios");
  }
  return prisma.schedule.create({ data: { court, startTime, endTime } });
};

const getAllBookings = async () => {
  return prisma.booking.findMany({
    include: {
      user: { select: { id: true, name: true, email: true, role: true } },
      schedule: true,
    },
  });
};

module.exports = { createSchedule, getAllBookings };
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const authorizeBooking = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    if (req.user.role !== "ADMIN" && booking.userId !== req.user.id) {
      return res.status(403).json({ error: "No es tu reserva" });
    }

    req.booking = booking;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorizeBooking;
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.booking.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "Paulo Galarza",
      email: "paulo.galarza@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
  });

  const yo = await prisma.user.create({
    data: {
      name: "Jonathan Guayta",
      email: "jmguayta1@espe.edu.ec",
      password: await bcrypt.hash("user123", 10),
      role: "USER",
    },
  });

  const basquet = await prisma.schedule.create({
    data: { court: "Básquet 1", startTime: "08:00", endTime: "10:00" },
  });
  const tenis = await prisma.schedule.create({
    data: { court: "Tenis 1", startTime: "10:00", endTime: "12:00" },
  });

  const fecha = new Date("2026-11-11T00:00:00.000Z");

  await prisma.booking.create({
    data: {
      date: fecha,
      user: { connect: { id: yo.id } },
      schedule: { connect: { id: basquet.id } },
    },
  });
  await prisma.booking.create({
    data: {
      date: fecha,
      user: { connect: { id: admin.id } },
      schedule: { connect: { id: tenis.id } },
    },
  });

  console.log("Seed completado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
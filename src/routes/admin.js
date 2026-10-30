const { Router } = require("express");
const authenticateToken = require("../middlewares/auth");
const authorizeRole = require("../middlewares/authorizeRole");
const { postSchedule, listBookings } = require("../controllers/adminController");

const router = Router();

router.use(authenticateToken, authorizeRole("ADMIN"));

router.post("/schedules", postSchedule);
router.get("/bookings", listBookings);

module.exports = router;
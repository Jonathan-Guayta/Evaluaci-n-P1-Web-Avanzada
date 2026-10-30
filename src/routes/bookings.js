const { Router } = require("express");
const authenticateToken = require("../middlewares/auth");
const authorizeBooking = require("../middlewares/authorizeBooking");
const controller = require("../controllers/bookingController");

const router = Router();

router.post("/", authenticateToken, controller.create);
router.get("/:id", authenticateToken, authorizeBooking, controller.getOne);
router.put("/:id", authenticateToken, authorizeBooking, controller.update);
router.delete("/:id", authenticateToken, authorizeBooking, controller.remove);

module.exports = router;
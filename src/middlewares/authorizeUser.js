const authorizeUser = (req, res, next) => {
  const isOwner = Number(req.params.id) === req.user.id;
  if (req.user.role === "ADMIN" || isOwner) return next();
  return res
    .status(403)
    .json({ error: "No puedes ver las reservas de otro usuario" });
};

module.exports = authorizeUser;
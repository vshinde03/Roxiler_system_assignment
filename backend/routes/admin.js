import express from "express";


const router = express.Router();

// Example: Admin-only route
router.get("/dashboard", verifyToken, requireRole(["Admin"]), (req, res) => {
  res.json({
    message: "Welcome to the Admin Dashboard!",
    user: req.user,
  });
});

// Example: Both Admin and Moderator can access
router.get("/manage-users", verifyToken, requireRole(["Admin", "Moderator"]), (req, res) => {
  res.json({
    message: "User management section",
    user: req.user,
  });
});

// Example: Any authenticated user can access
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "This is your profile",
    user: req.user,
  });
});

export default router;

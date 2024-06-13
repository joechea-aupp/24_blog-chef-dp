import { Router } from "express";
import protectRoute, { csrfProtection } from "../../utils/protectRoute.js";
import home from "./home.js";
import login from "./login.js";
import dashboard from "./dashboard.js";
import logOut from "./logout.js";
import moderatePost from "./moderate-post.js";
import signUpAdmin from "./signup-admin.js";
import {
  loginAdminValidation,
  signUpAdminValidation,
} from "../../utils/validation.js";

const router = Router();

router.get("/", home);
router
  .route("/login")
  .get(csrfProtection, (req, res) =>
    res.render("login", { csrfToken: req.csrfToken() }),
  )
  .post(csrfProtection, loginAdminValidation, login);

router
  .route("/signup")
  .get(csrfProtection, (req, res) =>
    res.render("signup", { csrfToken: req.csrfToken() }),
  )
  .post(csrfProtection, signUpAdminValidation, signUpAdmin);

router.get("/dashboard", protectRoute("/admin/login"), dashboard);
router.get("/logout", logOut);
router.post(
  "/moderate",
  protectRoute("/admin/login"),
  csrfProtection,
  moderatePost,
);

export default router;

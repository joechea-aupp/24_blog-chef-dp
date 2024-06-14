import { verifyUser } from "../controllers/user.js";
import { csrfSync } from "csrf-sync";

const { generateToken, csrfSynchronisedProtection } = csrfSync({
  getTokenFromRequest: (req) => {
    return req.body["_csrf"];
  },
});

const protectRoute =
  (redirectTo = "/") =>
  async (req, res, next) => {
    try {
      if (req.session.user && (await verifyUser(req.session.user.email))) {
        return next();
      }

      res.redirect(redirectTo);
    } catch {
      res.redirect(redirectTo);
    }
  };

export default protectRoute;
export { generateToken, csrfSynchronisedProtection };

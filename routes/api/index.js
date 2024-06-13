import { Router } from "express";
import getPosts from "./get-posts.js";
import storePost from "./store-post.js";
import loginUser from "./login-user.js";
import signUpUser from "./signup-user.js";
import getPost from "./get-post.js";
import deletePost from "./delete-post.js";
import catchAll from "./catch-all.js";
import protectApi from "../../utils/protectApi.js";
import verify from "./verify.js";
import {
  servePostsFromCache,
  servePostFromCache,
} from "../../controllers/redCache.js";
import {
  storePostValidation,
  loginUserValidation,
  signUpUserValidation,
  jwtValidation,
} from "../../utils/validation.js";

const router = Router();

router.get("/posts", servePostsFromCache(), getPosts);
router
  .route("/post/:postId?")
  .get(servePostFromCache(), getPost)
  .post(protectApi, storePostValidation, storePost)
  .delete(protectApi, deletePost);
router.post("/login", loginUserValidation, loginUser);
router.post("/signup", signUpUserValidation, signUpUser);
router.post("/verify", jwtValidation, verify);
router.use(catchAll);

export default router;

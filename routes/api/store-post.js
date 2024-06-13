import { createPost } from "../../controllers/post.js";
import { deleteCache } from "../../controllers/redCache.js";

export default async (req, res) => {
  try {
    const post = await createPost(req.body.post);
    deleteCache("all-posts");
    res.json({ post });
  } catch (error) {
    res.status(401).json({ error });
  }
};

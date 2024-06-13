import { getAllPosts } from "../../controllers/post.js";
import { cacheContent } from "../../controllers/redCache.js";

export default async (req, res) => {
  try {
    const posts = await getAllPosts();
    cacheContent("all-posts", posts);
    res.json({ posts });
  } catch (error) {
    res.status(404).json(error);
  }
};

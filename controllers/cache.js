import redisClient from "../cache/index.js";

export const cacheContent = async (key, content, expiry = 86400) =>
  await redisClient.set(key, JSON.stringify(content), "EX", expiry);

export const deleteCache = async (key) => {
  if (Array.isArray(key)) {
    return key.forEach(async (k) => await redisClient.del(k));
  }

  return await redisClient.del(key);
};

export const servePostsFromCache = () => async (req, res, next) => {
  try {
    let allPosts = await redisClient.get("all-posts");
    if (!allPosts) return next();

    res.json({ posts: JSON.parse(allPosts) });
  } catch (error) {
    next();
  }
};

export const servePostFromCache = () => async (req, res, next) => {
  try {
    let post = await redisClient.get(`post:${req.params.postId}`);
    if (!post) return next();
    res.json({ post: JSON.parse(post) });
  } catch (error) {
    next();
  }
};

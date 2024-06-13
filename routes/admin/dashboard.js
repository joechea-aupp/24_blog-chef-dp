import moment from "moment";
import { getFlaggedPosts } from "../../controllers/post.js";

export default async (req, res) => {
  try {
    const getPosts = await getFlaggedPosts();
    console.log(getPosts);
    res.render("dashboard", {
      user: req.session.user.name,
      lastLoggedIn: moment(req.session.user.lastLoggedIn).format(
        "MMMM Do YYYY, h:mm:ss a",
      ),
      posts: getPosts,
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    res.send("There was an error rendering the page!");
  }
};

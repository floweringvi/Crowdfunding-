// Import just the router express
const router = require('express').Router();
// Import the index.js from 'api' folder
const apiRoutes = require('./api');

// When a request is made to the /api route, it will be directed to the index.js in the 'api' folder.
router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  try {
    // TODO
    // const posts = await Post.findAll({
    //   include: [{ model: User }],
    // });

    // const postsData = posts.map((post) => post.get({ plain: true }));

    // Render the main.handlebars template
    res.render('./layouts/main.handlebars', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

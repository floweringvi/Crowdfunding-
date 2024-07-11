const router = require('express').Router();
// Import the Project model from the models folder
const { Project } = require('../../models');

//If a GET request is made to /api/projects/:id, a specific project's information will be loaded on the page.
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching project with id', req.params.id);
    const projectData = await Project.findByPk(req.params.id);

    if (!projectData) {
      res.status(404).json({ message: 'No projects found!' });
      return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// If a POST request is made to /api/projects, a new project is created. If there is an error, the function returns with a 400 error.
router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// If a DELETE request is made to /api/projects/:id, that project is deleted.
router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

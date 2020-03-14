const express = require('express');
const { param, validationResult, check } = require('express-validator');

const Team = require('../../models/Team');


const router = express.Router();

// health check
router.get('/alive', async (req, res) => {
  res.status(200)
    .send({ message: 'Hi from teams api' });
});

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    return res.status(200)
      .send({
        teams,
        message: 'Successfully retrieved all teams'
      });
  } catch (err) {
    return res.status(500)
      .send({ errorMessage: `Server side error ${err.message}` });
  }
});


router.post('/',
  [
    check('teamName', 'is required')
      .exists(),
    check('teamEmail')
      .isEmail(),
    check('teamApps', 'is required')
      .exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400)
        .json({ errors: errors.array() });
    }
    const {
      teamName, teamEmail, teamApps
    } = req.body;
    const teamPayload = {
      teamName,
      teamEmail,
      teamApps
    };
    const newTeam = Team(teamPayload);

    try {
      const existingTeam = await Team.findOne({ teamName });
      if (existingTeam) {
        return res.status(400)
          .send({ errorMessage: `Existing team found with teamName:  ${teamName}` });
      }
      const team = await newTeam.save();
      return res.status(200)
        .send({
          team,
          message: 'Team saved into db'
        });
    } catch (err) {
      return res.status(500)
        .send({ errorMessage: `Server side error ${err.message}` });
    }
  });

// @route    GET api/team/:id
// @desc     Get post by id
router.get(
  '/:id',
  [
    param('id', 'id must be a UUID')
      .matches(/^[0-9a-fA-F]{24}$/)
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400)
        .json({ errors: errors.array() });
    }
    try {
      const team = await Team.findById(req.params.id);
      if (!team) {
        return res.status(404)
          .json({ msg: 'Team not found' });
      }
      return res.status(200)
        .send(team);
    } catch (err) {
      return res.status(500)
        .send(`Server Error ${err.message}`);
    }
  }
);

// @route    DELETE api/team/:id
// @desc     Delete team by id
router.delete(
  '/:id',
  [
    param('id', 'id must be a UUID')
      .matches(/^[0-9a-fA-F]{24}$/)
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400)
        .json({ errors: errors.array() });
    }
    try {
      const team = await Team.findByIdAndDelete(req.params.id);
      if (!team) {
        return res.status(404)
          .json({ msg: 'Team not found' });
      }
      return res.status(200)
        .send(team);
    } catch (err) {
      return res.status(500)
        .send(`Server Error ${err.message}`);
    }
  }
);


module.exports = router;

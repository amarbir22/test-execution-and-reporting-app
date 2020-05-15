const express = require('express');
const { param, validationResult, check } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const dynamoDb = require('../../libs/dynamodb-lib');


const Team = require('../../models/Team');


const router = express.Router();

// health check
router.get('/alive', async (req, res) => {
  res.status(200)
    .send({ message: 'Hi from teams api' });
});

router.get('/', async (req, res) => {
  try {
    const existingTeams = await dynamoDb.query({
      TableName: process.env.TABLE_NAME,
      IndexName: 'SK-PK-index',
      KeyConditionExpression: 'SK = :sk',
      ExpressionAttributeValues: {
        ':sk': 'TEAM_INFO'
      }
    });
    return setTimeout(() => res.status(200)
      .send({
        existingTeams: existingTeams.Items,
        message: 'Successfully retrieved all teams'
      }), 0);
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
    const id = uuidv4();

    try {
      const existingTeam = await dynamoDb.query({
        TableName: process.env.TABLE_NAME,
        IndexName: 'SK-PK-index',
        KeyConditionExpression: 'SK = :sk',
        FilterExpression: 'teamName = :TeamName',
        ExpressionAttributeValues: {
          ':sk': 'TEAM_INFO',
          ':TeamName': teamName
        }
      });
      if (existingTeam.Count !== 0) {
        return res.status(400)
          .send({ errorMessage: `Existing team found with teamName:  ${teamName}` });
      }
      await dynamoDb.put({
        TableName: process.env.TABLE_NAME,
        Item: {
          PK: id,
          SK: 'TEAM_INFO',
          id,
          teamName,
          teamEmail,
          teamApps
        }
      });
      return res.status(200)
        .send({
          team: teamPayload,
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
    console.log('in team by id');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400)
        .json({ errors: errors.array(), errorMessage: `Input validation failed: ${JSON.stringify(errors)}` });
    }
    try {
      const team = await dynamoDb.get({
        TableName: process.env.TABLE_NAME,
        Key: {
          PK: { N: req.params.id },
          SK: { S: 'TEAM_INFO' }
        }
      });
      if (team.Item.length === 0) {
        return res.status(404)
          .json({ msg: 'Team not found' });
      }
      return setTimeout(() => res.status(200)
        .send(team), 0);
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

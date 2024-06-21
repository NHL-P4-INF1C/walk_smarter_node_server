const express = require('express');
const client = require('../openai/openaiClient');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/openai', async (req, res) =>
{
  try
  {
    const payload = req.body.payload;
    const pointOfInterest = payload["pointOfInterest"];
    const locationOfOrigin = payload["locationOfOrigin"];

    let description_formatted_json, question_formatted_json;

    if (payload === undefined || payload == "")
    {
      res.sendStatus(401);
    }
    if (pointOfInterest === undefined || pointOfInterest == "")
    {
      res.sendStatus(401);
    }
    if (locationOfOrigin === undefined || locationOfOrigin == "")
    {
      res.sendStatus(401);
    }

    const jsonSummaryFormat = '{ "description": "summary here" }';

    const summaryGeneration = [
      { role: 'system', content: 'You are a historian, heritage expert, historical site specialist and cultural heritage expert.' },
      { role: 'user', content: `Hello, Please provide me with a small summary of some useful knowledge about ${pointOfInterest} that is located in ${locationOfOrigin}. Format your response as a json string, So only make 1 parameter for the response NO MORE! Give me a plain json string no formatting. Format your answer like this: ` + jsonSummaryFormat }
    ];

    await client.generateResponse(summaryGeneration)
      .then(response =>
      {
        description_formatted_json = JSON.parse(response['choices'][0]['message']['content']);
      })
      .catch(error =>
      {
        console.error('Error:', error);
        res.sendStatus(418);
      });

    const jsonQuestionFormat = '{ "correct_answer": "correct answer here", "description": "description here", "question": "question here", "wrong_answer": [ "wrong answer here", "wrong answer here" ] }';

    const questionGeneration = [
      { role: 'system', content: 'You are a teacher making an exam question.' },
      { role: 'user', content: 'Give me a question with 1 correct and 2 incorrect answers based on this text: ' + description_formatted_json['description'] + ' The question must not be about the location. Format your response as a json string, So only make 1 parameter for the response NO MORE! Give me a plain json string no formatting. Format the questions like this: ' + jsonQuestionFormat }
    ];

    await client.generateResponse(questionGeneration)
      .then(response =>
      {
        question_formatted_json = JSON.parse(response['choices'][0]['message']['content']);
        question_formatted_json['description'] = description_formatted_json['description'];

        let output = {};
        output['response'] = question_formatted_json;
        res.send(JSON.stringify(output));
      })
      .catch(error =>
      {
        console.error('Error:', error);
        res.sendStatus(418);
      });

  }
  catch (error)
  {
    console.error('Error in POST /test:', error);
    res.status(500).json({ error: 'Error' });
  }
});

module.exports = router;

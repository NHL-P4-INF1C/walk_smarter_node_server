require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const { Configuration, OpenAIApi } = require("openai");

const app = express();
const PORT = process.env.PORT || 3000; // 3000 as fallback?
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GOOGLEMAPS_API_KEY = process.env.GOOGLEMAPS_API_KEY;
const DEV_ENV = process.env.DEV_ENV === "DEVELOPMENT"; // DO NOT TOUCH

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const configuration = new Configuration({
//     apiKey: OPENAI_API_KEY
// });

const openai = new OpenAIApi(configuration);

app.get('/dev_env/get_environment_variables', (req, res) => {
    if(DEV_ENV){
        res.send(JSON.stringify(process.env, null, 2));
    }
    else{
        res.sendStatus(404);
    }
})

app.post('/dev_env/openai/make_request', async (req,res) => {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
      });
      const completion = response.data.choices[0].text;
      return res.status(200).json({
        success: true,
        message: completion,
      });
})


app.get('/questions/get_question_for_location', (req, res) =>{

    // auth_key is based on users ID + last login time with some salting in between. 
    // This makes sure that no outside requests can be made
    const request_auth_key = req.query.req_auth_key;
    const longitude = req.query.longitude;
    const latitude = req.query.latitude;


    // Temp test data
    const data = {
        correct_answer: "correct answner here",
        difficulty_rating: 5,
        question: "question here",
        wrong_answer: [
          "wrong answer here",
          "wrong answer here"
        ]
      }

    res.json(data)
})


// Reference material for basic requests
app.get('/param_test', (req, res) => {
    const param = req.query.param;
    res.send(`Given parameter: ${param}`);
});
app.post('/param_test', (req, res) => {
    const { param } = req.body;

    if (param === undefined)
        res.send("No params found");
    else
        res.send(`Given parameter: ${param}`)
});

app.listen(PORT, () => {
    if(DEV_ENV)
        console.log("Detected development environment!");

    console.log(`Server is running on http://localhost:${PORT}`);
})
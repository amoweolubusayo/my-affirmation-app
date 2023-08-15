import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const imput = req.body.imput || "";
  try {
    console.log("i got in here");
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.6,
      messages: [{ role: "user", content: generateAffirmation(imput) }],
    });
    console.log("response is", response);
    const value = response.data["choices"][0]["message"]["content"].split('\n')
    res
      .status(200)
      .json({ affirmation: value[0].trim().replace(/^\d+\.\s*/, '') });
    console.log("choices -", await response.data.choices);
    console.log(
      "message -",
      await value[0].trim().replace(/^\d+\.\s*/, '')
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
}

function generateAffirmation(imput) {
  console.log("input is", imput);
  console.log("hey");
  try {
    return `${imput}`;
  } catch (error) {
    console.error(error);
  }
}

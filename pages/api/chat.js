import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  basePath: "https://api.deepseek.com/v1",
  apiKey: process.env.DEEP_KEY_API,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const imput = req.body.imput || "";
  try {
    const response = await openai.createChatCompletion({
      model: "deepseek-chat",
      messages: [{ role: "user", content: generateAffirmation(imput) }],
    });
    const value = response.data["choices"][0]["message"]["content"].split("\n");
    res.status(200).json({ affirmation: value });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
}

function generateAffirmation(imput) {
  try {
    return `${imput}`;
  } catch (error) {
    console.error(error);
  }
}

import Head from "next/head";
import React, { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [affirmation, setAffirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePromptClick = (selectedPrompt) => {
    setPrompt(selectedPrompt);
    setLoading(true);
    generateAffirmation(selectedPrompt);
  };

  const generateAffirmation = async (selectedPrompt) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imput: selectedPrompt }),
      });

      const data = await response.json();
      console.log(data.affirmation);
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setAffirmation(data.affirmation);
      setLoading(false);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>My Chat Buddy</title>
        <link rel="icon" href="/chatbot.png" />
      </Head>

      <main className="bg-blue-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4 text-center text-purple-800">
            My Chat Buddy
          </h1>
          <div className="mb-4 text-center">
            <p className="text-gray-600">
              Hi there! Busayo Amowe built this for her.
            </p>
            <p className="text-gray-600">Please select a prompt:</p>
          </div>
          <div className="space-y-4">
            <button
              className="w-full bg-pink-300 text-pink-800 py-3 rounded-md shadow-md hover:bg-pink-400 transition-colors duration-300"
              onClick={() =>
                handlePromptClick(
                  "Word of encouragment if a lady has mood swings, randomize the answer"
                )
              }
            >
              I am sad
            </button>
            <button
              className="w-full bg-purple-300 text-purple-800 py-3 rounded-md shadow-md hover:bg-purple-400 transition-colors duration-300"
              onClick={() =>
                handlePromptClick("Word of affirmation because of weight gain")
              }
            >
              Someone called me fat today
            </button>
            <button
              className="w-full bg-green-300 text-green-800 py-3 rounded-md shadow-md hover:bg-green-400 transition-colors duration-300"
              onClick={() =>
                handlePromptClick(
                  "Word of affirmation to not be hard on myself if I cannot make it to the gym, randomize the answer"
                )
              }
            >
              I was told to hit the gym, that sounded insensitive
            </button>
            <button
              className="w-full bg-blue-300 text-blue-800 py-3 rounded-md shadow-md hover:bg-blue-400 transition-colors duration-300"
              onClick={() =>
                handlePromptClick(
                  "Say something to brighten up my spirit and make me happy, randomize the answer"
                )
              }
            >
              I am not happy
            </button>
            <button
              className="w-full bg-yellow-300 text-yellow-800 py-3 rounded-md shadow-md hover:bg-yellow-400 transition-colors duration-300"
              onClick={() =>
                handlePromptClick(
                  "Say something to make me not sad even though I haven't seen my menstrual cycle when due, randomize the answer"
                )
              }
            >
              I have not seen my period this month
            </button>
          </div>
          {loading ? (
            <div className="mt-4 text-center">
              <p className="text-gray-700">Loading...</p>
            </div>
          ) : affirmation ? (
            <div className="mt-4 text-center">
              <p className="text-gray-700">{affirmation}</p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

import Head from "next/head";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [affirmation, setAffirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering

  useEffect(() => {
    setIsClient(true); // Set to true after component mounts (client-side)
  }, []);

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
        <title>Prompt Buddy</title>
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-pink-100 relative overflow-hidden">
        {/* Falling Fruits and Candy Animation (Client-Side Only) */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-fall"
                style={{
                  left: `${Math.random() * 100}vw`,
                  animationDelay: `${Math.random() * 5}s`,
                  fontSize: `${Math.random() * 20 + 20}px`,
                }}
              >
                {["🍎", "🍬", "🍇", "🍭"][Math.floor(Math.random() * 4)]}
              </div>
            ))}
          </div>
        )}

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative z-10 border-2 border-transparent animate-border-glow">
          <h1 className="text-2xl font-semibold mb-4 text-center text-purple-800 animate-bounce">
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
              className="w-full bg-gradient-to-r from-pink-300 to-pink-400 text-white py-3 rounded-md shadow-md hover:from-pink-400 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
              onClick={() =>
                handlePromptClick(
                  "Word of encouragment if a lady has mood swings, randomize the answer and sound as human as you can without starting with hey or hi or any salutation but add emojis as you wish"
                )
              }
            >
              I am sad
            </button>
            <button
              className="w-full bg-gradient-to-r from-purple-300 to-purple-400 text-white py-3 rounded-md shadow-md hover:from-purple-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
              onClick={() =>
                handlePromptClick(
                  "Word of affirmation because of weight gain and sound as human as you can without starting with hey or hi or any salutation but add emojis as you wish"
                )
              }
            >
              Someone called me fat today
            </button>
            <button
              className="w-full bg-gradient-to-r from-green-300 to-green-400 text-white py-3 rounded-md shadow-md hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
              onClick={() =>
                handlePromptClick(
                  "Word of affirmation to not be hard on myself if I cannot make it to the gym, randomize the answer and sound as human as you can without starting with hey or hi or any salutation but add emojis as you wish"
                )
              }
            >
              I was told to hit the gym, that sounded insensitive
            </button>
            <button
              className="w-full bg-gradient-to-r from-blue-300 to-blue-400 text-white py-3 rounded-md shadow-md hover:from-blue-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
              onClick={() =>
                handlePromptClick(
                  "Encouraging words to brighten up my spirit and make me happy, randomize the answer and sound as human as you can without starting with hey or hi or any salutation but add emojis as you wish"
                )
              }
            >
              I am not happy
            </button>
            <button
              className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 text-white py-3 rounded-md shadow-md hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
              onClick={() =>
                handlePromptClick(
                  "Nice words to make me not sad even though I haven't seen my menstrual cycle when due, randomize the answer and sound as human as you can without starting with hey or hi or any salutation but add emojis as you wish"
                )
              }
            >
              I have not seen my period this month
            </button>
          </div>
          {loading ? (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-800 mx-auto"></div>
              <p className="text-gray-700 mt-2">Loading...</p>
            </div>
          ) : affirmation ? (
            <div className="mt-4 text-center">
              <p className="text-gray-700 animate-fade-in">{affirmation}</p>
            </div>
          ) : null}
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }

        @keyframes border-glow {
          0% {
            border-color: rgba(99, 102, 241, 0.5);
            box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
          }
          50% {
            border-color: rgba(236, 72, 153, 0.5);
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
          }
          100% {
            border-color: rgba(99, 102, 241, 0.5);
            box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
          }
        }
        .animate-border-glow {
          animation: border-glow 3s ease infinite;
        }

        @keyframes fall {
          0% {
            transform: translateY(-10%);
            opacity: 0;
          }
          100% {
            transform: translateY(100vh);
            opacity: 1;
          }
        }
        .animate-fall {
          animation: fall 5s linear infinite;
        }
      `}</style>
    </div>
  );
}

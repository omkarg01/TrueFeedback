import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function GET(req: Request) {
  console.log("Helllo");
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.   Note: return only question no extra text";

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
    });

    // const response = await openai.completions.create({
    //   model: "gpt-3.5-turbo-instruct",
    //   max_tokens: 400,
    //   stream: true,
    //   prompt,
    // });

    // const stream = OpenAIStream(response);
    console.log(response);

    const aiResponse = response.choices[0].message

    return Response.json(
      {
        success: true,
        messages: "AI Response success",
        response: aiResponse
      },
      { status: 200 }
    );
  } catch (error) {
    // General error handling
    console.error("An unexpected error occurred:", error);
    return Response.json(
      {
        success: false,
        messages: "AI Response error",
      },
      { status: 500 }
    );
  }
}

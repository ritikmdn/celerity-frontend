import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import { SupabaseClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { supabase } from '@/lib/supabase'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const client = supabase;

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  try {
    if (
      process.env.NODE_ENV != "development" &&
      process.env.KV_REST_API_URL &&
      process.env.KV_REST_API_TOKEN
    ) {
      const ip = req.headers.get("x-forwarded-for");
      const ratelimit = new Ratelimit({
        redis: kv,
        limiter: Ratelimit.slidingWindow(500, "1 d"),
      });

      const { success, limit, reset, remaining } = await ratelimit.limit(
        `novel_ratelimit_${ip}`,
      );

      if (!success) {
        return new Response("You have reached your request limit for the day.", {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        });
      }
    }

    let { prompt: content } = await req.json();

    // remove trailing slash,
    // slice the content from the end to prioritize later characters
    content = content.replace(/\/$/, "");
    const inquiry = content;
    const topK = 3; // Specify the number of top matches you want

    const getMatchesFromEmbeddings = async (
      inquiry: string,
      client: SupabaseClient,
      topK: number
    ) => {
      const embeddings = new OpenAIEmbeddings();
  
      const store = new SupabaseVectorStore(embeddings, {
        client,
        tableName: "demo_documents",
        queryName: "match_demo_documents",
      });
      try {
        const queryResult = await store.similaritySearchWithScore(inquiry, topK);
        return (
          queryResult.map((match) => ({
            ...match
          })) || []
        );
      } catch (e) {
        console.log("Error querying embeddings: ", e);
        throw new Error(`Error querying embeddings: ${e}`);
      }
    };

    return getMatchesFromEmbeddings(inquiry, client, topK)
      .then((matches) => {
        // console.log(matches);
        let vector_response = matches[0]['0']['pageContent'] + "\n" + matches[1]['0']['pageContent'] ;

        content = "Answer the following question: \n" + content + 
                  "\n Kindly stick to the context below as the only source of information \n" + 
                  "Context: " + vector_response + "\n" + 
                  "Give concise answer. Limit to 4-5 senstences. Start each sentent in a new line. \n";

        // console.log(content);

        return openai.createChatCompletion({
          model: "gpt-3.5-turbo-16k-0613",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful AI assistant that helps the user with their request. "
              // we're disabling markdown for now until we can figure out a way to stream markdown text with proper formatting: https://github.com/steven-tey/novel/discussions/7
              // "Use Markdown formatting when appropriate.",
            },
            {
              role: "user",
              content,
            },
          ],
          temperature: 1,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stream: true,
          n: 1,
        });
      })
      .then((response) => {
        // Convert the response into a friendly text-stream
        const stream = OpenAIStream(response);

        // Respond with the stream
        return new StreamingTextResponse(stream);
      });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", { status: 500 });
  }
}

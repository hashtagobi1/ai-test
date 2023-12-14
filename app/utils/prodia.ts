import { createProdia } from "prodia";

export const prodia = createProdia({
  apiKey: "69dc2e5b-24b3-426e-952f-6a36fbd69722",
});

export const createPrompt = async (prompt: string) => {
  console.log({ prompt: `Our Prompt is ${prompt}` });
  const job = await prodia.generate({
    prompt,
    model: "v1-5-pruned-emaonly.safetensors [d7049739]",
  });

  const { imageUrl, status } = await prodia.wait(job);

  return { imageUrl, status, prompt };
};

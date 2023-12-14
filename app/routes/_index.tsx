// import type { MetaFunction } from "@remix-run/node";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Form,
  ShouldRevalidateFunctionArgs,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { createPrompt } from "../utils/prodia";
// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json(await createPrompt("puppies in a cloud, 4k"));
  return json([]);
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const name = String(body.get("prompt"));
  const data = await createPrompt(name);
  return json(data);
}

export default function Index() {
  const { status, imageUrl, prompt } = useLoaderData<typeof loader>();
  const [serverImage, setServerImage] = useState(imageUrl);
  const [serverPrompt, setServerPrompt] = useState(prompt);
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState(prompt);
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.imageUrl || actionData?.prompt) {
      setServerImage(actionData.imageUrl);
      setServerPrompt(actionData.prompt);
    }
    console.log({ actionData, serverImage });
  }, [actionData, serverImage]);

  // console.log({ actionData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col  justify-center items-center">
          <h1 className="text-5xl font-bold">AI Playground 🤖</h1>
          <p className="py-6">
            Creations beyond your wildest dreams... Enter a prompt below.
          </p>

          <Form encType="multipart/form-data" method="post">
            <label className="form-control w-full max-w-xs">
              <input
                value={inputValue}
                type="text"
                placeholder={inputValue}
                onChange={handleChange}
                name="prompt"
                className="input input-bordered w-full max-w-xs mb-3"
              />
              <div className="label">
                <span className="label-text-alt opacity-40">
                  Hint: &quot;a man in space planting a tree&quot;
                </span>
              </div>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </label>
          </Form>

          <div className="m-2 mt-20 p-4 border rounded-md">
            {navigation.state === "submitting" ||
            navigation.state === "loading" ? (
              <div className="">
                <h1 className="mb-3 font-lg italic">Submitting Request</h1>
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-4xl">Your Image</h3>
                <p className="text-slate-400 text-lg my-4">
                  Last Prompt: {serverPrompt}
                </p>
                <img src={serverImage} alt={`prompt: ${prompt}`} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

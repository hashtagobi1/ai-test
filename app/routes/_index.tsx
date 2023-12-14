// import type { MetaFunction } from "@remix-run/node";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useState } from "react";
import { createPrompt } from "../utils/prodia";
// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const body = await request.formData();
  const inputValue = String(body.get("prompt"));
  return json(await createPrompt(inputValue));
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const name = String(body.get("prompt"));
  if (name) {
    return json(await createPrompt(name));
  }

  return json({ prompt: `Woops, something went wrong` });
}

export default function Index() {
  const [inputValue, setInputValue] = useState("puppies in a cloud, 4k");
  const navigation = useNavigation();
  console.log({ navigation });

  const actionData = useActionData<typeof action>();
  console.log({ actionData });
  const { status, imageUrl, prompt } = useLoaderData<typeof loader>();

  const handleChange = (e: any) => {
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

          <Form enctype="multipart/form-data" method="post">
            <label className="form-control w-full max-w-xs">
              <input
                value={inputValue}
                onChange={handleChange}
                type="text"
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

          <div className="m-2 mt-20 p-2">
            {navigation.state === "submitting" ||
            navigation.state === "loading" ? (
              <div className="">
                <h1 className="mb-3 font-lg">Submitting Request</h1>
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-xl">Your Image</h3>
                <img src={imageUrl} alt={`prompt: ${prompt}`} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { addIdeaa } from "utils/idea.server";
import { getUser } from "utils/session.server";
import Button from "~/components/Button";
import Field from "~/components/Field";
import Nav from "~/components/Nav";

export async function loader({ request }) {
  const user = await getUser(request);
  if (!user) {
    return redirect("/");
  }

  return { user };
}

export async function action({ request }) {
  const formData = await request.formData();

  const idea = formData.get("idea");
  const describe = formData.get("describe");

  if (idea) {
    const user = await getUser(request);
    const data = {
      title: idea,
      description: describe,
      author: user.id,
    };

    const post = await addIdeaa({ data });

    if (!post) {
      return { error: "something went wrong while posting" };
    }

    return redirect("/");
  }

  return { error: "all fields are required" };
}

export default function Add() {
  const user = useLoaderData().user;

  return (
    <div className="flex gap-8 flex-col">
      <Nav user={user} />
      <Button as={Link} to="/" theme="plain" className="w-fit">
        ← Home
      </Button>
      <Form method="post" className="flex flex-col gap-2">
        <Field
          type="text"
          name="idea"
          id="idea"
          label="Idea"
          placeholder="A disnory for websites"
          required
        />
        <Field
          as="textarea"
          name="describe"
          id="describe"
          rows="10"
          label="Describe your idea (optional)"
          placeholder="Never gonna let you downn"
        />
        <Button className="w-fit">Submit</Button>
      </Form>
    </div>
  );
}

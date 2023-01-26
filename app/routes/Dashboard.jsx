import { redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getUserId } from "utils/session.server";
import { getUserById, updateUser } from "utils/user.server";
import Button from "~/components/Button";
import Field from "~/components/Field";
import IdeaCard from "~/components/IdeaCard";
import Nav from "../components/Nav";

export async function loader({ request }) {
  const userID = await getUserId(request);
  if (!userID) {
    return redirect("/");
  }
  const user = await getUserById(userID);

  return { user };
}

export async function action({ request }) {
  const formData = await request.formData();

  const name = formData.get("name");
  const about = formData.get("about");

  const id = await getUserId(request);

  if (id && name && about) {
    const data = {
      name,
      about,
    };
    const user = await updateUser({ id, data });

    if (user) {
      return { user, success: "Saved!!" };
    }
    return { error: "Something went wrong!" };
  }

  return { error: "All feilds are required" };
}

export default function Dashboard() {
  const { user } = useLoaderData();
  const actionData = useActionData();
  const [isIdeaasPage, setIdeaasPage] = useState(true);

  return (
    <div className="flex gap-8 flex-col">
      <Nav user={user} />
      <div className="flex gap-4">
        <Button
          theme={isIdeaasPage ? "monochrome" : "white"}
          onClick={() => setIdeaasPage(true)}
        >
          Ideaas
        </Button>
        <Button
          theme={isIdeaasPage ? "white" : "monochrome"}
          onClick={() => setIdeaasPage(false)}
        >
          Profile
        </Button>
      </div>

      {isIdeaasPage ? (
        <>
          {user.ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </>
      ) : (
        <Form method="post" className="flex flex-col gap-2" replace>
          <Field
            type="text"
            name="name"
            id="name"
            label="Name"
            placeholder="Jhon Doe"
            defaultValue={user.name}
            required
          />
          <Field
            as="textarea"
            name="about"
            id="about"
            rows="3"
            maxLength={100}
            label="Bio"
            defaultValue={user.about}
            placeholder="🤔 Thinking about a cool bio..."
          />
          <Field type="hidden" name="action" value="updateUser" />
          {actionData?.error && (
            <p className="text-red-600 font-medium">{actionData?.error}</p>
          )}
          {actionData?.success && (
            <p className="text-green-800 font-medium">{actionData?.success}</p>
          )}
          <Button className="w-fit">Save</Button>
        </Form>
      )}

      <div></div>
    </div>
  );
}

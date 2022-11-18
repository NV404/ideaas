import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "utils/session.server";
import { getUserById } from "utils/user.server";
import Button from "~/components/Button";
import IdeaCard from "~/components/IdeaCard";
import Nav from "~/components/Nav";

export async function loader({ request, params }) {
  const user = await getUser(request);
  const id = params.id;
  const profile = await getUserById(id);

  return { user, profile };
}

export default function Idea() {
  const { user, profile } = useLoaderData();

  return (
    <div className="flex gap-8 flex-col">
      <Nav user={user} />
      <Button as={Link} to="/" theme="plain" className="w-fit">
        ← Home
      </Button>
      <div className="flex items-center gap-5">
        <img
          width={100}
          src={`https://source.boringavatars.com/marble/120/${profile.name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
        />
        <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl">
          {profile.name}
        </h1>
      </div>

      <h1 className="font-display text-center font-semibold text-3xl sm:text-2xl md:text-3xl leading-tight">
        👇 Ideaas 👇
      </h1>
      <div className="flex flex-col gap-3 items-center">
        {profile.ideas.map((idea) => (
          <IdeaCard idea={idea} />
        ))}
      </div>
    </div>
  );
}

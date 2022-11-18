import { Link, useLoaderData } from "@remix-run/react";
import { getIdeaas } from "utils/idea.server";
import { getUser } from "utils/session.server";
import IdeaCard from "~/components/IdeaCard";
import Nav from "~/components/Nav";

export async function loader({ request }) {
  const user = await getUser(request);
  const ideas = await getIdeaas();

  return { user, ideas };
}

export default function Index() {
  const { user, ideas } = useLoaderData();

  return (
    <div className="flex gap-8 flex-col">
      <div
        className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
            h-full
            bg-[url('https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg?w=1380&t=st=1668511000~exp=1668511600~hmac=8f2a496092190e1eaafb9c4f413808d43490f39c70b5390c7638340725694897')]
            bg-no-repeat
            bg-top
            opacity-25
            blur-3xl
            -z-10
          "
      ></div>
      <Nav user={user} />

      <div className="flex flex-col items-center justify-start gap-2 text-center">
        <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl">
          Too lazy to build an idea share with us.
        </h1>
        <div className="relative rounded-lg border-black border-2 mt-2 p-3">
          <div className="absolute -top-5 bg-white bg-gradient-to-r from-green-400 to-blue-500 py-1 px-3 rounded-full">
            <p className="text-white">Coming soon</p>
          </div>
          <p className="font-medium max-w-2xl md:text-lg text-neutral-600">
            Have more than an idea, such as an MVP or a case study, it is time
            to make some money by selling to others.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <p className="font-bold text-xl text-center">👇 Expolre 👇</p>
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>

      <p className="text-center font-bold">
        Build with ♥ by{" "}
        <a className="underline" href="https://github.com/nv404">
          naman
        </a>
      </p>
    </div>
  );
}

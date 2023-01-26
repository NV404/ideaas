import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { getUser } from "utils/session.server";
import { getUserById } from "utils/user.server";
import Button from "~/components/Button";
import Dropdown from "~/components/Dropdown";
import Field from "~/components/Field";
import IdeaCard from "~/components/IdeaCard";
import Nav from "~/components/Nav";

export async function loader({ request, params }) {
  const user = await getUser(request);
  const id = params.id;
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const query = searchParams.get("sort");
  var sort = query;
  var profile;

  if (query) {
    profile = await getUserById(id);
  } else {
    sort = "relevant";
    profile = await getUserById(id);
  }

  return { user, profile, sort };
}

export default function Idea() {
  const { user, profile, sort } = useLoaderData();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const sortOption = [
    {
      value: "relevant",
      label: "Relevant",
    },
    {
      value: "latest",
      label: "Latest",
    },
  ];

  return (
    <div className="flex gap-8 flex-col">
      <Nav user={user} />
      <Button onClick={goBack} theme="plain" className="w-fit">
        ← Back
      </Button>
      <div className="flex items-center gap-5">
        <img
          width={100}
          src={`https://source.boringavatars.com/marble/120/${profile.name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
        />
        <div>
          <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl">
            {profile.name}
          </h1>
          <p className="">{profile.about}</p>
        </div>
      </div>

      {profile.ideas.length === 0 ? (
        <p className="text-center font-semibold">User have no Ideaas</p>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <div className="flex justify-between items-center w-full ">
            <p className="font-bold text-xl text-center">Explore</p>
            <Field
              as={Dropdown}
              id="color"
              name="color"
              className="px-0 py-0 w-fit"
              options={sortOption}
              value={sort}
            />
          </div>
          {profile.ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
}

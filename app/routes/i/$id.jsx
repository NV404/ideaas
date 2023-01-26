import {
  Form,
  Link,
  useLoaderData,
  useNavigate,
  useTransition,
} from "@remix-run/react";
import {
  addDiscussion,
  addSubDiscussion,
  dislikeDiscussionIdea,
  dislikeIdea,
  getIdeaById,
  likeDiscussionIdea,
  likeIdea,
} from "utils/idea.server";
import { getUser } from "utils/session.server";
import Button from "~/components/Button";
import DiscussionCard from "~/components/DiscussionCard";
import Field from "~/components/Field";
import Nav from "~/components/Nav";

export async function loader({ request, params }) {
  const user = await getUser(request);
  const id = params.id;
  const idea = await getIdeaById(id);

  return { user, idea };
}

export async function action({ request }) {
  const formData = await request.formData();

  const id = formData.get("id");
  const discussion = formData.get("discussion");
  const action = formData.get("action");

  if (action) {
    if (action === "like") {
      const like = await likeIdea({ id, request });
      if (!like) {
        return { error: "something went wrong liking post" };
      }
      return { data: "success" };
    }

    if (action === "discussion_like") {
      const discussion_like = await likeDiscussionIdea({ id, request });
      if (!discussion_like) {
        return { error: "something went wrong liking post" };
      }
      return { data: "success" };
    }

    if (action === "dislike") {
      const dislike = await dislikeIdea({ id, request });
      if (!dislike) {
        return { error: "something went wrong unLiking post" };
      }
      return { data: "success" };
    }

    if (action === "discussion_dislike") {
      const discussion_dislike = await dislikeDiscussionIdea({ id, request });
      if (!discussion_dislike) {
        return { error: "something went wrong unLiking post" };
      }
      return { data: "success" };
    }

    if (action === "discussion") {
      const discuss = await addDiscussion({ id, discussion, request });
      if (!discuss) {
        return { error: "something went wrong while posting discussion" };
      }
      return { data: "success" };
    }

    if (action === "sub_discussion") {
      const discuss = await addSubDiscussion({ id, discussion, request });
      if (!discuss) {
        return { error: "something went wrong while posting discussion" };
      }
      return { data: "success" };
    }
  }

  return { error: "Action not found" };
}

export default function Idea() {
  const { user, idea } = useLoaderData();
  const transition = useTransition();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  function isLiked(id) {
    const obj = idea.likes.find((x) => x.userId === id);
    if (obj) {
      return true;
    }
    return false;
  }

  return (
    <div className="flex gap-8 flex-col">
      <Nav user={user} />
      <Button onClick={goBack} theme="plain" className="w-fit">
        ← Back
      </Button>

      <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight">
        {idea.title}
      </h1>
      <Form method="post" replace>
        <input type="hidden" name="id" value={idea?.id} />
        <input
          type="hidden"
          name="action"
          value={isLiked(user?.id) ? "dislike" : "like"}
        />
        <Button
          disabled={
            transition.state === "loading" || transition.state === "submitting"
          }
          as={!user ? Link : "button"}
          to="/login"
          theme="none"
          className={`flex justify-center items-center rounded-lg w-fit bg-white py-2 px-4 gap-2 cursor-pointer ${
            isLiked(user?.id)
              ? "hover:text-black  text-blue-500"
              : "text-black  hover:text-blue-500"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M23.873 9.81c.086-.251.127-.508.127-.763 0-.77-.379-1.514-1.055-1.982-2.152-1.492-1.868-1.117-2.68-3.544-.339-1.014-1.321-1.7-2.429-1.696-2.654.008-2.193.153-4.335-1.354-.446-.314-.974-.471-1.501-.471s-1.055.157-1.502.471c-2.154 1.515-1.687 1.362-4.335 1.354-1.107-.003-2.09.683-2.429 1.696-.812 2.433-.533 2.055-2.68 3.544-.675.469-1.054 1.212-1.054 1.982 0 .255.041.512.127.763.83 2.428.827 1.963 0 4.38-.086.251-.127.509-.127.763 0 .77.379 1.514 1.055 1.982 2.147 1.489 1.869 1.114 2.68 3.544.339 1.014 1.321 1.7 2.429 1.696 2.654-.009 2.193-.152 4.335 1.354.446.314.974.471 1.501.471s1.055-.157 1.502-.471c2.141-1.506 1.681-1.362 4.335-1.354 1.107.003 2.09-.683 2.429-1.696.812-2.428.528-2.053 2.68-3.544.675-.468 1.054-1.212 1.054-1.982 0-.254-.041-.512-.127-.763-.831-2.427-.827-1.963 0-4.38zm-7.565 1.984c.418.056.63.328.63.61 0 .323-.277.66-.844.705-.348.027-.434.312-.016.406.351.08.549.326.549.591 0 .314-.279.654-.913.771-.383.07-.421.445-.016.477.344.026.479.146.479.312 0 .466-.826 1.333-2.426 1.333-2.501.001-3.407-1.499-6.751-1.499v-4.964c1.766-.271 3.484-.817 4.344-3.802.239-.831.39-1.734 1.187-1.734 1.188 0 1.297 2.562.844 4.391.656.344 1.875.468 2.489.442.886-.036 1.136.409 1.136.745 0 .505-.416.675-.677.755-.304.094-.444.404-.015.461z" />
          </svg>
          <p>{idea.likes.length}</p>
        </Button>
      </Form>
      <div className="flex justify-between gap-2">
        <Link className="flex gap-2" to={`/u/${idea.user.id}`}>
          <img
            width={20}
            src={`https://source.boringavatars.com/marble/120/${idea.user.name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
          />
          <p className="font-medium">{idea.user.name}</p>
        </Link>
        <p className="text-right text-neutral-400">
          {new Date(idea.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div>{idea.description}</div>
      <h1 className="font-display font-semibold text-3xl sm:text-2xl md:text-3xl leading-tight max-w-2xl">
        Discussions
      </h1>
      <Form method="post" className="flex flex-col gap-2" replace>
        <Field
          disabled={
            transition.state === "loading" || transition.state === "submitting"
          }
          as="textarea"
          name="discussion"
          id="discussion"
          label="Have any thought in mind?"
          placeholder="Never gonna give youu uppp"
          required
        />
        <input type="hidden" name="id" value={idea.id} />
        <input type="hidden" name="action" value="discussion" />
        <Button
          disabled={
            transition.state === "loading" || transition.state === "submitting"
          }
          as={!user ? Link : "button"}
          to="/login"
          className="w-fit"
        >
          Submit
        </Button>
      </Form>

      {idea.discussion.map((discussion) => (
        <DiscussionCard
          key={discussion.id}
          user={user}
          discussion={discussion}
        />
      ))}

      <p className="text-center font-semibold">The End</p>
    </div>
  );
}

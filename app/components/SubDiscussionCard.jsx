import { Form, Link, useTransition } from "@remix-run/react";

export default function SubDiscussionCard({ subDiscussion }) {
  return (
    <div className="bg-blue-100 rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <Link className="flex gap-2" to={`/u/${subDiscussion.user.id}`}>
          <img
            width={20}
            src={`https://source.boringavatars.com/marble/120/${subDiscussion.user.name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
          />
          <p className="font-medium">{subDiscussion.user.name}</p>
        </Link>
        <p className="text-right text-neutral-400">
          {new Date(subDiscussion.createdAt).toLocaleDateString()}
        </p>
      </div>
      <p>{subDiscussion.content}</p>
    </div>
  );
}

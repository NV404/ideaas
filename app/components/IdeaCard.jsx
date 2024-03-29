import { Link } from "@remix-run/react";

export default function IdeaCard({ idea }) {
  return (
    <Link
      to={`/i/${idea.id}`}
      className="flex items-center gap-4 bg-white rounded-2xl w-full p-4 cursor-pointer hover:bg-white/60"
    >
      <div className="flex flex-col justify-center items-center border-r-2 pr-4 border-black/30">
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
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <p className="text-lg font-bold">{idea.title}</p>
        <p>
          {idea.discussion.length} Discussion{idea.discussion.length > 1 && "s"}
        </p>
        <div className="flex items-center gap-2">
          <img
            width={20}
            src={`https://source.boringavatars.com/marble/120/${idea.user.name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
          />
          <p className="font-medium">{idea.user.name}</p>
          <p className="flex-grow text-right text-neutral-400">
            {new Date(idea.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
}

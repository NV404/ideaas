import { Link } from "@remix-run/react";
import Button from "./Button";

export default function Nav({ user }) {
  return (
    <nav className="flex flex-row pt-7 items-center justify-between gap-4">
      <Link to="/" className="flex flex-row items-center justify-start gap-2">
        <img src="/logo.svg" alt="logo" width={32} height={32} />
        <p className="leading-none font-display font-medium text-xl">Ideaas</p>
      </Link>
      <div className="flex-grow" />
      {user ? (
        <>
          <Button as={Link} to="/add">
            Post
          </Button>
          <Link to={`/u/${user.id}`}>
            <img
              width={32}
              src={`https://source.boringavatars.com/marble/120/${user.name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
            />
          </Link>
        </>
      ) : (
        <>
          <Button as={Link} to="/Register">
            Join
          </Button>
          <Button as={Link} to="/login" theme="plain">
            Login
          </Button>
        </>
      )}
    </nav>
  );
}

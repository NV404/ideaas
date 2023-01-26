import { Menu } from "@headlessui/react";
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
          <Menu>
            <div className="relative">
              <Menu.Button>
                <img
                  width={32}
                  src={`https://source.boringavatars.com/marble/120/${user.name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
                />
                <Menu.Items className="-left-full -translate-x-2/4 py-2 flex flex-col items-start absolute z-10 w-fit mt-2 bg-white border border-neutral-200 rounded-md focus:outline-none">
                  <Menu.Item className="py-1 px-4 w-full text-left">
                    {({ active }) => (
                      <Link
                        className="hover:text-black/70"
                        to={`/u/${user.id}`}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item className="py-1 px-4">
                    {({ active }) => (
                      <Link className="hover:text-black/70" to={`/dashboard`}>
                        Dashboard
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu.Button>
            </div>
          </Menu>
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

const {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useTransition,
} = require("@remix-run/react");
import styles from "./styles/app.css";
import NProgress from "nprogress";
import nProgressStyles from "./styles/nprogress.css";
import { useEffect } from "react";
// import { Analytics } from "@vercel/analytics/react";

export const meta = () => ({
  charset: "utf-8",
  title: "Ideaas",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      href: "/logo.svg",
    },
    { rel: "stylesheet", href: styles },
    {
      rel: "stylesheet",
      href: "https://api.fontshare.com/v2/css?f[]=archivo@1,2&f[]=clash-display@600&display=swap%22",
    },
    { rel: "stylesheet", href: nProgressStyles },
  ];
}

export default function App() {
  let transition = useTransition();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    if (transition.state !== "idle") {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [transition.state]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-blue-100">
        <div className="w-[min(1080px,_100%)] h-full mx-auto pb-6 px-5">
          <Outlet />
        </div>
        {/* <Analytics /> */}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

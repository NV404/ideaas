import { redirect } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import { createUserSession, getUserId, login } from "utils/session.server";
import Button from "~/components/Button";
import Field from "~/components/Field";

export async function loader({ request }) {
  const userId = await getUserId(request);
  if (userId) {
    return redirect("/");
  }
  return {};
}

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  if (email && password) {
    const user = await login({ email, password });
    if (!user) {
      return { error: "Incorrect email or password" };
    }
    return createUserSession(user.id, "/");
  }

  return { error: "all fields are required" };
}

export default function Login() {
  const transition = useTransition();
  const data = useActionData();

  return (
    <div className="flex h-screen w-full items-center justify-center flex-col">
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

      <div className="w-full flex items-center flex-col gap-1">
        <Link to="/" className="font-semibold w-full max-w-2xl hover:underline">
          ← Go to home
        </Link>
        <Form
          method="post"
          className="flex flex-col items-center gap-4 bg-white rounded-2xl w-full max-w-2xl py-8 px-4 md:px-28"
        >
          <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl text-center w-full">
            Login
          </h1>
          <Field
            widthFull={true}
            className="w-full"
            type="email"
            name="email"
            id="email"
            label="Email"
            placeholder="Eg. example@email.com"
            required
          />
          <Field
            widthFull={true}
            type="password"
            name="password"
            id="password"
            label="Password"
            placeholder="********"
            required
          />
          {data?.error && (
            <p className="text-red-600 font-medium">{data?.error}</p>
          )}
          <Button
            disabled={
              transition.state === "loading" ||
              transition.state === "submitting"
            }
            type="submit"
            className="w-full"
          >
            Login
          </Button>
          <Link to="/register" className="hover:underline">
            Don't have a account?{" "}
            <span className="font-medium">Register here</span>
          </Link>
        </Form>
      </div>
    </div>
  );
}

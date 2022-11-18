import { redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { db } from "utils/db.server";
import { createUserSession, getUserId, register } from "utils/session.server";
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
  const name = formData.get("name");
  const password = formData.get("password");
  const re_pass = formData.get("re-pass");

  if (email && re_pass && name && password) {
    const userExists = await db.user.findFirst({
      where: { email },
    });
    if (userExists) {
      return { error: `User with email ${email} already exists` };
    }

    if (password.length < 8) {
      return { error: "password should be atleast 8 charaters long" };
    }

    if (password !== re_pass) {
      return { error: "password & repeat-Password does not match" };
    }

    const user = await register({ email, name, password });
    if (!user) {
      return { error: "something went wrong while creating user" };
    }
    return createUserSession(user.id, "/");
  }

  return { error: "all fields are required" };
}

export default function Register() {
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
            Register
          </h1>
          <Field
            type="email"
            name="email"
            id="email"
            label="Email"
            placeholder="Eg. example@email.com"
            required
          />
          <Field
            type="text"
            name="name"
            id="name"
            label="Name"
            placeholder="Eg. naman vyas"
            required
          />
          <Field
            type="password"
            name="password"
            id="password"
            label="Password"
            placeholder="********"
            required
          />
          <Field
            type="password"
            name="re-pass"
            id="re-pass"
            label="Repeat-Password"
            placeholder="********"
            required
          />
          {data?.error && (
            <p className="text-red-600 font-medium">{data?.error}</p>
          )}
          <Button type="submit" className="w-full">
            Register
          </Button>
          <Link to="/login" className="hover:underline">
            Have a account? <span className="font-medium">Login here</span>
          </Link>
        </Form>
      </div>
    </div>
  );
}

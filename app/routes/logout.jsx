import { logout } from "utils/session.server";

export async function loader({ request }) {
  return logout(request);
}

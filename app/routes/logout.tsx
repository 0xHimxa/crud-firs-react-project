import { destroySession, getSession } from "~/config/session";
import type { Route } from "./+types/login";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  console.log("in me mee");
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export default function LogOut() {
  return null;
}

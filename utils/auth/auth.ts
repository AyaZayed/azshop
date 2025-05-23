import { loginLink } from "@/lib/constants";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function auth() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const loggedIn = await isAuthenticated();
  const userId = user ? user.id : null;

  if (!user) redirect(loginLink);

  return { user, loggedIn, userId };
}

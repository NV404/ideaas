import { db } from "./db.server";

export async function getUserById(id) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      ideas: {
        include: { likes: true, discussion: true, user: true },
      },
    },
  });
  return user;
}

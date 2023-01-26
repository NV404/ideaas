import { db } from "./db.server";

export async function getUserById(id, sort) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      ideas: {
        include: { likes: true, discussion: true, user: true },
        ...(sort === "latest"
          ? {
              orderBy: {
                createdAt: "desc",
              },
            }
          : {}),
      },
    },
  });

  delete user.passwordHash;

  return user;
}

export async function updateUser({ id, data }) {
  const user = await db.user.update({
    where: {
      id,
    },
    data,
  });

  return user;
}

export async function updatePost({ id, postId, data }) {
  const user = await db.user.update({
    where: {
      id,
    },
    data: {
      ideas: {
        where: {
          id: postId,
        },
        data,
      },
    },
  });

  return user;
}

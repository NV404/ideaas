import { db } from "./db.server";
import { getUserId } from "./session.server";

export async function addIdeaa({ data }) {
  const idea = await db.idea.create({
    data,
  });

  return idea;
}

export async function getIdeaas() {
  const ideas = await db.idea.findMany({
    include: {
      likes: true,
      discussion: true,
      user: true,
    },
  });
  return ideas;
}

export async function getIdeaById(id) {
  const idea = await db.idea.findUnique({
    where: {
      id,
    },
    include: {
      likes: true,
      discussion: {
        include: {
          user: true,
          likes: true,
        },
      },
      user: true,
    },
  });
  return idea;
}

export async function likeIdea({ id, request }) {
  const userId = await getUserId(request);

  const like = await db.idea_like.create({
    data: {
      ideaId: id,
      userId: userId,
    },
  });

  return like;
}

export async function likeDiscussionIdea({ id, request }) {
  const userId = await getUserId(request);

  const like = await db.discussion_like.create({
    data: {
      discussionId: id,
      userId: userId,
    },
  });

  return like;
}

export async function dislikeIdea({ id, request }) {
  const userId = await getUserId(request);

  const idea = await db.idea.findUnique({
    where: {
      id: id,
    },
    include: {
      likes: true,
    },
  });

  const likeId = idea.likes.find((x) => x.userId === userId);

  const like = await db.idea_like.delete({
    where: {
      id: likeId.id,
    },
  });

  return like;
}

export async function dislikeDiscussionIdea({ id, request }) {
  const userId = await getUserId(request);

  const idea = await db.idea_discussion.findUnique({
    where: {
      id: id,
    },
    include: {
      likes: true,
    },
  });

  const likeId = idea.likes.find((x) => x.userId === userId);

  const like = await db.discussion_like.delete({
    where: {
      id: likeId.id,
    },
  });

  return like;
}

export async function addDiscussion({ id, discussion, request }) {
  const userId = await getUserId(request);

  const postDiscussion = await db.idea_discussion.create({
    data: {
      discussion,
      ideaId: id,
      userId,
    },
  });

  return postDiscussion;
}

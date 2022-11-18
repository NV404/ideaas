-- CreateTable
CREATE TABLE "Discussion_like" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "discussionId" STRING NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "Discussion_like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Discussion_like" ADD CONSTRAINT "Discussion_like_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "Idea_discussion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion_like" ADD CONSTRAINT "Discussion_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

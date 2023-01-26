-- CreateTable
CREATE TABLE "Sub_discussion" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" STRING NOT NULL,
    "discussionId" STRING NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "Sub_discussion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sub_discussion" ADD CONSTRAINT "Sub_discussion_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "Idea_discussion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sub_discussion" ADD CONSTRAINT "Sub_discussion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

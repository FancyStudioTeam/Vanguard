/*
  Warnings:

  - You are about to drop the `GuildTicketsConfig` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GuildTicketPanel" DROP CONSTRAINT "GuildTicketPanel_guildId_fkey";

-- DropTable
DROP TABLE "GuildTicketsConfig";

-- CreateTable
CREATE TABLE "GuildTicketsConfiguration" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "guildId" VARCHAR(19) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuildTicketsConfiguration_pkey" PRIMARY KEY ("guildId")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuildTicketsConfiguration_guildId_key" ON "GuildTicketsConfiguration"("guildId");

-- AddForeignKey
ALTER TABLE "GuildTicketPanel" ADD CONSTRAINT "GuildTicketPanel_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "GuildTicketsConfiguration"("guildId") ON DELETE CASCADE ON UPDATE CASCADE;

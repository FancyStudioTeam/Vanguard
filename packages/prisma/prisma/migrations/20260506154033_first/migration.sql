-- CreateEnum
CREATE TYPE "GuildTicketPanelType" AS ENUM ('Text', 'Voice');

-- CreateTable
CREATE TABLE "GuildTicketsConfig" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "id" VARCHAR(19) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuildTicketsConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildTicketPanel" (
    "channelId" VARCHAR(19) NOT NULL,
    "channelParentId" VARCHAR(19),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "id" VARCHAR(19) NOT NULL,
    "guildId" VARCHAR(19) NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "type" "GuildTicketPanelType" NOT NULL DEFAULT 'Text',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuildTicketPanel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuildTicketsConfig_id_key" ON "GuildTicketsConfig"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GuildTicketPanel_id_key" ON "GuildTicketPanel"("id");

-- AddForeignKey
ALTER TABLE "GuildTicketPanel" ADD CONSTRAINT "GuildTicketPanel_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "GuildTicketsConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

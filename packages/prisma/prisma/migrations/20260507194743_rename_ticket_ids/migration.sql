/*
  Warnings:

  - The primary key for the `GuildTicketPanel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GuildTicketPanel` table. All the data in the column will be lost.
  - The primary key for the `GuildTicketsConfig` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GuildTicketsConfig` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[panelId]` on the table `GuildTicketPanel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guildId]` on the table `GuildTicketsConfig` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `panelId` to the `GuildTicketPanel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `GuildTicketsConfig` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GuildTicketPanel" DROP CONSTRAINT "GuildTicketPanel_guildId_fkey";

-- DropIndex
DROP INDEX "GuildTicketPanel_id_key";

-- DropIndex
DROP INDEX "GuildTicketsConfig_id_key";

-- AlterTable
ALTER TABLE "GuildTicketPanel" DROP CONSTRAINT "GuildTicketPanel_pkey",
DROP COLUMN "id",
ADD COLUMN     "panelId" VARCHAR(19) NOT NULL,
ADD CONSTRAINT "GuildTicketPanel_pkey" PRIMARY KEY ("panelId");

-- AlterTable
ALTER TABLE "GuildTicketsConfig" DROP CONSTRAINT "GuildTicketsConfig_pkey",
DROP COLUMN "id",
ADD COLUMN     "guildId" VARCHAR(19) NOT NULL,
ADD CONSTRAINT "GuildTicketsConfig_pkey" PRIMARY KEY ("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "GuildTicketPanel_panelId_key" ON "GuildTicketPanel"("panelId");

-- CreateIndex
CREATE UNIQUE INDEX "GuildTicketsConfig_guildId_key" ON "GuildTicketsConfig"("guildId");

-- AddForeignKey
ALTER TABLE "GuildTicketPanel" ADD CONSTRAINT "GuildTicketPanel_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "GuildTicketsConfig"("guildId") ON DELETE CASCADE ON UPDATE CASCADE;

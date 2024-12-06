-- CreateEnum
CREATE TYPE "ConfigValueType" AS ENUM ('STRING');

-- CreateTable
CREATE TABLE "Config" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ConfigValueType" NOT NULL,
    "value" TEXT,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

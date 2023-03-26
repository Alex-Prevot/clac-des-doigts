-- CreateTable
CREATE TABLE "Farmyard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Farmyard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chicken" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3),
    "weight" INTEGER NOT NULL,
    "steps" INTEGER DEFAULT 0,
    "isRunning" BOOLEAN DEFAULT false,
    "farmyardId" INTEGER,

    CONSTRAINT "Chicken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chicken" ADD CONSTRAINT "Chicken_farmyardId_fkey" FOREIGN KEY ("farmyardId") REFERENCES "Farmyard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

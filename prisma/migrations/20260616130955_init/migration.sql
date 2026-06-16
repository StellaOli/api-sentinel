-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."monitors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "interval" INTEGER NOT NULL,
    "expectedStatus" INTEGER NOT NULL DEFAULT 200,
    "currentStatus" BOOLEAN NOT NULL DEFAULT true,
    "lastCheckedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."monitor_checks" (
    "id" TEXT NOT NULL,
    "monitorId" TEXT NOT NULL,
    "statusCode" INTEGER,
    "responseTime" INTEGER,
    "isOnline" BOOLEAN NOT NULL,
    "errorMessage" TEXT,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "monitor_checks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "monitors_userId_idx" ON "public"."monitors"("userId");

-- CreateIndex
CREATE INDEX "monitors_currentStatus_idx" ON "public"."monitors"("currentStatus");

-- CreateIndex
CREATE INDEX "monitor_checks_monitorId_idx" ON "public"."monitor_checks"("monitorId");

-- CreateIndex
CREATE INDEX "monitor_checks_checkedAt_idx" ON "public"."monitor_checks"("checkedAt");

-- AddForeignKey
ALTER TABLE "public"."monitors" ADD CONSTRAINT "monitors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."monitor_checks" ADD CONSTRAINT "monitor_checks_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "public"."monitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

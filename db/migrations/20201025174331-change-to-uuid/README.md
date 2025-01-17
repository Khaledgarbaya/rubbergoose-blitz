# Migration `20201025174331-change-to-uuid`

This migration has been generated by Khaled Garbaya at 10/25/2020, 6:43:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL DEFAULT 0,
    "stripe_price_id" TEXT NOT NULL,
PRIMARY KEY ("id")
);
INSERT INTO "new_Course" ("id", "createdAt", "updatedAt", "title", "slug", "description", "price", "stripe_price_id") SELECT "id", "createdAt", "updatedAt", "title", "slug", "description", "price", "stripe_price_id" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course.slug_unique" ON "Course"("slug");
CREATE UNIQUE INDEX "Course.stripe_price_id_unique" ON "Course"("stripe_price_id");
CREATE TABLE "new_CourseMembership" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    "courseId" TEXT,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE,
PRIMARY KEY ("id")
);
INSERT INTO "new_CourseMembership" ("id", "createdAt", "updatedAt", "userId", "courseId") SELECT "id", "createdAt", "updatedAt", "userId", "courseId" FROM "CourseMembership";
DROP TABLE "CourseMembership";
ALTER TABLE "new_CourseMembership" RENAME TO "CourseMembership";
CREATE TABLE "new_Lesson" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT,
    "courseId" TEXT,
    "slug" TEXT NOT NULL,

    FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE,
PRIMARY KEY ("id")
);
INSERT INTO "new_Lesson" ("id", "createdAt", "updatedAt", "title", "description", "videoUrl", "courseId", "slug") SELECT "id", "createdAt", "updatedAt", "title", "description", "videoUrl", "courseId", "slug" FROM "Lesson";
DROP TABLE "Lesson";
ALTER TABLE "new_Lesson" RENAME TO "Lesson";
CREATE UNIQUE INDEX "Lesson.slug_unique" ON "Lesson"("slug");
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME,
    "handle" TEXT NOT NULL,
    "userId" TEXT,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE,
PRIMARY KEY ("id")
);
INSERT INTO "new_Session" ("id", "createdAt", "updatedAt", "expiresAt", "handle", "userId", "hashedSessionToken", "antiCSRFToken", "publicData", "privateData") SELECT "id", "createdAt", "updatedAt", "expiresAt", "handle", "userId", "hashedSessionToken", "antiCSRFToken", "publicData", "privateData" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session.handle_unique" ON "Session"("handle");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
PRIMARY KEY ("id")
);
INSERT INTO "new_User" ("id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role") SELECT "id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201020164937-make-stripe-price-id-uniq..20201025174331-change-to-uuid
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = ["sqlite", "postgres"]
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -12,9 +12,9 @@
 // --------------------------------------
 model User {
-  id                Int       @default(autoincrement()) @id
+  id                String    @id @default(uuid())
   createdAt         DateTime  @default(now())
   updatedAt         DateTime  @updatedAt
   name              String?
   email             String    @unique
@@ -24,23 +24,23 @@
   courseMemberships CourseMembership[]
 }
 model Session {
-  id                 Int       @default(autoincrement()) @id
+  id                String    @id @default(uuid())
   createdAt          DateTime  @default(now())
   updatedAt          DateTime  @updatedAt
   expiresAt          DateTime?
   handle             String    @unique
   user               User?     @relation(fields: [userId], references: [id])
-  userId             Int?
+  userId             String?
   hashedSessionToken String?
   antiCSRFToken      String?
   publicData         String?
   privateData        String?
 }
 model Course {
-  id                 Int       @default(autoincrement()) @id
+  id                  String    @id @default(uuid())
   createdAt          DateTime  @default(now())
   updatedAt          DateTime  @updatedAt
   title              String
   slug               String    @unique
@@ -50,24 +50,24 @@
   stripe_price_id    String    @unique
 }
 model Lesson {
-  id                 Int       @default(autoincrement()) @id
+  id                String    @id @default(uuid())
   createdAt          DateTime  @default(now())
   updatedAt          DateTime  @updatedAt
   title              String
   description        String?
   videoUrl           String?
   course             Course?   @relation(fields: [courseId], references: [id])
-  courseId           Int?
+  courseId           String?
   slug               String    @unique
 }
 model CourseMembership {
-  id                 Int       @default(autoincrement()) @id
+  id                String    @id @default(uuid())
   createdAt          DateTime  @default(now())
   updatedAt          DateTime  @updatedAt
   user               User?     @relation(fields: [userId], references: [id])
-  userId             Int?
+  userId             String?
   course             Course?   @relation(fields: [courseId], references: [id])
-  courseId           Int?
+  courseId           String?
 }
```



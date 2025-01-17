# Migration `20201008203710-add-coursse-course-membership-lesson`

This migration has been generated by Khaled Garbaya at 10/8/2020, 10:37:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT
)

CREATE TABLE "Lesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT,
    "courseId" INTEGER,
    "slug" TEXT NOT NULL,

    FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "CourseMembership" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER,
    "courseId" INTEGER,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE UNIQUE INDEX "Course.slug_unique" ON "Course"("slug")

CREATE UNIQUE INDEX "Lesson.slug_unique" ON "Lesson"("slug")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201004145248-initial-migration..20201008203710-add-coursse-course-membership-lesson
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
@@ -12,16 +12,17 @@
 // --------------------------------------
 model User {
-  id             Int       @default(autoincrement()) @id
-  createdAt      DateTime  @default(now())
-  updatedAt      DateTime  @updatedAt
-  name           String?
-  email          String    @unique
-  hashedPassword String?
-  role           String    @default("user")
-  sessions       Session[]
+  id                Int       @default(autoincrement()) @id
+  createdAt         DateTime  @default(now())
+  updatedAt         DateTime  @updatedAt
+  name              String?
+  email             String    @unique
+  hashedPassword    String?
+  role              String    @default("user")
+  sessions          Session[]
+  courseMemberships CourseMembership[]
 }
 model Session {
   id                 Int       @default(autoincrement()) @id
@@ -35,4 +36,36 @@
   antiCSRFToken      String?
   publicData         String?
   privateData        String?
 }
+
+model Course {
+  id                 Int       @default(autoincrement()) @id
+  createdAt          DateTime  @default(now())
+  updatedAt          DateTime  @updatedAt
+  title              String
+  slug               String    @unique
+  description        String?
+  lessons            Lesson[]
+}
+
+model Lesson {
+  id                 Int       @default(autoincrement()) @id
+  createdAt          DateTime  @default(now())
+  updatedAt          DateTime  @updatedAt
+  title              String
+  description        String?
+  videoUrl           String?
+  course             Course?   @relation(fields: [courseId], references: [id])
+  courseId           Int?
+  slug               String    @unique
+}
+
+model CourseMembership {
+  id                 Int       @default(autoincrement()) @id
+  createdAt          DateTime  @default(now())
+  updatedAt          DateTime  @updatedAt
+  user               User?     @relation(fields: [userId], references: [id])
+  userId             Int?
+  course             Course?   @relation(fields: [courseId], references: [id])
+  courseId           Int?
+}
```



import db from "./index"
import { hashPassword } from "app/auth/auth-utils"

const seed = async () => {
  const hashedPassword = await hashPassword("passwordpassword")
  await db.user.create({
    data: { email: "admin@example.com", hashedPassword, role: "admin", name: "Admin User" },
  })
  await db.user.create({
    data: { email: "user@example.com", hashedPassword, role: "user", name: "Simple User" },
    select: { id: true },
  })

  await db.course.create({
    data: {
      title: `migrate a create-react-app project to Gatsby`,
      description: `Learn how to migrate a create-react-app project to Gatsby!`,
      slug: `migrate-a-reactjs-project-to-gatsby`,
    },
  })

  await db.course.create({
    data: {
      title: `Getting started with Blitzjs`,
      description: `Learn how to get started with blitzjs`,
      slug: `getting-started-with-blitz`,
    },
    select: { id: true },
  })
}
export default seed

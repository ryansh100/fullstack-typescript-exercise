const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Create a default user
  const defaultUser = await prisma.user.upsert({
    where: { email: 'default@example.com' },
    update: {
      id: 'demo-user-123',
    },
    create: {
      id: 'demo-user-123',
      email: 'default@example.com',
      name: 'Default User',
      emailVerified: new Date(),
    },
  })

  console.log({ defaultUser })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
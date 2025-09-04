import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUsers() {
  try {
    const adminUser = await prisma.user.upsert({
      where: { phoneNumber: "+251911000000" },
      update: {},
      create: {
        id: "admin-id-123",
        name: "Admin User",
        phoneNumber: "+251911000000",
        phoneNumberVerified: true,
        email: "admin@zagol.com",
        emailVerified: true,
        role: "ADMIN",
      },
    });
    const regularUser = await prisma.user.upsert({
      where: { phoneNumber: "+251911111111" },
      update: {},
      create: {
        id: "user-id-123",
        name: "John Doe",
        phoneNumber: "+251911111111",
        phoneNumberVerified: true,
        email: "user@zagol.com",
        emailVerified: true,
        role: "USER",
      },
    });

    console.log("✅ Created users:");
    console.log("Admin:", adminUser);
    console.log("User:", regularUser);
  } catch (error) {
    console.error("❌ Error creating users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createUsers();

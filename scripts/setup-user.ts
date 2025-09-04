import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function setupUser() {
  try {
    const regularUser = await prisma.user.findUnique({
      where: { email: "user@zagol.com" },
    });

    if (!regularUser) {
      console.log("❌ Regular user not found");
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: regularUser.id },
      data: {
        phoneNumber: "+251911111111",
        phoneNumberVerified: true,
        role: "USER",
      },
    });

    console.log("✅ Updated regular user:", updatedUser);
  } catch (error) {
    console.error("❌ Error setting up user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

setupUser();

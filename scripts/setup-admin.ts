import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function setupAdmin() {
  try {
    const adminUser = await prisma.user.findUnique({
      where: { email: "admin@zagol.com" },
    });

    if (!adminUser) {
      console.log("❌ Admin user not found");
      return;
    }
    const updatedAdmin = await prisma.user.update({
      where: { id: adminUser.id },
      data: {
        phoneNumber: "+251911000000",
        phoneNumberVerified: true,
        role: "ADMIN",
      },
    });

    console.log("✅ Updated admin user:", updatedAdmin);
  } catch (error) {
    console.error("❌ Error setting up admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

setupAdmin();

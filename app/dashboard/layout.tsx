import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = auth.api.getSession(
      {
        headers: await headers(),
    }
  );
  if (!session) {
    return redirect("/auth/login");
  }
  return (
    <>
      <DashboardNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </>
  );
}

import { SecurePdfViewer } from "@/components/content/secure-pdf-viewer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

interface PdfPageProps {
  params: {
    id: string;
  };
}

export default async function PdfPage({ params }: PdfPageProps) {
  const { id } = params;
  const session = await auth.api.getSession({
    headers: await headers(), 
  });

  if (!session) {
    redirect("/auth/login");
  }

  const hasAccess = true; 

  const pdfData = {
    "pdf-guide": {
      title: "Complete TikTok Growth Guide",
      description:
        "Comprehensive PDF guide covering all strategies to grow from 0 to 1M followers",
    },
  };

  const pdf = pdfData[id as keyof typeof pdfData];

  if (!pdf) {
    notFound();
  }

  return (
    <SecurePdfViewer
      pdfId={id}
      title={pdf.title}
      userEmail={session.user?.email}
      hasAccess={hasAccess}
    />
  );
}

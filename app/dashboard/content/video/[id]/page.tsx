import { SecureVideoPlayer } from "@/components/content/secure-video-player";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

interface VideoPageProps {
  params: {
    id: string;
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = params;

  // Get user session
  const session = await auth.api.getSession({
    headers: await headers(), // We'll need to pass actual headers in a real implementation
  });

  if (!session) {
    redirect("/auth/login");
  }

  // Check if user has access to this content
  // For now, we'll simulate this check
  const hasAccess = true; // In real implementation, check user's purchases

  // Mock video data - replace with actual database query
  const videoData = {
    "video-1": {
      title: "Understanding the TikTok Algorithm",
      description: "Deep dive into how TikTok's algorithm works",
      duration: "15 min",
    },
    "video-2": {
      title: "Content Creation Masterclass",
      description: "Learn to create engaging content",
      duration: "18 min",
    },
    "video-3": {
      title: "Viral Video Strategies",
      description: "Proven techniques to go viral",
      duration: "12 min",
    },
    "video-4": {
      title: "Building Your Personal Brand",
      description: "Establish yourself as an authority",
      duration: "20 min",
    },
    "video-5": {
      title: "Monetization Strategies",
      description: "Turn followers into income",
      duration: "16 min",
    },
    "video-6": {
      title: "Analytics and Optimization",
      description: "Use data to optimize your strategy",
      duration: "14 min",
    },
    "video-7": {
      title: "Advanced Growth Hacks",
      description: "Secret techniques for rapid growth",
      duration: "22 min",
    },
  };

  const video = videoData[id as keyof typeof videoData];

  if (!video) {
    notFound();
  }

  return (
    <SecureVideoPlayer
      videoId={id}
      title={video.title}
      duration={video.duration}
      userEmail={session.user?.email}
      hasAccess={hasAccess}
    />
  );
}

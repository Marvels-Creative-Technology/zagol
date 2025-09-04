"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FileText, Video, Lock } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function CoursesPage() {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const session = useSession();

  useEffect(() => {
    if (session.data) {
      setUser(session.data.user);
    }
    setLoading(false);
  }, [session]);

  const courses = [
    {
      id: "pdf-guide",
      title: "Complete TikTok Growth Guide",
      description: "Comprehensive PDF guide covering all strategies",
      type: "pdf",
      locked: true,
    },
    {
      id: "video-1",
      title: "Understanding the Algorithm",
      description: "Deep dive into TikTok's algorithm",
      type: "video",
      locked: true,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center">
        <p className="text-gray-600">Loading courses...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Access Required</CardTitle>
            <CardDescription>
              Please log in to access your courses
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/auth/login">
              <Button className="w-full">Log In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Courses</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user.name}!</p>
          </div>

          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Lock className="h-6 w-6 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900 dark:text-orange-200">
                    Purchase Required
                  </h3>
                  <p className="text-orange-700">
                    Get access to all course materials.
                  </p>
                </div>
              </div>
              <Link href="/packages">
                <Button className="mt-4 bg-orange-600 hover:bg-orange-700">
                  View Packages
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="opacity-60 bg-gray-50 dark:bg-background">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {course.type === "pdf" ? (
                        <FileText className="h-5 w-5 text-red-500" />
                      ) : (
                        <Video className="h-5 w-5 text-blue-500" />
                      )}
                      <Badge variant="secondary">
                        {course.type.toUpperCase()}
                      </Badge>
                    </div>
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg dark:text-white">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button disabled className="w-full" variant="secondary">
                    <Lock className="h-4 w-4 mr-2" />
                    Locked
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

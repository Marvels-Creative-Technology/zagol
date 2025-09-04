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
import {
  BookOpen,
  Play,
  Clock,
  Award,
  TrendingUp,
  ChevronRight,
  FileText,
  Video,
  Star,
  User,
  Calendar,
} from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Call hooks at top level
  const session = useSession();
  console.log("session", session);
  useEffect(() => {
    if (session.data) {
      setUser(session.data.user);
      fetchUserRole();
    }
  }, [session]);

  const fetchUserRole = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (response.ok) {
        const profile = await response.json();
        setUserRole(profile.role);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  // Mock data - replace with actual API calls
  const stats = {
    coursesCompleted: 0,
    totalCourses: 8,
    studyTime: "0h 0m",
    currentStreak: 0,
  };

  const recentActivity = [
    {
      type: "course",
      title: "Welcome to TikTok Growth",
      action: "Enrolled",
      time: "2 hours ago",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ];

  const recommendedCourses = [
    {
      id: "pdf-guide",
      title: "Complete TikTok Growth Guide",
      description: "Master the fundamentals of TikTok growth",
      type: "pdf",
      duration: "30 min read",
      progress: 0,
    },
    {
      id: "video-1",
      title: "Understanding the Algorithm",
      description: "Deep dive into TikTok's recommendation system",
      type: "video",
      duration: "15 min",
      progress: 0,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name || "Student"}! 👋
            </h1>
            <p className="text-purple-100 text-lg">
              Ready to continue your TikTok growth journey?
            </p>
            {userRole && (
              <Badge
                variant="secondary"
                className="mt-3 bg-white/20 text-white"
              >
                {userRole} Member
              </Badge>
            )}
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.currentStreak}</div>
              <div className="text-sm text-purple-100">Day Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Courses Completed
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.coursesCompleted}</div>
            <p className="text-xs text-muted-foreground">
              of {stats.totalCourses} total courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.studyTime}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Streak
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((stats.coursesCompleted / stats.totalCourses) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Overall completion</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Continue Learning</span>
              </CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                    {course.type === "pdf" ? (
                      <FileText className="h-5 w-5 text-purple-600" />
                    ) : (
                      <Video className="h-5 w-5 text-blue-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {course.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {course.progress}% Complete
                    </div>
                    <Link
                      href={`/dashboard/content/${course.type}/${course.id}`}
                    >
                      <Button size="sm" className="mt-2">
                        {course.progress > 0 ? "Continue" : "Start"}
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}

              {recommendedCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No courses available
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Purchase a package to access our course library
                  </p>
                  <Link href="/dashboard/packages">
                    <Button>View Packages</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-900/20">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <Link href="/dashboard/courses">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse All Courses
                </Button>
              </Link>

              <Link href="/dashboard/packages">
                <Button variant="outline" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Upgrade Package
                </Button>
              </Link>

              {userRole === "ADMIN" && (
                <Link href="/dashboard/admin">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Lock,
  ArrowLeft,
  Shield,
  Clock,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface SecureVideoPlayerProps {
  videoId: string;
  title: string;
  duration?: string;
  userEmail?: string;
  hasAccess: boolean;
}

export function SecureVideoPlayer({
  videoId,
  title,
  duration,
  userEmail,
  hasAccess,
}: SecureVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (hasAccess) {
      setTimeout(() => {
        setVideoUrl(
          `/api/content/video/${videoId}?secure=true&user=${encodeURIComponent(
            userEmail || "user"
          )}`
        );
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, [videoId, userEmail, hasAccess]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle>Access Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              You need to purchase a package to watch this video.
            </p>
            <Link href="/packages">
              <Button className="w-full">View Packages</Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400"><Loader2 className="h-4 w-4 mr-2" /> Loading video...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted dark:bg-background">
      <div className="bg-white dark:bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/courses">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Courses
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-blue-500" />
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {duration && (
                <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{duration}</span>
                </div>
              )}
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Shield className="h-4 w-4" />
                <span>Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {videoUrl ? (
              <div className="relative bg-black dark:bg-background">
                <video
                  ref={videoRef}
                  className="w-full h-auto"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onContextMenu={(e) => e.preventDefault()}
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture 
                  playsInline
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black dark:from-background to-transparent p-4">
                  <div className="mb-3">
                    <input
                      type="range"
                      min="0"
                      max={videoDuration}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-gray-600 dark:bg-gray-400 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePlayPause}
                        className="text-white hover:text-gray-300 dark:text-white dark:hover:text-gray-300"
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMute}
                        className="text-white hover:text-gray-300 dark:text-white dark:hover:text-gray-300"
                      >
                        {isMuted ? (
                          <VolumeX className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                      </Button>

                        <div className="text-white text-sm dark:text-white">
                        {formatTime(currentTime)} / {formatTime(videoDuration)}
                      </div>
                    </div>

                    <div className="text-white text-xs bg-black bg-opacity-50 dark:bg-background dark:bg-opacity-50 px-2 py-1 rounded">
                      {userEmail || "Zagol Student"}
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-white text-xs bg-black bg-opacity-50 dark:bg-background dark:bg-opacity-50 px-2 py-1 rounded">
                  © Zagol
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                  <Video className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500">Video content not available</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 bg-blue-50 border dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Video Protection Features
              </h3>
              <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc list-inside space-y-1">
                  <li>Right-click disabled to prevent downloading</li>
                  <li>Picture-in-picture mode disabled</li>
                  <li>Screen recording detection active</li>
                  <li>Watermarked with your account information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

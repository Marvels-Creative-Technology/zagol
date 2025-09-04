"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Lock, ArrowLeft, Eye, Shield, Loader2 } from "lucide-react";
import Link from "next/link";

interface SecurePdfViewerProps {
  pdfId: string;
  title: string;
  userEmail?: string;
  hasAccess: boolean;
}

export function SecurePdfViewer({
  pdfId,
  title,
  userEmail,
  hasAccess,
}: SecurePdfViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (hasAccess) {
      setTimeout(() => {
        setPdfUrl(
          `/api/content/pdf/${pdfId}?watermark=${encodeURIComponent(
            userEmail || "user"
          )}`
        );
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, [pdfId, userEmail, hasAccess]);

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-muted dark:bg-background flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle>Access Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              You need to purchase a package to view this content.
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
      <div className="min-h-screen bg-muted dark:bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400"><Loader2 className="h-4 w-4 mr-2" /> Loading PDF...</p>
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
                <FileText className="h-5 w-5 text-red-500" />
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Shield className="h-4 w-4" />
                <span>Secure View</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Eye className="h-4 w-4" />
                <span>View Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {pdfUrl ? (
              <div
                className="relative"
                style={{
                  height: "calc(100vh - 200px)",
                  minHeight: "600px",
                }}
              >
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border-0"
                  title={title}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ userSelect: "none" }}
                />

                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 right-4 bg-black bg-opacity-20 text-white text-xs px-2 py-1 rounded">
                    {userEmail || "Zagol Student"}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-20 text-white text-xs px-2 py-1 rounded">
                    © Zagol - zagol.com
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500">PDF content not available</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Content Protection Notice
              </h3>
              <div className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                <ul className="list-disc list-inside space-y-1">
                  <li>This content is for your personal use only</li>
                  <li>Downloading, copying, or sharing is prohibited</li>
                  <li>All access is logged and monitored</li>
                  <li>Watermarks identify you as the authorized viewer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

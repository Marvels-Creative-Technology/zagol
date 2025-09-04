"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Upload, FileText, Video, ArrowLeft, X } from "lucide-react";
import Link from "next/link";

const uploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["pdf", "video"]),
  packageAccess: z.enum(["standard", "premium", "both"]),
});

type UploadInput = z.infer<typeof uploadSchema>;

export default function ContentUploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<UploadInput>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "pdf",
      packageAccess: "both",
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: UploadInput) => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("type", data.type);
      formData.append("packageAccess", data.packageAccess);

      selectedFiles.forEach((file, index) => {
        formData.append(`files`, file);
      });

      const response = await fetch("/api/admin/content/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Content uploaded successfully!");
        form.reset();
        setSelectedFiles([]);
      } else {
        toast.error(result.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="">
          <div className="mb-8">
            <Link href="/dashboard/admin/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Upload Course Content
            </h1>
            <p className="text-gray-600 dark:text-white">
              Add new PDFs and videos to your course packages
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Content Details</span>
                </CardTitle>
                <CardDescription>
                  Fill in the details for your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g., Understanding the Algorithm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Brief description of the content"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content Type</FormLabel>
                          <div className="grid grid-cols-2 gap-4">
                            <label
                              className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer ${
                                field.value === "pdf"
                                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400"
                                  : "border-gray-200 dark:border-gray-700"
                              }`}
                            >
                              <input
                                type="radio"
                                value="pdf"
                                checked={field.value === "pdf"}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="sr-only"
                              />
                              <FileText className="h-5 w-5 text-red-500" />
                              <span>PDF</span>
                            </label>

                            <label
                              className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer ${
                                field.value === "video"
                                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400"
                                  : "border-gray-200 dark:border-gray-700"
                              }`}
                            >
                              <input
                                type="radio"
                                value="video"
                                checked={field.value === "video"}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="sr-only"
                              />
                              <Video className="h-5 w-5 text-blue-500" />
                              <span>Video</span>
                            </label>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="packageAccess"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package Access</FormLabel>
                          <div className="space-y-2">
                            {[
                              { value: "both", label: "Both Packages" },
                              { value: "standard", label: "Standard Only" },
                              { value: "premium", label: "Premium Only" },
                            ].map((option) => (
                              <label
                                key={option.value}
                                className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${
                                  field.value === option.value
                                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400"
                                    : "border-gray-200 dark:border-gray-700"
                                }`}
                              >
                                <input
                                  type="radio"
                                  value={option.value}
                                  checked={field.value === option.value}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  className="sr-only"
                                />
                                <span>{option.label}</span>
                              </label>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isUploading || selectedFiles.length === 0}
                    >
                      {isUploading ? "Uploading..." : "Upload Content"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>File Upload</CardTitle>
                <CardDescription>
                  Select files to upload (PDF or MP4)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <label className="cursor-pointer">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      Click to upload files
                    </span>
                    <p className="text-gray-600 dark:text-white mt-1">or drag and drop</p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.mp4,.mov,.avi"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Selected Files:
                    </h4>
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          {file.type.includes("pdf") ? (
                            <FileText className="h-4 w-4 text-red-500" />
                          ) : (
                            <Video className="h-4 w-4 text-blue-500" />
                          )}
                          <span className="text-sm font-medium">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-white">
                            ({(file.size / 1024 / 1024).toFixed(1)} MB)
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

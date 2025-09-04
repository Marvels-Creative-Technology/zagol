"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Upload, FileText, Video, X } from "lucide-react";

const uploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["pdf", "video"]),
  packageAccess: z.enum(["standard", "premium", "both"]),
});

type UploadFormData = z.infer<typeof uploadSchema>;

interface ContentUploadFormProps {
  onSubmit: (data: UploadFormData & { files: File[] }) => Promise<void>;
  isLoading?: boolean;
}

export function ContentUploadForm({
  onSubmit,
  isLoading = false,
}: ContentUploadFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "pdf",
      packageAccess: "both",
    },
  });

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (data: UploadFormData) => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file");
      return;
    }
    await onSubmit({ ...data, files: selectedFiles });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Content title" />
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
                <Input {...field} placeholder="Content description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <label className="cursor-pointer">
            <span className="text-lg font-medium">Click to upload</span>
            <input
              type="file"
              multiple
              accept=".pdf,.mp4,.mov"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </div>

        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded"
          >
            <span>{file.name}</span>
            <Button size="sm" variant="ghost" onClick={() => removeFile(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </Form>
  );
}

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
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginInput = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      console.log("🔐 Attempting login with:", {
        phoneNumber: data.phoneNumber,
      });

      const { data: result, error } = await authClient.signIn.phoneNumber({
        phoneNumber: data.phoneNumber,
        password: data.password
      });

      console.log("🔐 Login result:", { result, error });

      if (error) {
        console.error("🔐 Login error:", error);
        toast.error(error.message || "Login failed");
        return;
      }

      if (result) {
        console.log("🔐 Login successful, checking role...");
        toast.success("Login successful!");

        await new Promise((resolve) => setTimeout(resolve, 500));

        const { data: session } = await authClient.getSession();
        console.log("🔐 Session after login:", session);

        if (session?.user) {
          try {
            const response = await fetch("/api/user/profile");
            console.log("🔐 Response:", response);
            if (response.ok) {
              const profile = await response.json();
              console.log("🔐 User profile:", profile);

              if (profile.role === "ADMIN") {
                router.push("/dashboard/admin");
              } else {
                router.push("/dashboard");
              }
            } else {
              router.push("/dashboard");
            }
          } catch (profileError) {
            console.error("🔐 Profile fetch error:", profileError);
            router.push("/dashboard");
          }
        } else {
          console.error("🔐 No session found after login");
          toast.error("Session not established. Please try again.");
        }
      }
    } catch (error) {
      console.error("🔐 Login error:", error);
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Sign in to your account using your phone number
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="+251911000000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

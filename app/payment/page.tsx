"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Shield,
  Check,
  ArrowLeft,
  Phone,
  Building,
} from "lucide-react";

const paymentSchema = z.object({
  phoneNumber: z.string().min(10, "Valid phone number required"),
  fullName: z.string().min(2, "Full name required"),
  paymentMethod: z.enum(["telebirr", "cbe", "awash"]),
});

type PaymentInput = z.infer<typeof paymentSchema>;

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package");

  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    title: string;
    price: string;
    currency: string;
    features: string[];
  } | null>(null);

  const packages = {
    standard: {
      title: "Standard Package",
      price: "2,500",
      currency: "ETB",
      features: ["PDF Guide", "7 Videos", "Lifetime Access"],
    },
    premium: {
      title: "Premium Package",
      price: "4,500",
      currency: "ETB",
      features: ["PDF Guide", "7 Videos", "Q&A Session", "Lifetime Access"],
    },
  };

  const paymentMethods = [
    {
      id: "telebirr",
      name: "Telebirr",
      icon: <Phone className="h-5 w-5" />,
      description: "Pay with your Telebirr wallet",
    },
    {
      id: "cbe",
      name: "CBE Birr",
      icon: <Building className="h-5 w-5" />,
      description: "Commercial Bank of Ethiopia",
    },
    {
      id: "awash",
      name: "Awash Bank",
      icon: <Building className="h-5 w-5" />,
      description: "Awash Bank Mobile Banking",
    },
  ];

  const form = useForm<PaymentInput>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      phoneNumber: "",
      fullName: "",
      paymentMethod: "telebirr",
    },
  });

  useEffect(() => {
    if (packageId && packages[packageId as keyof typeof packages]) {
      setSelectedPackage(packages[packageId as keyof typeof packages]);
    } else {
      // Redirect to packages if no valid package selected
      router.push("/packages");
    }
  }, [packageId, router]);

  const onSubmit = async (data: PaymentInput) => {
    setIsProcessing(true);

    try {
      // Initialize payment with Santim Pay
      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId,
          amount: selectedPackage?.price,
          currency: selectedPackage?.currency,
          customerInfo: {
            phoneNumber: data.phoneNumber,
            fullName: data.fullName,
          },
          paymentMethod: data.paymentMethod,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to payment gateway
        window.location.href = result.paymentUrl;
      } else {
        toast.error(result.message || "Payment initialization failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment process failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h2>
          <p className="text-gray-600">Preparing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Packages
            </Button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Purchase
            </h1>
            <p className="text-gray-600">
              Secure payment powered by Santim Pay
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {selectedPackage.title}
                  </h3>
                  <div className="mt-2 space-y-1">
                    {selectedPackage.features.map(
                      (feature: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-sm text-gray-600"
                        >
                          <Check className="h-3 w-3 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>
                    {selectedPackage.price} {selectedPackage.currency}
                  </span>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-green-800">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>
                  Choose your preferred payment method
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
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your full name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="+251911234567" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method</FormLabel>
                          <div className="grid gap-3">
                            {paymentMethods.map((method) => (
                              <label
                                key={method.id}
                                className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                                  field.value === method.id
                                    ? "border-purple-500 bg-purple-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <input
                                  type="radio"
                                  value={method.id}
                                  checked={field.value === method.id}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  className="sr-only"
                                />
                                <div className="flex items-center space-x-3">
                                  {method.icon}
                                  <div>
                                    <div className="font-medium">
                                      {method.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {method.description}
                                    </div>
                                  </div>
                                </div>
                              </label>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      disabled={isProcessing}
                    >
                      {isProcessing
                        ? "Processing..."
                        : `Pay ${selectedPackage.price} ${selectedPackage.currency}`}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

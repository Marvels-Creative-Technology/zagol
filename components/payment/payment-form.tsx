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
import { CreditCard, Phone, Building, Shield, Check } from "lucide-react";

const paymentSchema = z.object({
  phoneNumber: z.string().min(10, "Valid phone number required"),
  fullName: z.string().min(2, "Full name required"),
  paymentMethod: z.enum(["telebirr", "cbe", "awash"]),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  packageData: {
    id: string;
    title: string;
    price: string;
    currency: string;
    features: string[];
  };
  onSubmit: (data: PaymentFormData) => Promise<void>;
  isLoading?: boolean;
}

export function PaymentForm({
  packageData,
  onSubmit,
  isLoading = false,
}: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("telebirr");

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      phoneNumber: "",
      fullName: "",
      paymentMethod: "telebirr",
    },
  });

  const paymentMethods = [
    {
      id: "telebirr",
      name: "Telebirr",
      icon: <Phone className="h-5 w-5" />,
      description: "Pay with your Telebirr wallet",
      logo: "📱",
    },
    {
      id: "cbe",
      name: "CBE Birr",
      icon: <Building className="h-5 w-5" />,
      description: "Commercial Bank of Ethiopia",
      logo: "🏦",
    },
    {
      id: "awash",
      name: "Awash Bank",
      icon: <Building className="h-5 w-5" />,
      description: "Awash Bank Mobile Banking",
      logo: "🏧",
    },
  ];

  const handleSubmit = async (data: PaymentFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Payment submission error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
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
              {packageData.title}
            </h3>
            <div className="mt-2 space-y-1">
              {packageData.features.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <Check className="h-3 w-3 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total:</span>
            <span>
              {packageData.price} {packageData.currency}
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
              onSubmit={form.handleSubmit(handleSubmit)}
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
                        disabled={isLoading}
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
                      <Input
                        {...field}
                        placeholder="+251911234567"
                        disabled={isLoading}
                      />
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
                          } ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            value={method.id}
                            checked={field.value === method.id}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="sr-only"
                            disabled={isLoading}
                          />
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{method.logo}</span>
                            <div>
                              <div className="font-medium">{method.name}</div>
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
                disabled={isLoading}
              >
                {isLoading
                  ? "Processing..."
                  : `Pay ${packageData.price} ${packageData.currency}`}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

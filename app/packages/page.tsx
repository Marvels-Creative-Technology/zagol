"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FileText, Video, MessageCircle, Check, Star } from "lucide-react";

export default function PackagesPage() {
  const router = useRouter();
  const packages = [
    {
      id: "standard",
      title: "Standard Package",
      price: "2,500",
      currency: "ETB",
      popular: false,
      description: "Everything you need to grow your TikTok following",
      features: [
        "Detailed step-by-step PDF guide",
        "7 exclusive video tutorials",
        "Algorithm mastery techniques",
        "Content creation strategies",
        "Growth hacking methods",
        "Lifetime access",
      ],
      includes: [
        { icon: <FileText className="h-4 w-4" />, text: "Complete PDF Guide" },
        { icon: <Video className="h-4 w-4" />, text: "7 Video Tutorials" },
      ],
    },
    {
      id: "premium",
      title: "Premium Package",
      price: "4,500",
      currency: "ETB",
      popular: true,
      description: "Standard package + personal guidance from Salman",
      features: [
        "Everything in Standard Package",
        "15-minute Q&A session with Salman",
        "Personal strategy consultation",
        "Direct feedback on your content",
        "Priority support",
        "Advanced growth techniques",
        "Lifetime access",
      ],
      includes: [
        { icon: <FileText className="h-4 w-4" />, text: "Complete PDF Guide" },
        { icon: <Video className="h-4 w-4" />, text: "7 Video Tutorials" },
        {
          icon: <MessageCircle className="h-4 w-4" />,
          text: "15-min Q&A with Salman",
        },
      ],
    },
  ];

  const paymentMethods = [
    { id: "telebirr", name: "Telebirr", logo: "📱" },
    { id: "cbe", name: "CBE Birr", logo: "🏦" },
    { id: "awash", name: "Awash Bank", logo: "🏧" },
  ];

  const handlePurchase = (packageId: string) => {
    router.push(`/payment?package=${packageId}`);
  };

  return (
    <div className="min-h-screen bg-muted dark:bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Package
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Join thousands who have transformed their TikTok presence with
              Salman&apos;s proven strategies
            </p>
          </div>

          {/* Packages */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  pkg.popular
                    ? "border-2 border-purple-500 shadow-lg scale-105 dark:border-purple-500"
                    : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-bl-lg">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span className="font-semibold">Most Popular</span>
                    </div>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {pkg.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {pkg.description}
                  </CardDescription>

                  <div className="flex items-baseline space-x-2 mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {pkg.price}
                    </span>
                    <span className="text-xl text-gray-600 dark:text-gray-400">
                      {pkg.currency}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* What's Included */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      What&apos;s Included:
                    </h4>
                    <div className="space-y-2">
                      {pkg.includes.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <div className="text-purple-600">{item.icon}</div>
                          <span className="text-gray-700 dark:text-gray-400">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Features:
                    </h4>
                    <div className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-400">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <Button
                    onClick={() => handlePurchase(pkg.id)}
                    className={`w-full py-6 text-lg font-semibold rounded-lg transition-all duration-300 ${
                      pkg.popular
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-primary"
                    }`}
                  >
                    Get Started Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl p-8 shadow-lg dark:bg-background border border-border">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Secure Payment Methods
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-center space-x-3 p-4 border rounded-lg hover:border-purple-300 transition-colors"
                >
                  <span className="text-2xl">{method.logo}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-400">
                    {method.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-4 dark:text-gray-400">
              All payments are processed securely through Santim Pay
            </p>
          </div>

          {/* Guarantee */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full dark:bg-green-900 dark:text-green-200">
              <Check className="h-5 w-5" />
              <span className="font-semibold">30-Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

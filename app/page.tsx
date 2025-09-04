"use client";

import {
  Users,
  DollarSign,
  MessageCircle,
  Zap,
  Heart,
  Video,
  FileText,
} from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";
import Footer from "@/components/landing-components/footer";
import Cta from "@/components/landing-components/cta";
import Features from "@/components/landing-components/features";
import Benefits from "../components/landing-components/benefits";
import Hero from "../components/landing-components/hero";
import { Testimonial } from "@/components/landing-components/testimonial";

export default function HomePage() {
  const { t } = useTranslations();

  const benefits = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: t("home.benefits.algorithm.title"),
      description: t("home.benefits.algorithm.desc"),
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: t("home.benefits.content.title"),
      description: t("home.benefits.content.desc"),
      gradient: "from-pink-400 to-red-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t("home.benefits.connections.title"),
      description: t("home.benefits.connections.desc"),
      gradient: "from-blue-400 to-purple-500",
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: t("home.benefits.monetize.title"),
      description: t("home.benefits.monetize.desc"),
      gradient: "from-green-400 to-emerald-500",
    },
  ];

  const features = [
    {
      icon: <FileText className="h-6 w-6 text-red-500" />,
      title: "Comprehensive PDF Guide",
      description: "300+ pages of actionable strategies and insider secrets",
    },
    {
      icon: <Video className="h-6 w-6 text-blue-500" />,
      title: "7 Video Masterclasses",
      description: "Step-by-step video tutorials with real examples",
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-purple-500" />,
      title: "Personal Q&A Session",
      description: "15-minute one-on-one strategy call with Salman (Premium)",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Hero />
      <Benefits benefits={benefits} />
      <Features features={features} />
      {/* <Cta /> */}
      <Testimonial />
      <Footer />
    </div>
  );
}

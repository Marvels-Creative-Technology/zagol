import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, ArrowRight, Play, Users, Star, Check, Zap } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';

const Hero = () => {
  const { t } = useTranslations();
  return (
    <section className="relative bg-white dark:bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-purple-700 dark:text-purple-300 mb-8 border border-purple-200 dark:border-purple-700">
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="text-sm font-semibold">
              {t("home.hero.badge")}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight max-w-4xl mx-auto">
            {t("home.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {t("home.hero.cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              {t("home.hero.preview")}
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                1M+
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                {t("home.stats.followers")}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t("home.stats.followers_desc")}
              </div>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                100K+
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                {t("home.stats.views")}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t("home.stats.views_desc")}
              </div>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                50M+
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                {t("home.stats.total")}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t("home.stats.total_desc")}
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center shadow-lg"
                  >
                    <Users className="h-5 w-5 text-white" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  Join 10,000+ creators
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Already transforming their TikTok
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4 text-purple-500" />
                <span>Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero
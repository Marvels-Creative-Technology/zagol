import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Benefits = ({
  benefits,
}: {
  benefits: { icon: React.ReactNode; title: string; description: string; gradient: string }[];
}) => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Transform Your TikTok Game
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Master the strategies that separate viral creators from everyone
            else
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${benefit.gradient}`}
              ></div>
              <CardContent className="p-8">
                <div
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${benefit.gradient} mb-6`}
                >
                  <div className="text-white">{benefit.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits
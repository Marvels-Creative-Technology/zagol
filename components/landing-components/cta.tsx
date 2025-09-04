import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';


const Cta = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Go Viral?
        </h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          Join thousands of creators who&apos;ve transformed their TikTok
          presence with Salman&apos;s proven strategies.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-50 font-bold px-12 py-6 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Learning Today
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center space-x-6 text-purple-100">
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5" />
            <span>30-Day Money Back Guarantee</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5" />
            <span>Instant Access</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
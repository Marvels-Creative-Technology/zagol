import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Separator } from "../ui/separator";

const footer = () => {
  return (
    <footer className="relative py-16 bg-gray-900 text-white">
      <Separator className="my-16" />
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <Mail className="h-6 w-6 text-blue-400" />
            <div className="text-left">
              <div className="font-medium">Email Support</div>
              <div className="text-gray-300">support@zagol.com</div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-3">
            <MessageCircle className="h-6 w-6 text-purple-400" />
            <div className="text-left">
              <div className="font-medium">Follow Salman</div>
              <div className="text-gray-300">@salman_tiktok</div>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </footer>
  );
};

export default footer;

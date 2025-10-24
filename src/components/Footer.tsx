import React from 'react';
import { Layers, FileText, Trophy, X, Youtube, Send } from 'lucide-react';
export const Footer: React.FC = () => {
  return <footer className="bg-[#121212] text-white border-t border-gray-800">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        {/* Info Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Block Explorer */}
          <a href="https://explorer.rayls.com" target="_blank" rel="noopener noreferrer" className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-[#b388ff] transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="bg-[#b388ff]/20 p-3 rounded-lg mr-4">
                <Layers size={24} className="text-[#b388ff]" />
              </div>
              <h3 className="text-lg font-bold">Block Explorer</h3>
            </div>
            <p className="text-white text-sm mb-3">
              View transactions and blocks
            </p>
            <span className="text-[#b388ff] text-sm flex items-center group-hover:translate-x-1 transition-transform">
              Explore →
            </span>
          </a>
          {/* Documentation */}
          <a href="https://docs.rayls.com" target="_blank" rel="noopener noreferrer" className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-[#b388ff] transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="bg-[#b388ff]/20 p-3 rounded-lg mr-4">
                <FileText size={24} className="text-[#b388ff]" />
              </div>
              <h3 className="text-lg font-bold">Documentation</h3>
            </div>
            <p className="text-white text-sm mb-3">Learn about receivables</p>
            <span className="text-[#b388ff] text-sm flex items-center group-hover:translate-x-1 transition-transform">
              Read docs →
            </span>
          </a>
          {/* Quests */}
          <a href="https://quests.rayls.com" target="_blank" rel="noopener noreferrer" className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-[#b388ff] transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="bg-[#b388ff]/20 p-3 rounded-lg mr-4">
                <Trophy size={24} className="text-[#b388ff]" />
              </div>
              <h3 className="text-lg font-bold">Quests</h3>
            </div>
            <p className="text-white text-sm mb-3">
              Complete tasks and earn rewards
            </p>
            <span className="text-[#b388ff] text-sm flex items-center group-hover:translate-x-1 transition-transform">
              Start quests →
            </span>
          </a>
        </div>
        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="https://rayls.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/Rayls_Logo_Gradient.svg" alt="Rayls" className="h-8" />
            </a>
            <p className="text-white text-sm mt-2">
              &copy; {new Date().getFullYear()} Rayls. All rights reserved.
            </p>
          </div>
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a href="https://twitter.com/rayls" target="_blank" rel="noopener noreferrer" className="bg-[#1a1a1a] hover:bg-[#b388ff] p-3 rounded-lg transition-colors">
              <X size={20} />
            </a>
            <a href="https://youtube.com/@rayls" target="_blank" rel="noopener noreferrer" className="bg-[#1a1a1a] hover:bg-[#b388ff] p-3 rounded-lg transition-colors">
              <Youtube size={20} />
            </a>
            <a href="https://t.me/rayls" target="_blank" rel="noopener noreferrer" className="bg-[#1a1a1a] hover:bg-[#b388ff] p-3 rounded-lg transition-colors">
              <Send size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
'use client';

import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import { subscribeNewsletter } from '../../lib/api';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);
    try {
      const result = await subscribeNewsletter(email);
      if (result.success) {
        toast.success(result.message);
        setEmail('');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Blog', to: '/blog' },
    { label: 'AI Tools', to: '/ai-tools' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const categories = [
    { label: 'Machine Learning', slug: 'machine-learning' },
    { label: 'Web Development', slug: 'web-development' },
    { label: 'Data Science', slug: 'data-science' },
    { label: 'Python', slug: 'python' },
    { label: 'JavaScript', slug: 'javascript' },
    { label: 'Career', slug: 'career' },
  ];

  const socialLinks = [
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Youtube, url: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo & Social */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">✨</span>
              </div>
              <span className="font-bold text-lg dark:text-white">StudyAI Hub</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Learn AI, ML, and modern web development with expert tutorials and insights.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-cyan-400"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition text-sm"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Get the latest posts and updates delivered to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-l-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-r-lg hover:shadow-lg transition disabled:opacity-50 font-medium text-sm"
                >
                  {isLoading ? '...' : <Mail size={18} />}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-slate-800 pt-8">
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-gray-600 dark:text-gray-400 text-sm">
            <p>© 2025 StudyAI Hub. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-indigo-600 dark:hover:text-cyan-400 transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

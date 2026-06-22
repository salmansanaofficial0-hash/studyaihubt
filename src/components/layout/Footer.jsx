'use client';

import { Link } from '@tanstack/react-router';
import { Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import FooterNewsletter from '../../components/FooterNewsletter';

export default function Footer() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Get the latest posts and updates delivered to your inbox.
            </p>
            <FooterNewsletter />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-slate-800 pt-8">
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

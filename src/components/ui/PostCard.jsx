'use client';

import { Link } from '@tanstack/react-router';
import { Eye, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function PostCard({
  post,
}) {
  const {
    id,
    title,
    slug,
    excerpt,
    category,
    categoryColor = 'from-blue-500 to-blue-600',
    cover_emoji = '📚',
    reading_time = 5,
    created_at,
    views = 0,
    author_name = 'Author',
    author_avatar = '👤',
  } = post;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formattedDate = created_at
    ? formatDistanceToNow(new Date(created_at), { addSuffix: true })
    : 'Recently';

  return (
    <Link to={`/blog/${slug}`}>
      <div className="group h-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 hover-lift transition cursor-pointer">
        {/* Cover */}
        <div
          className={`bg-gradient-to-br ${categoryColor} h-40 flex items-center justify-center text-6xl relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition" />
          <span className="relative group-hover:scale-110 transition duration-300">
            {cover_emoji}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col h-full">
          {/* Category Badge */}
          {category && (
            <div className="mb-3">
              <span
                className={`inline-block px-3 py-1 bg-gradient-to-r ${categoryColor} text-white text-xs font-semibold rounded-full`}
              >
                {category}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
            {excerpt}
          </p>

          {/* Footer Row */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-slate-700">
            {/* Author Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                {getInitials(author_name)}
              </div>
              <span className="hidden sm:inline">{author_name}</span>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-3">
              <span>{formattedDate}</span>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{reading_time}m</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

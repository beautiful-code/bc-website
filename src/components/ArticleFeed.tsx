"use client";

import { useState } from "react";
import ArticleCard from "./ArticleCard";
import {
  ARTICLES_PER_INITIAL_LOAD,
  ARTICLES_PER_LOAD_MORE,
} from "@/lib/config";
import { ArticleMetadata } from "@/lib/article";

interface ArticleFeedProps {
  articles: ArticleMetadata[];
}

export default function ArticleFeed({ articles }: ArticleFeedProps) {
  const [displayedCount, setDisplayedCount] = useState(
    ARTICLES_PER_INITIAL_LOAD
  );
  const [loading, setLoading] = useState(false);

  const hasMore = displayedCount < articles.length;

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedCount((prev) =>
        Math.min(prev + ARTICLES_PER_LOAD_MORE, articles.length)
      );
      setLoading(false);
    }, 200);
  };

  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          <span className="font-bold">Coming soon</span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        {articles.map((article, index) => (
          <div
            key={article.slug}
            className={index >= displayedCount ? "hidden" : ""}
          >
            <ArticleCard
              title={article.title}
              slug={article.slug}
              tech={article.tech}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-left">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="inline-flex items-center space-x-2 text-[var(--color-bc-text-black)] hover:text-[var(--color-bc-red)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-sm font-normal">
              {loading ? "Loading..." : "Load More"}
            </span>
            {!loading && (
              <svg
                className="w-4 h-4 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

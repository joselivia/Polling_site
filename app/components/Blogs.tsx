"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { baseURL } from "@/config/baseUrl";
import { useMediaStore } from "@/config/mediastore";


interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const truncate = (text: string, limit: number) => {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

const BlogListPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { mediaMap, setMedia } = useMediaStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/posts?limit=10&offset=0`);
        setPosts(res.data?.posts || []);
        for (const post of res.data.posts || []) {
          if (!mediaMap[post.id]) {
            try {
              const mediaRes = await axios.get(`${baseURL}/api/posts/${post.id}`);
              const { images = [], videos = [] } = mediaRes.data;
              setMedia(post.id, { images, videos });
            } catch (err) {
              console.error(`❌ Failed to load media for post ${post.id}`, err);
            }
          }
        }
      } catch (err) {
        console.error("❌ Error fetching posts:", err);
        setError("Failed to fetch blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [mediaMap, setMedia]);

  return (
    <div className="max-w-full px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-left">Latest Blog Posts</h1>
        <Link
          href="/BlogPostForm"
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Create Blog
        </Link>
      </div>

      <div className="h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400">
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading blog posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">📝 No blog posts found.</p>
        ) : (
          posts.map((post) => {
            const media = mediaMap[post.id];
            const showSeeMore = post.content.length > 200;

            return (
              <div
                key={post.id}
                className="bg-white flex shadow-md rounded-lg overflow-hidden mb-6"
              >
                {/* Media Section */}
                {media ? (
                  media.images.length > 0 ? (
                    <img
                      src={
                        media.images[0].startsWith("data:")
                          ? media.images[0]
                          : `${baseURL}/${media.images[0]}`
                      }
                      alt={`Post ${post.id} preview`}
                      className="lg:w-1/3 w-full h-54 object-cover"
                    />
                  ) : media.videos.length > 0 ? (
                    <video
                      className="lg:w-1/3 w-full h-54 object-cover"
                      controls
                      preload="metadata"
                    >
                      <source
                        src={
                          media.videos[0].startsWith("data:")
                            ? media.videos[0]
                            : `${baseURL}/${media.videos[0]}`
                        }
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                      No Media
                    </div>
                  )
                ) : (
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 animate-pulse">
                    Loading media...
                  </div>
                )}

                {/* Text Content */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(post.created_at).toLocaleString("en-KE")}
                  </p>
                  <p className="text-gray-800 text-sm">
                    {truncate(post.content, 200)}
                  </p>

                  {showSeeMore && (
                    <Link
                      href={`/BlogPostForm/${post.id}`}
                      className="mt-2 inline-block text-blue-600 hover:underline text-sm"
                    >
                      See more...
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BlogListPage;

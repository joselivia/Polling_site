"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { baseURL } from "@/config/baseUrl"; // Assuming this path is correct
import { useMediaStore } from "@/config/mediastore"; // Assuming this path is correct and useMediaStore is correctly defined
import { PlusCircle, FileText, Loader2, Info, ImageOff, ExternalLink } from "lucide-react"; // Import icons

interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface MediaContent {
  images: string[];
  videos: string[];
}

const truncate = (text: string, limit: number) => {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};
const BlogListPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { mediaMap, setMedia } = useMediaStore() || { mediaMap: {}, setMedia: () => {} }; 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  const adminStatus = localStorage.getItem("isAdmin");
  setIsAdmin(adminStatus === "true");
  setMounted(true); 
}, []);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${baseURL}/api/posts?limit=10&offset=0`);
        const fetchedPosts = res.data?.posts || [];
        setPosts(fetchedPosts);
        for (const post of fetchedPosts) {
          if (!mediaMap[post.id]) {
            try {
              const mediaRes = await axios.get(`${baseURL}/api/posts/${post.id}`);
              const { images = [], videos = [] } = mediaRes.data as MediaContent;
              if (setMedia) { 
                setMedia(post.id, { images, videos });
              }
            } catch (err) {
              console.error(`❌ Failed to load media for post ${post.id}`, err);
                           if (setMedia) {
                setMedia(post.id, { images: [], videos: [] }); 
              }
            }
          }
        }
      } catch (err) {
        console.error("❌ Error fetching posts:", err);
        setError("Failed to fetch blog posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [mediaMap, setMedia, baseURL]); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0 flex items-center">
            <FileText className="mr-3 text-blue-600 w-8 h-8 sm:w-10 sm:h-10" /> Latest Blog Posts
          </h1>
          {mounted && isAdmin &&(
    <Link
            href="/BlogPostForm"
            className="flex items-center p-2 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 text-sm"
          >
            <PlusCircle className="w-4 h-4 mr-2" /> Create New Blog
          </Link>
          )}
      
        </div>

        {/* Blog Posts List */}
        <div className="h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Loader2 className="animate-spin w-10 h-10 text-blue-500 mb-4" />
              <p className="text-lg font-medium">Loading blog posts...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full text-red-500">
              <Info className="w-10 h-10 mb-4" />
              <p className="text-lg font-medium">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FileText className="w-10 h-10 mb-4" />
              <p className="text-lg font-medium">No blog posts found. Be the first to create one!</p>
            </div>
          ) : (
            // Reverted to a flex-based layout for cards
            <div className="flex flex-col items-center"> {/* Allows cards to stack vertically */}
              {posts.map((post) => {
                const media = mediaMap[post.id];
                const showSeeMore = post.content.length > 200;

                return (
                  <div
                    key={post.id}
                           className="bg-white flex flex-col lg:flex-row shadow-lg rounded-xl overflow-hidden border border-gray-100 mb-6 w-full max-w-4xl transform hover:scale-[1.02] transition-transform duration-200 ease-in-out"
                  >
                    {media ? (
                      media.images.length > 0 ? (
                        <img
                          src={
                            media.images[0].startsWith("data:")
                              ? media.images[0]
                              : `${baseURL}/${media.images[0]}`
                          }
                          alt={`Post ${post.id} preview`}
                                       className="w-full lg:w-1/3 h-48 lg:h-auto object-cover rounded-t-xl lg:rounded-tr-none lg:rounded-bl-xl"
                          onError={(e) => {
                            (e.target as HTMLImageElement).onerror = null; 
                            (e.target as HTMLImageElement).src = "https://placehold.co/600x400/E2E8F0/A0AEC0?text=Image+Load+Error"; // Placeholder on error
                          }}
                        />
                      ) : media.videos.length > 0 ? (
                        <video
                          className="w-full lg:w-1/3 h-48 lg:h-auto object-cover rounded-t-xl lg:rounded-tr-none lg:rounded-bl-xl"
                          controls
                          preload="metadata"
                        >                            <source
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
                        <div className="w-full lg:w-1/3 h-48 lg:h-auto bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-xl lg:rounded-tr-none lg:rounded-bl-xl">
                          <ImageOff className="w-12 h-12" />
                        </div>
                      )
                    ) : (
                      <div className="w-full lg:w-1/3 h-48 lg:h-auto bg-gray-100 flex items-center justify-center text-gray-400 animate-pulse rounded-t-xl lg:rounded-tr-none lg:rounded-bl-xl">
                        <Loader2 className="animate-spin w-10 h-10" />
                      </div>
                    )}

                    {/* Text Content - takes full width on small, 2/3 on large */}
                    <div className="p-5 flex flex-col flex-grow w-full lg:w-2/3">
                      <h2 className="text-xl font-bold text-gray-800 mb-2 leading-tight">{post.title}</h2>
                      <p className="text-xs text-gray-500 mb-3">
                        Published: {new Date(post.created_at).toLocaleString("en-KE", { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                      <p className="text-gray-700 text-sm mb-4 flex-grow">
                        {truncate(post.content, 150)}
                      </p>

                      {showSeeMore && (
                        <Link
                          href={`/BlogPostForm/${post.id}`} 
                          className="mt-auto inline-flex items-center justify-center self-start px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
                        >
                          Read More <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </div>
  );
};

export default BlogListPage;

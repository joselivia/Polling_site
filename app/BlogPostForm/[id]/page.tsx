"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { baseURL } from "@/config/baseUrl";


interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  images: string[];
  videos: string[];
}

const linkify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split("\n").map((line, i) => (
    <p key={i} className="mb-3 text-gray-800">
      {line.split(urlRegex).map((part, index) =>
        urlRegex.test(part) ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {part}
          </a>
        ) : (
          part
        )
      )}
    </p>
  ));
};

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${baseURL}/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.error("❌ Error loading post:", err));
  }, [id]);

  if (!post) return <p className="text-center mt-10">Loading blog...</p>;

  return (
    <div className="max-w-full mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.created_at).toLocaleString("en-KE")}
      </p>
      {post.images?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Images</h3>
          <div className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-400">
            {post.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Post image ${idx}`}
                className="h-64 w-auto object-cover rounded shadow-sm flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}
      {post.videos?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Videos</h3>
          <div className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-400">
            {post.videos.map((vid, idx) => (
              <video
                key={idx}
                src={vid}
                className="h-64 w-auto object-cover rounded shadow-md flex-shrink-0"
                controls
                preload="metadata"
              />
            ))}
          </div>
        </div>
      )}
      <div className="prose prose-lg max-w-none text-gray-900">
        {linkify(post.content)}
      </div>
    </div>
  );
};

export default BlogDetailsPage;

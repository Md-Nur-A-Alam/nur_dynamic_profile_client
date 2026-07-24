"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/dashboard/DataTable";

export default function CommentsDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // In a real app we'd need an admin endpoint to get ALL comments. 
      // The current backend gets comments by postId. We'll use a new admin route.
      // Wait, let's check if there's an endpoint to get all comments for moderation.
      // If not, we will display a placeholder until the backend supports it.
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/social/comments`, {
        credentials: 'include'
      });
      if (res.ok) {
        const json = await res.json();
        setData(json.data || json);
      } else {
        setData([]); // maybe 404
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/social/comments/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-mono text-text-primary capitalize">Comments Moderation</h1>
      </div>

      {loading ? (
        <div className="text-text-muted animate-pulse">Loading...</div>
      ) : (
        <DataTable
          data={data}
          onEdit={() => alert("Editing comments is not supported in moderation view.")}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

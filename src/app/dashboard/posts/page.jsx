"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/dashboard/DataTable";
import { CrudForm } from "@/components/dashboard/CrudForm";
import { Button } from "@/components/ui/Button";
import { toast } from "react-toastify";

// define schema explicitly for Posts, as they aren't part of portfolio models
const postSchema = [
  { name: 'title', type: 'string' },
  { name: 'description', type: 'string' },
  { name: 'location', type: 'string' },
  { name: 'feeling', type: 'string' },
  { name: 'attachmentImages', type: 'array-of-strings' },
  { name: 'visibility', type: 'enum', options: ['public', 'private'] }
];

export default function PostsDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/social/posts`, {
        credentials: 'include'
      });
      if (res.ok) {
        const json = await res.json();
        setData(json.data || (Array.isArray(json) ? json : []));
      } else {
        toast.error("Failed to fetch data.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Could not fetch data.");
    }
    setLoading(false);
  };

  const handleSave = async (formData) => {
    const isEditing = !!formData._id;
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/social/posts${isEditing ? `/${formData._id}` : ''}`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsFormOpen(false);
        setEditingItem(null);
        fetchData();
        toast.success("Post saved successfully!");
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to save.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Could not save post.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/social/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        fetchData();
        toast.success("Post deleted successfully!");
      } else {
        toast.error("Failed to delete post.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Could not delete post.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-mono text-text-primary capitalize">Posts</h1>
        {!isFormOpen && (
          <Button onClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}>Create Post</Button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-surface p-6 rounded-md border border-border-subtle">
          <CrudForm 
            collectionName="__posts" // intercept schema inside CrudForm or pass it directly? 
            // Wait, CrudForm relies on schemaMap.js. I'll mock schemaMap for __posts.
            initialData={editingItem} 
            onSave={handleSave} 
            onCancel={() => {
              setIsFormOpen(false);
              setEditingItem(null);
            }} 
          />
        </div>
      ) : (
        loading ? (
          <div className="text-text-muted animate-pulse">Loading...</div>
        ) : (
          <DataTable 
            data={data} 
            onEdit={(item) => {
              setEditingItem(item);
              setIsFormOpen(true);
            }} 
            onDelete={handleDelete} 
          />
        )
      )}
    </div>
  );
}

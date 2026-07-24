"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/dashboard/DataTable";
import { CrudForm } from "@/components/dashboard/CrudForm";
import { Button } from "@/components/ui/Button";

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/social/posts`);
      if (res.ok) {
        const json = await res.json();
        // The endpoint returns { data: [...posts] }
        setData(json.data || []);
      }
    } catch (err) {
      console.error(err);
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
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsFormOpen(false);
        setEditingItem(null);
        fetchData();
      } else {
        alert("Failed to save.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/social/posts/${id}`, {
        method: 'DELETE'
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

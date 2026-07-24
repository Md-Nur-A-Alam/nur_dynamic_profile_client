"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DataTable } from "@/components/dashboard/DataTable";
import { CrudForm } from "@/components/dashboard/CrudForm";
import { Button } from "@/components/ui/Button";

export default function PortfolioCollectionPage() {
  const { collection } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [collection]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000'}/api/portfolio/${collection}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        setError("Failed to fetch data.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Could not fetch data.");
    }
    setLoading(false);
  };

  const handleSave = async (formData) => {
    const isEditing = !!formData._id;
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000'}/api/portfolio/${collection}${isEditing ? `/${formData._id}` : ''}`;
    const method = isEditing ? 'PUT' : 'POST';
    setError(null);

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
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.message || "Failed to save.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Could not save data.");
    }
  };

  const handleDelete = async (id) => {
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000'}/api/portfolio/${collection}/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchData();
      } else {
        setError("Failed to delete item.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Could not delete data.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-mono text-text-primary capitalize">{collection}</h1>
        {!isFormOpen && (
          <Button onClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
            setError(null);
          }}>Create New</Button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-surface-raised border border-accent-wrong rounded-md text-accent-wrong text-sm font-mono" role="alert">
          {error}
        </div>
      )}

      {isFormOpen ? (
        <div className="bg-surface p-6 rounded-md border border-border-subtle">
          <CrudForm 
            collectionName={collection} 
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

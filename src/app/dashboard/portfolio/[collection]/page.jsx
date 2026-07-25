"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DataTable } from "@/components/dashboard/DataTable";
import { CrudForm } from "@/components/dashboard/CrudForm";
import { Button } from "@/components/ui/Button";
import { toast } from "react-toastify";

export default function PortfolioCollectionPage() {
  const { collection } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [collection]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/portfolio/${collection}`, {
        credentials: 'include'
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
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
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/portfolio/${collection}${isEditing ? `/${formData._id}` : ''}`;
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
        toast.success("Item saved successfully!");
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to save.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Could not save data.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/portfolio/${collection}/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        fetchData();
        toast.success("Item deleted successfully!");
      } else {
        toast.error("Failed to delete item.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Could not delete data.");
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
          }}>Create New</Button>
        )}
      </div>

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

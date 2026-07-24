"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function DataTable({ data, columns, onEdit, onDelete }) {
  if (!data || data.length === 0) {
    return <div className="p-8 text-center text-text-muted border border-border-subtle rounded-md bg-surface">No records found.</div>;
  }

  // Determine columns from first item if not provided
  const cols = columns || Object.keys(data[0]).filter(k => k !== '_id' && k !== '__v' && k !== 'createdAt' && k !== 'updatedAt').slice(0, 5);

  return (
    <div className="overflow-x-auto border border-border-subtle rounded-md bg-surface">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-text-muted uppercase bg-bg-base border-b border-border-subtle">
          <tr>
            {cols.map(col => (
              <th key={col} className="px-4 py-3">{col}</th>
            ))}
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row._id || idx} className="border-b border-border-subtle hover:bg-surface-raised transition-colors">
              {cols.map(col => {
                let val = row[col];
                if (Array.isArray(val)) val = val.length + ' items';
                if (typeof val === 'object' && val !== null) val = 'Object';
                if (typeof val === 'boolean') val = val ? 'Yes' : 'No';
                return (
                  <td key={col} className="px-4 py-3 text-text-primary whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                    {val}
                  </td>
                );
              })}
              <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                <Button variant="outline" size="sm" onClick={() => onEdit(row)}>Edit</Button>
                <Button variant="outline" size="sm" onClick={() => {
                  if (confirm("Are you sure you want to delete this item?")) {
                    onDelete(row._id);
                  }
                }} className="text-text-error hover:bg-text-error hover:text-bg-base">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { authClient } from "@/lib/auth-client";

export function Uploader({ fileType = 'image', onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [provider, setProvider] = useState(fileType === 'image' ? 'imgbb' : 'cloudinary');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', fileType);
      formData.append('provider', provider);

      // get current session token
      const session = await authClient.getSession();
      
      // We will rely on cookies being sent automatically, but we can also use fetch with credentials
      const res = await fetch(`http://localhost:8000/api/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      
      const data = await res.json();
      
      if (res.ok) {
        onUploadSuccess(data.url);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      setError('Upload error occurred');
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-2 p-4 border border-border-subtle rounded-md bg-surface">
      <div className="flex items-center gap-4">
        <input 
          type="file" 
          ref={fileInputRef}
          accept={fileType === 'image' ? "image/*" : "application/pdf"}
          onChange={handleFileChange}
          className="text-sm text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-bg-base file:text-accent-accepted hover:file:bg-surface-raised"
        />
        {fileType === 'image' && (
          <select 
            value={provider} 
            onChange={e => setProvider(e.target.value)}
            className="px-3 py-2 bg-bg-base border border-border-subtle rounded-md text-text-primary text-sm focus:outline-none focus:border-accent-accepted"
          >
            <option value="imgbb">ImgBB (Image)</option>
            <option value="cloudinary">Cloudinary (Image)</option>
          </select>
        )}
        {fileType === 'pdf' && (
          <span className="text-sm text-text-muted">Cloudinary (PDF)</span>
        )}
      </div>
      {error && <p className="text-xs text-text-error">{error}</p>}
      <Button 
        type="button" 
        onClick={handleUpload} 
        disabled={!file || uploading}
        className="w-fit"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  );
}

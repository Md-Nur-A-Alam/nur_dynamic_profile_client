"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { collectionSchemas } from "@/lib/schemaMap";
import { VerdictPill } from "@/components/ui/VerdictPill";

import { Uploader } from "@/components/shared/Uploader";

export function CrudForm({ collectionName, initialData, onSave, onCancel }) {
  const schema = collectionSchemas[collectionName] || [];
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Initialize empty form data
      const init = {};
      schema.forEach(field => {
        if (field.type === 'array-of-strings') init[field.name] = [];
        else if (field.type === 'array-of-objects') init[field.name] = [];
        else if (field.type === 'number') init[field.name] = 0;
        else if (field.type === 'enum' && field.name === 'visibility') init[field.name] = 'public';
        else init[field.name] = '';
      });
      setFormData(init);
    }
  }, [initialData, schema]);

  const handleChange = (e, field) => {
    let val = e.target.value;
    if (field.type === 'number') val = Number(val);
    if (field.type === 'boolean') val = e.target.checked;
    
    setFormData(prev => ({
      ...prev,
      [field.name]: val
    }));
  };

  const handleArrayStringChange = (e, fieldName) => {
    const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      [fieldName]: arr
    }));
  };
  
  const handleVisibilityToggle = () => {
    setFormData(prev => ({
      ...prev,
      visibility: prev.visibility === 'public' ? 'private' : 'public'
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schema.map((field, idx) => {
          if (field.type === 'array-of-objects') {
            const arrData = formData[field.name] || [];
            return (
              <div key={idx} className="col-span-1 md:col-span-2 p-4 bg-bg-base border border-border-subtle rounded-md">
                <label className="block text-sm font-medium text-text-primary mb-4 capitalize">{field.name}</label>
                {arrData.map((item, itemIdx) => (
                  <div key={itemIdx} className="mb-4 p-4 bg-surface border border-border-subtle rounded relative">
                    <button 
                      type="button" 
                      className="absolute top-2 right-2 text-xs text-text-error"
                      onClick={() => {
                        const newArr = [...arrData];
                        newArr.splice(itemIdx, 1);
                        setFormData(prev => ({ ...prev, [field.name]: newArr }));
                      }}
                    >Remove</button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(field.subFields || []).map((subField, subIdx) => (
                        <div key={subIdx}>
                          <label className="block text-xs text-text-muted capitalize">{subField.name}</label>
                          <input 
                            type="text" 
                            className="mt-1 w-full px-2 py-1 bg-bg-base border border-border-subtle rounded text-sm focus:border-accent-accepted"
                            value={item[subField.name] || ''}
                            onChange={(e) => {
                              const newArr = [...arrData];
                              newArr[itemIdx] = { ...newArr[itemIdx], [subField.name]: e.target.value };
                              setFormData(prev => ({ ...prev, [field.name]: newArr }));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const newItem = {};
                    (field.subFields || []).forEach(sf => { newItem[sf.name] = ''; });
                    setFormData(prev => ({ ...prev, [field.name]: [...arrData, newItem] }));
                  }}
                >+ Add Item</Button>
              </div>
            );
          }

          if (field.name === 'visibility' || field.name === 'status') {
            const isAccepted = formData[field.name] === 'public' || formData[field.name] === 'live' || formData[field.name] === 'live-in-progress' || formData[field.name] === 'ieee-published';
            const label = formData[field.name] || (field.name === 'visibility' ? 'public' : 'pending');
            return (
              <div key={idx} className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-text-primary capitalize">{field.name}</label>
                <div 
                  onClick={() => {
                    if (field.name === 'visibility') {
                      handleVisibilityToggle();
                    } else if (field.options?.length) {
                      // simple cycle through options
                      const currIdx = field.options.indexOf(formData[field.name]);
                      const next = field.options[(currIdx + 1) % field.options.length];
                      setFormData(prev => ({ ...prev, [field.name]: next }));
                    }
                  }} 
                  className="cursor-pointer inline-block"
                >
                   <VerdictPill 
                     status={isAccepted ? 'ACCEPTED' : 'PENDING'} 
                     label={label.toUpperCase()} 
                   />
                </div>
              </div>
            );
          }

          if (field.type === 'enum') {
             return (
              <div key={idx} className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-text-primary capitalize">{field.name}</label>
                <select 
                  className="mt-1 w-full px-3 py-2 bg-bg-base border border-border-subtle rounded-md text-text-primary focus:outline-none focus:border-accent-accepted capitalize"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(e, field)}
                >
                  <option value="">Select {field.name}</option>
                  {(field.options || []).map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
             )
          }

          if (field.type === 'array-of-strings') {
            return (
              <div key={idx} className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-text-primary capitalize mb-2">{field.name}</label>
                
                {(field.name === 'image' || field.name === 'url' || field.name === 'attachmentImages' || field.name.toLowerCase().includes('image')) && (
                  <div className="mb-4">
                    <Uploader 
                      fileType={collectionName === 'documents' && field.name === 'url' ? 'pdf' : 'image'} 
                      onUploadSuccess={(url) => {
                        const current = formData[field.name] || [];
                        if (!current.includes(url)) {
                          setFormData(prev => ({ ...prev, [field.name]: [...current, url] }));
                        }
                      }} 
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-2">
                  {(formData[field.name] || []).map((item, i) => (
                    <span key={i} className="px-2 py-1 bg-surface-raised border border-border-subtle rounded text-xs flex items-center gap-1 text-text-primary break-all max-w-full">
                      {item}
                      <button type="button" onClick={() => {
                        const newArr = (formData[field.name] || []).filter((_, idx) => idx !== i);
                        setFormData(prev => ({ ...prev, [field.name]: newArr }));
                      }} className="text-text-muted hover:text-text-error ml-1 shrink-0">&times;</button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-bg-base border border-border-subtle rounded-md text-text-primary focus:outline-none focus:border-accent-accepted text-sm"
                  placeholder="Paste link and press Enter or comma..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      const val = e.target.value.trim();
                      if (val) {
                        const current = formData[field.name] || [];
                        if (!current.includes(val)) {
                          setFormData(prev => ({ ...prev, [field.name]: [...current, val] }));
                        }
                        e.target.value = '';
                      }
                    }
                  }}
                  onBlur={(e) => {
                    const val = e.target.value.trim();
                    if (val) {
                      const current = formData[field.name] || [];
                      if (!current.includes(val)) {
                        setFormData(prev => ({ ...prev, [field.name]: [...current, val] }));
                      }
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            );
          }
          
          if (field.type === 'boolean') {
             return (
               <div key={idx} className="flex items-center mt-6">
                 <input
                   type="checkbox"
                   checked={!!formData[field.name]}
                   onChange={(e) => handleChange(e, field)}
                   className="h-4 w-4 rounded bg-bg-base border-border-subtle text-accent-accepted focus:ring-accent-accepted"
                 />
                 <label className="ml-2 block text-sm font-medium text-text-primary capitalize">{field.name}</label>
               </div>
             );
          }

          return (
            <div key={idx} className={field.name.includes('description') || field.name.includes('summary') ? "col-span-1 md:col-span-2" : ""}>
              <label className="block text-sm font-medium text-text-primary capitalize mb-1">{field.name}</label>
              {(field.name === 'image' || field.name === 'url' || field.name === 'attachmentImages') && (
                <div className="mb-2">
                  <Uploader 
                    fileType={collectionName === 'documents' && field.name === 'url' ? 'pdf' : 'image'} 
                    onUploadSuccess={(url) => {
                      if (field.type === 'array-of-strings') {
                        const current = formData[field.name] || [];
                        setFormData(prev => ({ ...prev, [field.name]: [...current, url] }));
                      } else {
                        setFormData(prev => ({ ...prev, [field.name]: url }));
                      }
                    }} 
                  />
                  {formData[field.name] && typeof formData[field.name] === 'string' && (
                    <p className="text-xs text-text-muted mt-1 break-all">Current: {formData[field.name]}</p>
                  )}
                </div>
              )}
              {field.name.includes('description') || field.name.includes('summary') || field.name.includes('notes') ? (
                <textarea
                  className="w-full px-3 py-2 bg-bg-base border border-border-subtle rounded-md text-text-primary focus:outline-none focus:border-accent-accepted h-32"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(e, field)}
                />
              ) : (
                field.type !== 'array-of-strings' && field.type !== 'array-of-objects' && field.type !== 'enum' && field.type !== 'boolean' && (
                  <input
                    type={field.type === 'number' ? 'number' : 'text'}
                    className="w-full px-3 py-2 bg-bg-base border border-border-subtle rounded-md text-text-primary focus:outline-none focus:border-accent-accepted"
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(e, field)}
                  />
                )
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-border-subtle">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

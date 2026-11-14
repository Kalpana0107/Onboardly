import React, { useState } from 'react';
import api from '../api/config';
import Spinner from './Common/Spinner';

function FileUpload({ onSkillsExtracted }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === 'application/pdf') {
      setFile(dropped);
      setMessage(`Selected: ${dropped.name}`);
      setError(null);
    } else {
      setError('Please upload a PDF file only.');
      setFile(null);
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('No file selected!');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage('');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      // 1. Upload Resume
      const uploadRes = await api.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const candidateId = uploadRes.data.candidateId;
      if (!candidateId) {
        throw new Error('Upload succeeded but no Candidate ID was returned.');
      }

      setMessage('Resume uploaded successfully! Running skill extraction...');

      // 2. Extract Skills
      const extractRes = await api.post(`/api/extract/${candidateId}`);
      
      const skills = extractRes.data.result?.skills || [];
      setMessage('Resume parsed and skills extracted successfully!');
      
      if (onSkillsExtracted) {
        onSkillsExtracted(skills);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || 'Failed to process resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-500 rounded-xl text-red-700 dark:text-red-200 text-xs flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-600 dark:text-red-400 font-bold ml-2">✕</button>
        </div>
      )}

      {message && !error && (
        <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/80 dark:border-indigo-500/30 rounded-xl text-indigo-700 dark:text-indigo-300 text-xs">
          {message}
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center gap-3 transition-colors ${
          isDragging 
            ? 'bg-indigo-50/80 border-indigo-500 dark:bg-indigo-500/10' 
            : 'bg-slate-50/60 dark:bg-slate-950/20 border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-slate-600'
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-2xl shadow-xs">
          📄
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Drag &amp; drop your resume PDF here</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Supports PDF candidate files up to 10MB</p>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500">— or —</p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const selected = e.target.files[0];
            if (selected) {
              setFile(selected);
              setMessage(`Selected: ${selected.name}`);
              setError(null);
            }
          }}
          className="text-xs text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 hover:file:bg-slate-200 file:text-slate-700 dark:file:bg-slate-800 dark:hover:file:bg-slate-700 dark:file:text-slate-300 file:cursor-pointer transition-all"
        />

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="mt-3 w-full max-w-xs bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2.5 px-5 rounded-xl text-xs shadow-sm hover:shadow-md transition disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? <Spinner text="Processing..." /> : 'Upload & Extract Resume'}
        </button>
      </div>
    </div>
  );
}

export default FileUpload;

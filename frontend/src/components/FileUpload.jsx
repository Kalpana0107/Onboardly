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
        <div className="p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-xs flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 font-bold ml-2">✕</button>
        </div>
      )}

      {message && !error && (
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-300 text-xs">
          {message}
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center flex flex-col items-center gap-3 transition-colors ${
          isDragging ? 'bg-indigo-500/10 border-indigo-500' : 'bg-slate-950/20 border-slate-700 hover:border-slate-600'
        }`}
      >
        <span className="text-3xl">📄</span>
        <p className="text-sm text-slate-400">Drag &amp; Drop your resume PDF here</p>
        <p className="text-xs text-slate-500">— or —</p>

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
          className="text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-300 file:cursor-pointer hover:file:bg-slate-700"
        />

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="mt-2 w-full max-w-xs bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg text-xs shadow-md transition disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? <Spinner text="Processing..." /> : 'Upload & Extract Resume'}
        </button>
      </div>
    </div>
  );
}

export default FileUpload;

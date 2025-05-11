import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiCloud, FiX } from 'react-icons/fi';
import { Button, Spinner, Alert } from 'react-bootstrap';
import './UploadPage.css';

export default function UploadPage() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const pickFile = () => inputRef.current.click();

  const handleChosen = e => {
    setError('');
    setFile(e.target.files[0]);
  };

  /* ---------- send CSV to Flask --------------- */
  const uploadToServer = async () => {
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:5000/upload', form);
      // on success → go to charts page with returned JSON
      navigate('/charts', { state: { data } });
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uploadBg">
      <div className="card">
        {/* header */}
        <div className="header">
          <FiCloud size={32} />
          <div className="hdrText">
            <h2>Upload files</h2>
            <p>Select and upload the file of your choice</p>
          </div>
          <FiX size={20} className="close" />
        </div>

        {/* drop zone */}
        <label className="dropzone">
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={handleChosen}
            hidden
          />
          <FiCloud size={48} />
          <span className="dzMain">
            {file ? 'File selected' : 'Choose a file or drag & drop it here'}
          </span>
          <span className="dzSub">CSV only, up to 50 MB</span>
        </label>

        <Button
          className="browseBtn mb-3"
          variant="secondary"
          onClick={pickFile}
        >
          Browse File
        </Button>

        {/* selected file info */}
        {file && (
          <p className="text-center small">
            <strong>{file.name}</strong> &nbsp;–&nbsp;
            {(file.size / 1024).toFixed(1)} KB
          </p>
        )}

        {/* continue */}
        <Button
          variant="primary"
          disabled={!file || loading}
          onClick={uploadToServer}
        >
          {loading ? <Spinner animation="border" size="sm" /> : 'Continue'}
        </Button>

        {/* error */}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </div>
    </div>
  );
}

import React, { useState, useRef } from 'react';
import './photoupload.css'; // Importing normal CSS

const PhotoUpload = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');
  const [fileLabel, setFileLabel] = useState('Choose a photo');
  const [capturedFile, setCapturedFile] = useState(null);
  const [videoActive, setVideoActive] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setFileLabel(e.target.files[0].name);
      setCapturedFile(null); // Reset captured file if a new one is selected
      setPreviewSrc(URL.createObjectURL(e.target.files[0])); // Show preview
    } else {
      setFileLabel('Choose a photo');
      setPreviewSrc('');
    }
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setVideoActive(true);
      setCapturedFile(null); // Reset file if capturing a new photo
      setPreviewSrc('');
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access the camera.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'captured.jpg', { type: 'image/jpeg' });
        setCapturedFile(file);
        setPreviewSrc(URL.createObjectURL(blob));
        setStatusMessage('Photo captured!');
        stopCamera();
      }
    }, 'image/jpeg', 0.95);
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setVideoActive(false);
  };

  const uploadImage = async () => {
    let fileToUpload = capturedFile || (fileInputRef.current?.files.length ? fileInputRef.current.files[0] : null);

    if (!fileToUpload) {
      alert('Please select or capture a photo.');
      return;
    }

    setStatusMessage('Fetching location...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        if (!latitude || !longitude) {
          alert('Failed to get location.');
          setStatusMessage('Location unavailable.');
          return;
        }

        const formData = new FormData();
        formData.append('image', fileToUpload);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        try {
          setStatusMessage('Uploading... Please wait.');
          const response = await fetch("http://localhost:5000/upload", { 
            method: "POST", 
            body: formData 
          });
          if (!response.ok) throw new Error(`Server error: ${response.status}`);

          const result = await response.json();
          setPreviewSrc(result.imageUrl);
          alert(`Upload successful! Image URL: ${result.imageUrl}`);
          setStatusMessage('Upload successful!');
          setPreviewSrc(result.imageUrl);
        } catch (error) {
          console.error('Upload failed:', error);
          alert('Upload failed. Please try again.');
          setStatusMessage('Upload failed.');
        }
      }, (error) => {
        console.error('Geolocation error:', error);
        alert('Failed to get location: ' + error.message);
        setStatusMessage('Geolocation error.');
      }, { timeout: 10000 }); // Timeout added for safety
    } else {
      alert('Geolocation is not supported by this browser.');
      setStatusMessage('Geolocation not supported.');
    }
  };

  return (
    <div className="container">
      <div className="photo-upload-box">
        <h2>Upload Photo with Location</h2>

        {/* Custom File Input */}
        <label className="file-upload-label">
          <span>{fileLabel}</span>
          <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleFileChange} />
        </label>

        {/* Buttons */}
        <div className="button-group">
          <button onClick={openCamera} className="button green">Take Photo</button>
          <button onClick={uploadImage} className="button blue">Upload</button>
        </div>

        {/* Status Message */}
        <div className="status-message">{statusMessage}</div>

        {/* Image Preview */}
        {previewSrc && <img src={previewSrc} alt="Uploaded Preview" className="image-preview" />}

        {/* Camera Preview */}
        {videoActive && (
          <div className="video-container">
            <video ref={videoRef} autoPlay />
            <div className="button-group">
              <button onClick={capturePhoto} className="button purple">Capture</button>
              <button onClick={stopCamera} className="button red">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;

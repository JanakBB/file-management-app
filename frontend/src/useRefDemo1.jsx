import React, { useRef } from 'react';

function FileUploader() {
  // Create a ref to hold the file input element
  const fileInputRef = useRef(null);

  // Handler to trigger file input click
  const onUploadFilesClick = () => {
    fileInputRef.current.click();
  };

  // Handler to process selected files
  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log('Selected files:', files[0].name);
  };

  return (
    <div>
      {/* Button to trigger file upload */}
      <button onClick={onUploadFilesClick}>Upload Files</button>
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        // style={{ display: 'none' }} // Hide the input
        onChange={handleFileChange} // Handle file selection
        multiple // Allow multiple files (optional)
      />
    </div>
  );
}

export default FileUploader;
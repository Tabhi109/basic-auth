// components/ImageUploadForm.tsx
import { useState } from 'react';

interface ImageUploadFormProps {
  sessionToken: string;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ sessionToken }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error('No file selected for upload.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageBase64 = reader.result?.toString().split(',')[1];

        const response = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionToken}`,
          },
          body: JSON.stringify({
            image: imageBase64,
          }),
        });

        if (response.ok) {
          alert('Image uploaded successfully.');
        } else {
          console.error('Image upload failed.');
        }
      };

      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold mb-4">Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="w-full px-4 py-2 text-white bg-blue-500 rounded-md">
        Upload
      </button>
    </div>
  );
};

export default ImageUploadForm;

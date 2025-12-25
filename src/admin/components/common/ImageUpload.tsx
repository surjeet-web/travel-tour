import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '../../../utils/supabase';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  bucket?: string;
  accept?: string[];
  maxSize?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  bucket = 'images',
  accept = ['image/*'],
  maxSize = 5 * 1024 * 1024, // 5MB
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImage = useCallback(async (file: File) => {
    try {
      setUploading(true);
      setUploadProgress(0);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onChange(data.publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [bucket, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        uploadImage(acceptedFiles[0]);
      }
    },
    accept: accept as any,
    maxSize,
    multiple: false,
    onDropRejected: (rejectedFiles) => {
      console.error('File rejected:', rejectedFiles);
    },
  });

  const removeImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="space-y-2">
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-blue-600 animate-pulse" />
            <div className="text-blue-600">
              Uploading... {Math.round(uploadProgress)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div>
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {isDragActive
                ? 'Drop the image here...'
                : 'Drag & drop an image here, or click to select'}
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </div>
        )}
      </div>

      {value && (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="max-w-xs h-32 object-cover rounded-lg shadow-md"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
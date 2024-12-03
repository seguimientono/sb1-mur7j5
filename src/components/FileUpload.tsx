import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileChange: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Archivos</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
              <span>Subir archivos</span>
              <input
                type="file"
                className="sr-only"
                multiple
                onChange={(e) => onFileChange(Array.from(e.target.files || []))}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
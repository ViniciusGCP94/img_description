import React from 'react'
import { Upload } from 'lucide-react'
import ImagePreview from '../ImagePreview/ImagePreview'


const UploadImage = ({ 
  onImageUpload, 
  imagePreview, 
  onAnalyze, 
  onReset, 
  isAnalyzing, 
  fileInputRef,
  isDragOver,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="text-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onImageUpload}
          accept="image/*"
          className="hidden"
          id="image-upload"
        />
      
        {!imagePreview ? (
          <div
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
            className={`cursor-pointer flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-200 ${
              isDragOver 
                ? 'border-blue-500 bg-blue-100 scale-105' 
                : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center w-full"
            >
              <div className={`transition-all duration-200 ${isDragOver ? 'scale-110' : ''}`}>
                <Upload className={`h-12 w-12 mb-4 ${isDragOver ? 'text-blue-600' : 'text-blue-500'}`} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDragOver ? 'text-blue-800' : 'text-gray-700'}`}>
                {isDragOver ? 'Solte a imagem aqui!' : 'Faça upload de uma imagem'}
              </h3>
              <p className={`${isDragOver ? 'text-blue-600' : 'text-gray-500'}`}>
                {isDragOver ? 'Solte para fazer upload' : 'Clique aqui ou arraste uma imagem para começar'}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Formatos suportados: JPG, PNG, GIF, WebP (máx. 10MB)
              </p>
            </label>
          </div>
        ) : (
          <ImagePreview 
            imagePreview={imagePreview}
            onAnalyze={onAnalyze}
            onReset={onReset}
            isAnalyzing={isAnalyzing}
          />
        )}
      </div>
    </div>
  );
};


export default UploadImage

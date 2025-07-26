import React from 'react'
import { Upload, ImagePreview } from 'lucide-react'

const UploadImage = ({ onImageUpload, imagePreview, onAnalyze, onReset, isAnalyzing, fileInputRef }) => {
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
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center justify-center p-8 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
        >
          <Upload className="h-12 w-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Faça upload de uma imagem
          </h3>
          <p className="text-gray-500">
            Clique aqui ou arraste uma imagem para começar
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Formatos suportados: JPG, PNG, GIF, WebP
          </p>
        </label>
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
  )
}

export default UploadImage

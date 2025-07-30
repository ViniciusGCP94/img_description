import React from 'react'
import Header from './components/Header/Header'
import UploadImage from './components/UploadImage/UploadImage'
import useImageUpload from './hooks/useImageUpload';
import DescriptionResult from './components/DescriptionResult/DescriptionResult'
import Footer from './components/Footer/Footer';

function App() {
    const {
      imagePreview,
      isAnalyzing,
      description,
      fileInputRef,
      handleImageUpload,
      analyzeImage,
      resetImage,
      isDragOver,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop
    } = useImageUpload()

    return (
      <>
        <Header />
        <UploadImage
          onImageUpload={handleImageUpload}
          imagePreview={imagePreview}
          onAnalyze={analyzeImage}
          onReset={resetImage}
          isAnalyzing={isAnalyzing}
          fileInputRef={fileInputRef}
          isDragOver={isDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <DescriptionResult description={description} />
        <Footer />
      </>
    )
}

export default App

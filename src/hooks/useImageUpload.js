import { useState, useRef } from 'react';

const useImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Função auxiliar para processar arquivo (tanto upload quanto drop)
  const processImageFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setError('');
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Limpar descrição anterior
      setDescription('');
      return true;
    } else {
      setError('Por favor, selecione apenas arquivos de imagem.');
      setSelectedImage(null);
      setImagePreview(null);
      return false;
    }
  };

  // Handler para upload via input file
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    processImageFile(file);
  };

  // === DRAG & DROP HANDLERS ===
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (!processImageFile(file)) {
        setError('Por favor, solte apenas arquivos de imagem.');
      }
    }
  };

  // Função para analisar imagem (simular IA)
  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    setError('');
    
    try {
      // Simular análise de IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Exemplo de descrição gerada
      const sampleDescription = "Uma pessoa usando óculos de sol está sentada em um banco de madeira em um parque. Ao fundo, há árvores verdes e um céu azul claro. A pessoa veste uma camiseta azul e jeans. A iluminação natural sugere que a foto foi tirada durante o dia.";
      
      setDescription(sampleDescription);
    } catch (err) {
      console.error(err)
      setError('Erro ao analisar a imagem. Tente novamente.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Função para resetar tudo
  const resetImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDescription('');
    setError('');
    setIsDragOver(false); // Importante: resetar o estado de drag
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    selectedImage,
    imagePreview,
    description,
    isAnalyzing,
    error,
    isDragOver, 
    fileInputRef,
    handleImageUpload,
    analyzeImage,
    resetImage,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop
  };
};

export default useImageUpload;
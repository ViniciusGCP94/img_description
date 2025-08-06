import { useState, useRef } from 'react';

const useImageUpload = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);


  const getImageMimeType = (imagePreview) => {
    if (imagePreview.startsWith('data:image/png')) return 'image/png';
    if (imagePreview.startsWith('data:image/jpeg')) return 'image/jpeg';
    if (imagePreview.startsWith('data:image/webp')) return 'image/webp';
    return 'image/jpeg'; 
  };

  // Handler para upload via input file
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setDescription(''); 
      };
      reader.readAsDataURL(file);
    }
  };

  // === DRAG & DROP HANDLERS ===
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
          setDescription(''); 
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Função para analisar imagem (simular IA)
  const analyzeImage = async () => {
    setIsAnalyzing(true);
    setError('');
    
    try {
      // Converter imagem para base64 
      const base64Image = imagePreview.split(',')[1];      

      const API_KEY = import.meta.env.VITE_API_KEY;
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;      
    
      const requestBody = {
        contents: [{
          parts: [
            {
              text: "Analise esta imagem e forneça uma descrição detalhada e acessível em português. Descreva o que você vê de forma clara e objetiva, incluindo pessoas, objetos, cenário, cores e atmosfera. A descrição será usada como texto alternativo para acessibilidade em apps ou websites."
            },
            {
              inline_data: {
              mime_type: getImageMimeType(imagePreview),
              data: base64Image
              }
            }
          ]
        }]
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.json(); 
        console.error('Erro detalhado da API:', errorData);
        throw new Error(`Erro na API: ${response.status} - ${errorData.error?.message || JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      const generatedDescription = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedDescription) {
        throw new Error('Não foi possível gerar a descrição');
      }
      
      setDescription(generatedDescription.trim());
      
    } catch (err) {
      console.error('Erro ao analisar imagem:', err);
      setError('Erro ao analisar a imagem. Verifique sua conexão e tente novamente.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetImage = () => {
    setImagePreview(null);
    setDescription('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
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
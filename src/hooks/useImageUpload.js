import { useState, useRef } from 'react';

const useImageUpload = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

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

      const mimeMatch = imagePreview.match(/^data:(image\/\w+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      // Converter imagem para base64 
      const base64Image = imagePreview.split(',')[1];      

      const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'AlZaSyCDBIPEJ637Dru1e4KyMgMnyXH1etozDE0';
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;      
      
      const requestBody = {
        contents: [{
          parts: [
            {
              text: "Analise esta imagem e forneça uma descrição detalhada e acessível em português. Descreva o que você vê de forma clara e objetiva, incluindo pessoas, objetos, cenário, cores e atmosfera. A descrição será usada como texto alternativo para acessibilidade."
            },
            {
              inline_data: {
                mime_type: "image/jpeg", // ou "image/png" dependendo do tipo
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
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      
      // Extrair a descrição da resposta do Gemini
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

  // Função para resetar tudo
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
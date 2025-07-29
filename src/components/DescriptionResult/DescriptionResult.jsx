import React from 'react';
import { Eye, Copy } from 'lucide-react';

const DescriptionResult = ({ description, onCopy }) => {
  if (!description) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Eye className="h-5 w-5 text-blue-600" />
          Descrição Gerada
        </h3>
        
        <button
          onClick={onCopy}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Copy className="h-4 w-4" />
          Copiar
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
        <p className="text-gray-800 leading-relaxed">{description}</p>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Como usar:</h4>
        <p className="text-blue-700 text-sm">
          Copie esta descrição e use como texto alternativo (alt text) em suas imagens. 
          Isso ajudará pessoas que usam leitores de tela a entenderem o conteúdo visual do seu site.
        </p>
      </div>
    </div>
  );
};

export default DescriptionResult;
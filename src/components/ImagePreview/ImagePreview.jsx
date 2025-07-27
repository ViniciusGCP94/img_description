import React from 'react'
import { Image, Loader2 } from 'lucide-react'


const ImagePreview = ({ imagePreview, onAnalyze, onReset, isAnalyzing }) => {
    return (
        <div className="space-y-4">
            <div className="relative inline-block">
                <img
                    src={imagePreview}
                    alt="Imagem selecionada para análise"
                    className="max-w-full max-h-64 rounded-lg shadow-md"
                />
            </div>
    
            <div className="flex gap-3 justify-center">
                <button
                    onClick={onAnalyze}
                    disabled={isAnalyzing}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                    {isAnalyzing ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Analisando...
                    </>
                    ) : (
                    <>
                        <Image className="h-5 w-5" />
                        Gerar Descrição
                    </>
                    )}
                </button>
                
                <button
                    onClick={onReset}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                    Nova Imagem
                </button>
            </div>
        </div>
    )
}

export default ImagePreview

import React from 'react'
import { Eye, Check, AlertCircle } from 'lucide-react'

const Footer = () => {
    return (
        <div className="mt-8 text-center">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                Por que a acessibilidade web é importante?
                </h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex flex-col items-center p-4">
                        <div className="bg-purple-100 p-2 rounded-full mb-2">
                        <Eye className="h-5 w-5 text-purple-600" />
                        </div>
                        <h3 className="font-medium mb-1">Inclusão Visual</h3>
                        <p>Ajuda pessoas com deficiência visual a compreender imagens</p>
                    </div>
                    
                    <div className="flex flex-col items-center p-4">
                        <div className="bg-green-100 p-2 rounded-full mb-2">
                        <Check className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="font-medium mb-1">SEO Melhorado</p>
                        <p>Descrições ajudam motores de busca a indexar seu conteúdo</p>
                    </div>
                    
                    <div className="flex flex-col items-center p-4">
                        <div className="bg-blue-100 p-2 rounded-full mb-2">
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                        </div>
                        <p className="font-medium mb-1">Compliance</p>
                        <p>Atende diretrizes de acessibilidade web (WCAG)</p>
                    </div>
                </div>
            </div>
            <div className="bg-blue-600 text-white border-1 rounded-xl shadow-sm p-6"> 
                <span className='flex items-center justify-center gap-2'> Feito por
                    <a 
                    href="https://vinniedev.com.br/" target='_blank'
                    className="p-2 hover:bg-black rounded font-bold hover:underline hover:decoration-solid hover:transition-colors hover:duration-500"
                    >
                        Vinicius Pereira
                    </a>
                </span>
            </div>
        </div>
    )
}

export default Footer
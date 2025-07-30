import React from 'react'
import {Eye} from 'lucide-react'

const Header = () => {


    return (
        <div className="text-center mb-8">
            <div className=" flex flex-col justify-center items-center mb-4 lg:flex-row gap-5">
                <div className="bg-blue-600 p-3 rounded-full w-15 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl text-black font-bold text-gray-800">
                    Descritor de Imagens
                </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Gere descrições automáticas para suas imagens e melhore a acessibilidade do seu site web. 
                Perfeito para criar alt text descritivo e inclusivo.
            </p>
        </div>
    )
}

export default Header 
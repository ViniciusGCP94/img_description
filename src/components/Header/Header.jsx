import React from 'react'
/*import eye from '../../assets/images/icons8-eye-48.png'*/
import {Eye} from 'lucide-react'

const Header = () => {


    return (
        <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full mr-3">
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
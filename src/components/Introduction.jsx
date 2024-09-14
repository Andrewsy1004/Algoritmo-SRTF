
export const Introduction = () => {
    return (
        <section id="intro" className="relative bg-gradient-to-r from-blue-100 to-indigo-200 py-8">
            <div className="max-w-4xl mx-auto bg-white bg-opacity-90 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-4xl font-bold mb-6 text-center ">Introducción al Algoritmo SRTF</h2>

                <p className="text-xl leading-relaxed text-gray-700 mb-4 text-justify">
                    El algoritmo <strong>Shortest Remaining Time First (SRTF)</strong> es una variante de <strong>Shortest Job Next</strong> que permite la interrupción de un proceso en ejecución si llega otro con un tiempo de ejecución menor. Esto lo hace eficiente para evitar que procesos cortos esperen largos periodos de tiempo.
                    La clave de SRTF es que siempre ejecuta el proceso con el menor tiempo restante, lo que puede causar que los procesos largos se pospongan si constantemente llegan procesos más cortos.
                </p>

                {/* Botón decorativo */}
                <div className="text-center mt-8">
                    <a href="#example" className="inline-block px-8 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                        Ver Ejemplo
                    </a>
                </div>
            </div>

            {/* Decoración con círculos brillantes */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
            <div className="absolute bottom-0 left-8 w-40 h-40 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        </section>
    )
}

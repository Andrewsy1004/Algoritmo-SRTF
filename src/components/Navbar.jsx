
export const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg">

            <div className="flex justify-between items-center">
                <div className="text-lg font-bold">
                    Sistemas Operativos
                </div>

                <ul className="flex justify-end space-x-8">
                    <li><a href="#intro" className="hover:text-blue-200 transition duration-300">Introducción</a></li>
                    <li><a href="#example" className="hover:text-blue-200 transition duration-300">Ejemplo</a></li>
                    <li><a href="#simulation" className="hover:text-blue-200 transition duration-300">Simulación</a></li>
                </ul>

            </div>
        </nav>
    )
}

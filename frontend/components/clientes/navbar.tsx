"use client"
 
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuMobile from "./menuMobile";
import ToggleTheme from "./toggleTheme";
 
const Navbar = () => {
    const router = useRouter();
 
    return (
        <nav className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
            {/* Contenedor para el logo y el nombre */}
            <div
                className="flex items-center space-x-3"
                onClick={() => router.push("/")}
            >
                <div className="w-12 h-12 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center">
                    <img
                        src="/img/Logo1.jpg"
                        alt="Logo BioSumaq"
                        className="object-cover w-full h-full"
                    />
                </div>
                <h1 className="text-3xl">
                    Bio<span className="font-bold text-primary">Sumaq</span>
                </h1>
            </div>
 
            {/* Navegación para pantallas grandes */}
            <div className="items-center justify-between hidden sm:flex space-x-4">
                <Link href="/" className="hover:text-primary">Inicio</Link>
                <Link href="/about" className="hover:text-primary">Sobre nosotros</Link>
                <Link href="/productos" className="hover:text-primary">Productos</Link>
                <Link href="/novedades" className="hover:text-primary">Novedades</Link>
                <Link href="/recetas" className="hover:text-primary">Recetas</Link>
                <ToggleTheme />
            </div>
 
            {/* Navegación para pantallas pequeñas */}
            <div className="flex sm:hidden">
                <ToggleTheme />
                <MenuMobile />
            </div>
        </nav>
    );
}
 
export default Navbar;
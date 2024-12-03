"use client";
import * as React from "react";
import { Card } from "@/components/ui/card";
import { useGetProductos } from "@/api/productos/useGetProductos";
import { motion } from "framer-motion";

const ProductSlider: React.FC = () => {
    const { productos, loading, error } = useGetProductos();

    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (productos && productos.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % productos.length);
            }, 4000);

            return () => clearInterval(intervalId);
        }
    }, [productos]);

    if (loading) {
        return <p className="text-center text-gray-600">Cargando productos...</p>;
    }

    if (error) {
        return (
            <p className="text-center text-red-500">
                Hubo un error al cargar los productos: {error}
            </p>
        );
    }

    if (!productos || productos.length === 0) {
        return (
            <p className="text-center text-gray-600">
                No hay productos disponibles en este momento.
            </p>
        );
    }

    const getDisplayIndices = (currentIndex: number) => {
        const prevIndex = (currentIndex - 1 + productos.length) % productos.length;
        const nextIndex = (currentIndex + 1) % productos.length;
        return [prevIndex, currentIndex, nextIndex];
    };

    const isMobile = window.innerWidth <= 640;

    return (
        <div className="w-full max-w-7xl mx-auto overflow-hidden py-10 px-4">
            <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">
                Nuestros Productos
            </h2>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 px-4 ">
                {getDisplayIndices(currentIndex).map((index, position) => (
                    <motion.div
                        key={index}
                        className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 h-96 z-5 ${position === 0 || position === 2
                            ? "opacity-50 scale-90"
                            : "opacity-100 scale-100"
                            }`}
                        initial={{
                            opacity: 0,
                            x: position === 1 ? 0 : position === 0 ? (isMobile ? 0 : -300) : (isMobile ? 0 : 300),
                            scale: position === 1 ? 1 : 0.9,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: position === 1 ? 1.05 : 0.9,
                        }}
                        exit={{
                            opacity: 0,
                            x: position === 0 ? (isMobile ? 0 : -300) : position === 1 ? 0 : (isMobile ? 0 : 300),
                            scale: 0.9,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 25,
                            duration: isMobile ? 0.8 : 1.5,
                        }}
                    >
                        <Card className="h-full w-full rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={productos[index].imagen}
                                alt={productos[index].nombre}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 w-full bg-blue-500 bg-opacity-75 p-2 text-center text-white font-semibold rounded-lg">
                                <h3 className="text-xl truncate">{productos[index].nombre}</h3>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProductSlider;
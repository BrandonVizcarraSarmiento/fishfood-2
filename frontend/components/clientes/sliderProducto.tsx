"use client";
import * as React from "react";
import { Card } from "@/components/ui/card";
import { useGetProductos } from "@/api/productos/useGetProductos";

const ProductSlider: React.FC = () => {
    const { productos, loading, error } = useGetProductos();
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (productos.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % productos.length);
            }, 3000);

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

    if (productos.length === 0) {
        return (
            <p className="text-center text-gray-600">
                No hay productos disponibles en este momento.
            </p>
        );
    }

    const prevIndex = (currentIndex - 1 + productos.length) % productos.length;
    const nextIndex = (currentIndex + 1) % productos.length;

    return (
        <div className="w-full py-20 px-4">
            <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">
                Nuestros Productos
            </h2>
            <div className="relative flex items-center justify-center gap-6 flex-wrap">
                {/* Producto anterior */}
                <Card className="w-full sm:w-1/4 h-80 rounded-lg shadow-md transform scale-90 opacity-70 hover:scale-95 transition-all duration-500">
                    <div className="w-full h-full relative rounded-lg overflow-hidden">
                        <img
                            src={productos[prevIndex].imagen}
                            alt={productos[prevIndex].nombre}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 w-full bg-blue-500 bg-opacity-75 p-2">
                            <h3 className="text-center text-white text-lg font-semibold">
                                {productos[prevIndex].nombre}
                            </h3>
                        </div>
                    </div>
                </Card>

                {/* Producto actual */}
                <Card className="w-full sm:w-1/3 h-96 rounded-lg shadow-lg transform scale-105 hover:scale-110 transition-all duration-500 shadow-blue-800/50">
                    <div className="w-full h-full relative rounded-lg overflow-hidden">
                        <img
                            src={productos[currentIndex].imagen}
                            alt={productos[currentIndex].nombre}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 w-full bg-blue-500 bg-opacity-75 p-2">
                            <h3 className="text-center text-white text-xl font-bold">
                                {productos[currentIndex].nombre}
                            </h3>
                        </div>
                    </div>
                </Card>

                {/* Producto siguiente */}
                <Card className="w-full sm:w-1/4 h-80 rounded-lg shadow-md transform scale-90 opacity-70 hover:scale-95 transition-all duration-500">
                    <div className="w-full h-full relative rounded-lg overflow-hidden">
                        <img
                            src={productos[nextIndex].imagen}
                            alt={productos[nextIndex].nombre}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 w-full bg-blue-500 bg-opacity-75 p-2">
                            <h3 className="text-center text-white text-lg font-semibold">
                                {productos[nextIndex].nombre}
                            </h3>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProductSlider;
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { PencilIcon } from "lucide-react";
import { Receta } from "@/types/receta";
import EditarReceta from "./editarRecetas";
import { Paginacion } from "../../../components/paginacion";
import EliminarReceta from "./eliminarRecetas";
import { useGetRecetas } from "@/api/recetas/getRecetas";
import { Checkbox } from "@/components/ui/checkbox";

interface TablaRecetaProps {
    recetas: Receta[];
    setRecetas: React.Dispatch<React.SetStateAction<Receta[]>>;
}

const TablaReceta: React.FC<TablaRecetaProps> = ({ recetas, setRecetas }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [visibleColumns, setVisibleColumns] = useState(() => {
        const savedColumns = localStorage.getItem("visibleColumnsRecetas");
        return savedColumns ? JSON.parse(savedColumns) : {
            titulo: true,
            ingredientes: true,
            imagen: true,
            acciones: true,
        };
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(() => {
        const savedItemsPerPage = localStorage.getItem("itemsPerPageRecetas");
        return savedItemsPerPage ? parseInt(savedItemsPerPage) : 5;
    });

    const { refetch } = useGetRecetas(); // Obtener refetch para recargar datos

    useEffect(() => {
        localStorage.setItem("visibleColumnsRecetas", JSON.stringify(visibleColumns));
    }, [visibleColumns]);
    
    useEffect(() => {
        localStorage.setItem("itemsPerPageRecetas", itemsPerPage.toString());
    }, [itemsPerPage]);

    const mostrarToast = (mensaje: string) => {
        setToastMessage(mensaje);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            setToastMessage(null);
        }, 3000);
    };

    const filteredRecetas = recetas.filter((receta) =>
        receta.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRecetas.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleColumnVisibility = (column: keyof typeof visibleColumns) => {
        setVisibleColumns((prev: typeof visibleColumns) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    const eliminarReceta = (id: number) => {
        setRecetas((prev) => prev.filter((receta) => receta.id !== id));
        mostrarToast("La receta ha sido eliminada.");
    };

    const handleUpdateReceta = async (updatedReceta: Receta) => {
        try {
            await refetch(); // Recargar recetas desde la API
            mostrarToast("La receta ha sido actualizada.");
        } catch (error) {
            console.error("Error al actualizar la receta:", error);
        }
    };



    return (
        <div>
            {showToast && toastMessage && (
                <div className="fixed bottom-4 right-4 bg-gray-950 text-white py-2 px-4 rounded shadow-lg">
                    {toastMessage}
                </div>
            )}

            <div className="mb-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <Input
                    placeholder="Buscar receta..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-auto"
                />
                <Select>
                    <SelectTrigger className="w-full md:w-[240px]">
                        <span>Seleccionar columnas</span>
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(visibleColumns).map((col) => (
                            <div key={col} className="flex items-center px-2 py-1">
                                <Checkbox
                                    checked={visibleColumns[col as keyof typeof visibleColumns]}
                                    onCheckedChange={() => handleColumnVisibility(col as keyof typeof visibleColumns)}
                                />
                                <label className="ml-2 capitalize">{col}</label>
                            </div>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => setItemsPerPage(parseInt(value))}>
                    <SelectTrigger className="w-full md:w-[240px]">
                        <span>Filas por página</span>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="3">3 filas</SelectItem>
                        <SelectItem value="5">5 filas</SelectItem>
                        <SelectItem value="10">10 filas</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {visibleColumns.titulo && <TableHead>Título</TableHead>}
                        {visibleColumns.ingredientes && <TableHead>Ingredientes</TableHead>}
                        {visibleColumns.imagen && <TableHead>Imagen</TableHead>}
                        {visibleColumns.acciones && <TableHead>Acciones</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.map((receta) => (
                        <TableRow key={receta.id}>
                            {visibleColumns.titulo && <TableCell>{receta.titulo}</TableCell>}
                            {visibleColumns.ingredientes && <TableCell>{receta.ingredientes}</TableCell>}
                            {visibleColumns.imagen && (
                                <TableCell>
                                    <img
                                        src={receta.imagen}
                                        alt={receta.titulo}
                                        className="w-16 h-16 object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                                    />
                                </TableCell>
                            )}
                            {visibleColumns.acciones && (
                                <TableCell>
                                    <div className="flex gap-2">
                                        <EditarReceta receta={receta} onUpdate={handleUpdateReceta}>
                                            <Button variant="outline" size="sm">
                                                <PencilIcon className="h-4 w-4 mr-2" />
                                                <span>Editar</span>
                                            </Button>
                                        </EditarReceta>
                                        <EliminarReceta id={receta.id} onDelete={eliminarReceta} />
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Paginacion
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalItems={filteredRecetas.length}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
};

export default TablaReceta;
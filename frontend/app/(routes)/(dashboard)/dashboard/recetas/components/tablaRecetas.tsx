"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import EditarRecetas from "./editarRecetas";
import EliminarRecetas from "./eliminarRecetas";
import { Receta } from "@/types/receta";
import { Paginacion } from "../../../components/paginacion";

const TablaRecetas = ({ recetas }: { recetas: Receta[] }) => {
    const [recetasActuales, setRecetasActuales] = useState<Receta[]>(recetas);
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Estado para las columnas visibles
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
        const savedColumns = localStorage.getItem("visibleColumnsRecetas");
        return savedColumns ? JSON.parse(savedColumns) : { titulo: true, ingredientes: true, imagen: true, acciones: true };
    });

    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(() => {
        const savedItemsPerPage = localStorage.getItem("itemsPerPageRecetas");
        return savedItemsPerPage ? parseInt(savedItemsPerPage) : 5;
    });

    // Estado para el toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        setRecetasActuales(recetas);
    }, [recetas]);

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

    const handleEditarReceta = (recetaEditada: Receta) => {
        setRecetasActuales((prev) =>
            prev.map((receta) => (receta.id === recetaEditada.id ? recetaEditada : receta))
        );
    };

    const handleEliminarReceta = (id: number) => {
        setRecetasActuales((prev) => prev.filter((receta) => receta.id !== id));
        mostrarToast("Receta eliminada exitosamente");
    };

    const handleColumnVisibility = (column: string) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    const filteredRecetas = recetasActuales.filter((receta) =>
        receta.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRecetas.slice(indexOfFirstItem, indexOfLastItem);

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
                                    checked={visibleColumns[col]}
                                    onCheckedChange={() => handleColumnVisibility(col)}
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

            {recetasActuales.length === 0 ? (
                <p>No hay recetas disponibles. Agrega una nueva receta para empezar.</p>
            ) : (
                <>
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
                                        <TableCell className="flex space-x-2">
                                            <EditarRecetas receta={receta} onEditSuccess={handleEditarReceta} />
                                            <EliminarRecetas
                                                id={receta.id!}
                                                onDeleteSuccess={() => handleEliminarReceta(receta.id!)}
                                            />
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Paginacion
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        totalItems={filteredRecetas.length}
                        itemsPerPage={itemsPerPage}
                    />
                </>
            )}
        </div>
    );
};

export default TablaRecetas;
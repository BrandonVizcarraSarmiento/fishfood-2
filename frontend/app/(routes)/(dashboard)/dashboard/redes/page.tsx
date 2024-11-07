"use client";

import { useState, useEffect } from "react";
import { ToastProvider } from "@/components/ui/toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditRedSocial from "../../components/editRedSocialTab";
import { editRedes } from "@/api/redes/editRedes";
import { useGetRedes } from "@/api/redes/getRedes";

type PlatformType = "whatsapp" | "instagram" | "facebook";

const EditRedes = () => {
    const { redes, loading, error } = useGetRedes();
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [data, setData] = useState({
        whatsapp: "",
        instagram: "",
        facebook: ""
    });

    useEffect(() => {
        if (redes.length > 0) {
            setData({
                whatsapp: redes.find((r) => r.id === 1)?.linkRedes || "",
                instagram: redes.find((r) => r.id === 2)?.linkRedes || "",
                facebook: redes.find((r) => r.id === 3)?.linkRedes || ""
            });
        }
    }, [redes]);

    const handleSubmit = async (platform: PlatformType) => {
        const updatedLink = data[platform];
        const platformData = redes.find((r) => r.id === { whatsapp: 1, instagram: 2, facebook: 3 }[platform]);

        if (platformData && platformData.linkRedes !== updatedLink) {
            try {
                await editRedes(platformData, { ...platformData, linkRedes: updatedLink });
                setToastMessage("Enlace actualizado correctamente.");
            } catch (error) {
                console.error("Error al actualizar el enlace:", error);
                setToastMessage("Error al actualizar el enlace.");
            }
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    if (loading) return <p>Cargando redes sociales...</p>;
    if (error) return <p>Error al cargar las redes sociales: {error}</p>;

    return (
        <ToastProvider>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Editar Redes Sociales</h2>
                <Tabs>
                    <TabsList>
                        <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                        <TabsTrigger value="instagram">Instagram</TabsTrigger>
                        <TabsTrigger value="facebook">Facebook</TabsTrigger>
                    </TabsList>

                    <TabsContent value="whatsapp">
                        <EditRedSocial
                            platform="whatsapp"
                            url={data.whatsapp}
                            handleChange={(value) => setData({ ...data, whatsapp: value })}
                            handleSubmit={() => handleSubmit("whatsapp")}
                        />
                    </TabsContent>

                    <TabsContent value="instagram">
                        <EditRedSocial
                            platform="instagram"
                            url={data.instagram}
                            handleChange={(value) => setData({ ...data, instagram: value })}
                            handleSubmit={() => handleSubmit("instagram")}
                        />
                    </TabsContent>

                    <TabsContent value="facebook">
                        <EditRedSocial
                            platform="facebook"
                            url={data.facebook}
                            handleChange={(value) => setData({ ...data, facebook: value })}
                            handleSubmit={() => handleSubmit("facebook")}
                        />
                    </TabsContent>
                </Tabs>
            </div>

            {showToast && toastMessage && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
                    {toastMessage}
                </div>
            )}
        </ToastProvider>
    );
};

export default EditRedes;

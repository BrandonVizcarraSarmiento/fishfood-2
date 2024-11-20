import { useGetRedes } from "@/api/redes/getRedes";
import InfoProductoSkeleton from "@/components/skeleton/infoProductoSkeleton";
import { Separator } from "@/components/ui/separator";

interface InfoProductoProps {
    nombre: string;
    precio: number;
    descripcion: string;
}

const InfoProducto: React.FC<InfoProductoProps> = ({ nombre, precio, descripcion }) => {
    const { redes, loading, error } = useGetRedes();

    const enlaceRedSocial = redes.find((red) => red.id === 1)?.linkRedes;

    if (loading) return <InfoProductoSkeleton />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="space-y-4 p-4">
            <div className="text-center space-y-4">
                <h2 className="text-5xl font-bold">{nombre}</h2>
            </div>

            <div className="space-y-2">
                <p className="px-4 py-2 text-lg text-white font-bold bg-green-500 rounded-full w-fit">S/{precio}</p>
            </div>

            <Separator />
            <div>
                <h3 className="text-xl font-semibold pb-2">Descripción: </h3>
                <p>{descripcion}</p>
            </div>
            <Separator />

            {enlaceRedSocial && (
                <div className="flex justify-center mt-4">
                    <a
                        href={enlaceRedSocial}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-500 text-white rounded-md text-lg font-semibold hover:bg-blue-600"
                    >
                        Contáctanos
                    </a>
                </div>
            )}
        </div>
    );
};

export default InfoProducto;
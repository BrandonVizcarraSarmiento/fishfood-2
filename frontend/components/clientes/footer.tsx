import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer className="text-sm text-neutral-500 dark:text-neutral-400">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 md:justify-between min-[1320px]:px-0 dark:border-neutral-700">
          {/* Logo y Nombre */}
          <div className="flex gap-4">
            <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[50px] w-[50px] rounded-lg">
              <img
                src="/img/logo1.jpg"
                alt="Success"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <span className="uppercase text-black text-xl font-bold dark:text-white mt-3">
              FishFood
            </span>
          </div>

          {/* Sección de navegación */}
          <nav className="flex flex-col md:flex-row gap-4 text-center">
            <ul className="flex flex-col md:flex-grow gap-2">
              <li>
                <Link
                  href="/"
                  className="p-2 text-lg hover:text-black md:text-sm font-bold dark:hover:text-neutral-300 dark:text-white dark:font-bold"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="p-2 text-lg hover:text-black md:text-sm font-bold dark:hover:text-neutral-300 dark:text-white dark:font-bold"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/productos"
                  className="p-2 text-lg hover:text-black md:text-sm font-bold dark:hover:text-neutral-300 dark:text-white dark:font-bold"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/novedades"
                  className="p-2 text-lg hover:text-black md:text-sm font-bold dark:hover:text-neutral-300 dark:text-white dark:font-bold"
                >
                  Novedades
                </Link>
              </li>
            </ul>
          </nav>

          {/* Columna de Contactanos */}
          <div className="flex flex-col gap-2 md:w-1/4 md:items-end">
            <h3 className="text-lg font-bold text-black dark:text-white">
              Contáctanos
            </h3>
            <p className="text-sm dark:text-neutral-300">
              <strong>Teléfono:</strong> +51 970 262 955
            </p>
            <p className="text-sm dark:text-neutral-300">
              <strong>Email:</strong> biosumaq21@gmail.com
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 min-[1320px]:px-0">
            <p>© 2024 FishFood. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
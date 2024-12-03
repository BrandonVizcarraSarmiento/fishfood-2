"use client";

import { motion } from "framer-motion";
import { useGetAbout } from "@/api/about/getAbout";
import AboutSkeleton from "@/components/skeleton/aboutSkeleton";

const QuienesSomos = () => {
  const { about, loading, error } = useGetAbout();

  if (loading) return <AboutSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center px-4 md:px-20 lg:px-40 py-10 md:py-16 text-center my-20"
    >
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-sans font-extrabold mb-4"
      >
        ¿Quiénes somos?
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-base w-full max-w-2xl"
      >
        {about?.descripcion}
      </motion.p>
    </motion.div>
  );
};

export default QuienesSomos;
import { Skeleton } from "@/components/ui/skeleton";

const TestimoniosSkeleton = () => {
  return (
    <section className="flex flex-col items-center my-10 p-4">
      <h2 className="text-center text-2xl font-bold mb-6 md:text-3xl">Testimonios</h2>
      <div className="w-full max-w-4xl">
        {[...Array(3)].map((_, index) => (
          <div key={index}>
            <div className="flex flex-col items-start bg-slate-200 p-4 rounded-lg mb-4 dark:text-white dark:bg-transparent dark:hover:bg-slate-950 md:flex-row">
              {/* Skeleton del Avatar */}
              <Skeleton className="h-12 w-12 rounded-full mb-4 md:mb-0 md:mr-4" />
              <div className="w-full">
                {/* Skeleton del título */}
                <Skeleton className="h-6 w-11/12 mb-4 md:w-3/4" />
                {/* Skeleton de la descripción */}
                <Skeleton className="h-6 w-full md:w-11/12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimoniosSkeleton;
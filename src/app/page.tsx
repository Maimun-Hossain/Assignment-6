import { Suspense } from "react";
import Banner from "./components/homepage/Banner";
import Library from "./components/homepage/Library";

const page = () => {
  return (
    <div>
      <Banner></Banner>
      <Suspense
        fallback={
          <main
            className="flex min-h-[45vh] items-center justify-center text-sm text-gray-400"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="flex items-center gap-3">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#c6ff00] border-r-transparent" />
              Loading workouts…
            </div>
          </main>
        }
      >
        <Library></Library>
      </Suspense>
    </div>
  );
};

export default page;

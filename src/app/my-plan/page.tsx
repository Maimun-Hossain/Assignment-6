"use client";

import { DataContext } from "@/context/DataProvider";
import { useContext, useState } from "react";
import { Oswald, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaFireFlameCurved, FaRegClock, FaRegStar, FaXmark, FaChevronDown} from "react-icons/fa6";
import { toast } from "react-toastify";

const oswald = Oswald();
const inter = Inter();

const Page = () => {
  const {
    addPlan,
    SetAddPlan,
    addSave,
    SetAddSave,
    doneIds,
    SetDoneIds,
    isHydrated,
  } = useContext(DataContext);

  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<"duration" | "caloriesBurned" | "rating">("duration");

  const workouts = activeTab === "today" ? addPlan : addSave;
  const sortedWorkouts = [...workouts].sort((first, second) => first[sortBy] - second[sortBy]);

  const totalMinutes = addPlan.reduce((total, workout) => total + workout.duration,
    0);

  const totalCalories = addPlan.reduce((total, workout) => total + workout.caloriesBurned,
    0);

  const removeWorkout = (id: number) => {
    if(activeTab === "today"){
      SetAddPlan((currentPlan) =>
        currentPlan.filter((workout) => workout.id !== id),
      );

      SetDoneIds((currentIds) =>
        currentIds.filter((workoutId) => workoutId !== id),
      );
    }
    else{
      SetAddSave((currentSaved) =>
        currentSaved.filter((workout) => workout.id !== id),
      );
    }

    toast.info("Workout removed.");
  };

  const toggleDone = (id: number) => {
    const isDone = doneIds.includes(id);

    SetDoneIds((currentIds) =>
      isDone
        ? currentIds.filter((workoutId) => workoutId !== id)
        : [...currentIds, id],
    );

    toast.success(
      isDone ? "Workout marked as not done." : "Workout marked as done.",
    );
  };

  if(!isHydrated){
    return (
      <main
        className={`${inter.className} flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[#0d0f12] text-sm text-gray-400`}
        aria-live="polite"
        aria-busy="true"
      >
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#c6ff00] border-r-transparent" />
          Loading workouts…
        </div>
      </main>
    );
  }

  return (
    <main
      className={`${inter.className} min-h-screen w-full bg-[#0d0f12] py-6 text-white`}
    >
      <div className="mx-auto w-full max-w-[97%]">
        <header className="mb-4">
          <h1
            className={`${oswald.className} text-2xl font-bold uppercase leading-none tracking-[0.2px] sm:text-3xl`}
          >
            MY PLAN
          </h1>

          <p className="mt-2 text-xs leading-5 text-[#858b96] sm:text-sm">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </header>

        <section
          aria-label="Today's plan summary"
          className="mb-5 grid h-21 grid-cols-3 overflow-hidden rounded-[11px] border border-[#252933] bg-[#111318]"
        >
          <div className="flex flex-col justify-center px-4 sm:px-5">
            <p className="text-xs leading-none text-[#858b96] sm:text-sm">
              Exercises
            </p>

            <p
              className={`${oswald.className} mt-1 text-3xl font-bold leading-none text-[#c6ff00] sm:text-4xl`}
            >
              {addPlan.length}
            </p>
          </div>

          <div className="flex flex-col justify-center border-l border-[#252933] px-4 sm:px-5">
            <p className="text-xs leading-none text-[#858b96] sm:text-sm">
              Minutes
            </p>

            <p
              className={`${oswald.className} mt-1 text-3xl font-bold leading-none text-white sm:text-4xl`}
            >
              {totalMinutes}
            </p>
          </div>

          <div className="flex flex-col justify-center border-l border-[#252933] px-4 sm:px-5">
            <p className="text-xs leading-none text-[#858b96] sm:text-sm">
              Calories
            </p>

            <p
              className={`${oswald.className} mt-1 text-3xl font-bold leading-none text-white sm:text-4xl`}
            >
              {totalCalories}
            </p>
          </div>
        </section>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div
            className="flex h-9 items-center rounded-lg border border-[#20242c] bg-[#111318] p-0.5 sm:h-10"
            role="tablist"
            aria-label="Plan lists"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "today"}
              onClick={() => setActiveTab("today")}
              className={`h-full rounded-md px-3 text-xs font-medium transition sm:px-4 sm:text-sm ${
                activeTab === "today"
                  ? "border border-[#30343d] bg-[#1b1e25] text-white"
                  : "text-[#737985] hover:text-white"
              }`}
            >
              {`Today's Plan`}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
              className={`h-full rounded-md px-3 text-xs font-medium transition sm:px-4 sm:text-sm ${
                activeTab === "saved"
                  ? "border border-[#30343d] bg-[#1b1e25] text-white"
                  : "text-[#737985] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <label className="flex items-center gap-1.5">
            <span className="text-xs text-[#858b96] sm:text-sm">Sort by</span>

            <span className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as typeof sortBy)
                }
                aria-label="Sort workouts by"
                className="h-9 appearance-none rounded-lg border border-[#292d36] bg-[#111318] py-0 pl-3 pr-8 text-xs text-[#d1d4da] outline-none transition hover:bg-[#171a20] sm:h-10 sm:text-sm"
              >
                <option value="duration">Duration</option>
                <option value="caloriesBurned">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <FaChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#777d88]" />
            </span>
          </label>
        </div>

        {workouts.length === 0 ? (
          <section className="flex min-h-52 flex-col items-center justify-center rounded-[10px] border border-dashed border-[#252932] bg-[#0d0f12] px-5 text-center sm:min-h-56 sm:px-6">
            <p
              className={`${oswald.className} text-xl font-bold uppercase leading-none tracking-[0.3px] sm:text-2xl`}
            >
              NOTHING HERE YET
            </p>

            <p className="mt-2 max-w-md text-xs leading-5 text-[#858b96] sm:text-sm">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-5 flex min-h-9 items-center justify-center rounded-full bg-[#c6ff00] px-5 text-xs font-bold text-black transition hover:bg-[#b5eb00] sm:min-h-10 sm:text-sm"
            >
              Go to workouts
            </Link>
          </section>
        ) : (
          <div className="rounded-[10px] border border-[#20242b] bg-[#0f1115]">
            {sortedWorkouts.map((workout, index) => {
              const isDone = doneIds.includes(workout.id);

              return (
                <article
                  key={workout.id}
                  className={`flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center ${
                    index !== sortedWorkouts.length - 1
                      ? "border-b border-[#242831]"
                      : ""
                  }`}
                >
                  <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-[7px] sm:h-17.5 sm:w-27.5">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      sizes="110px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <h2
                        className={`${oswald.className} min-w-0 truncate text-lg font-bold uppercase leading-tight sm:text-xl`}
                      >
                        {workout.name}
                      </h2>

                      {isDone && (
                        <span className="shrink-0 rounded-full bg-[#c6ff00] px-2 py-0.5 text-[10px] font-bold uppercase text-black">
                          Done
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-[#858b96] sm:text-sm">
                      {workout.equipment}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-[#858b96] sm:gap-4 sm:text-sm">
                      <span className="flex items-center gap-1">
                        <FaRegClock className="text-xs text-[#c6ff00]" />
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-1">
                        <FaFireFlameCurved className="text-xs text-[#c6ff00]" />
                        {workout.caloriesBurned} kcal
                      </span>

                      <span className="flex items-center gap-1">
                        <FaRegStar className="text-xs text-[#c6ff00]" />
                        {workout.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <Link
                      href={`/exercise/${workout.id}`}
                      className="flex h-7 items-center rounded-full border border-[#30343d] px-3 text-[9px] font-medium text-[#c8cbd1] transition hover:border-[#656b77] hover:text-white sm:text-[10px]"
                    >
                      View Details
                    </Link>

                    {activeTab === "today" && (
                      <button
                        type="button"
                        onClick={() => toggleDone(workout.id)}
                        aria-pressed={isDone}
                        className="flex h-7 items-center gap-1.5 rounded-full bg-[#c6ff00] px-3.5 text-[9px] font-semibold text-black transition hover:bg-[#d5ff3f] sm:text-[10px]"
                      >
                        <FaCheck className="text-[9px] text-black" />

                        {isDone ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => removeWorkout(workout.id)}
                      aria-label={`Remove ${workout.name}`}
                      title="Remove workout"
                      className="flex h-7 w-6 items-center justify-center rounded-full text-xs text-[#858b96] transition hover:text-red-400"
                    >
                      <FaXmark />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;

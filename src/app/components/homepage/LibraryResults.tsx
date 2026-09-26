"use client";

import { useMemo, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import type { IData } from "@/types/datas.type";
import WorkCard from "../shared/WorkCard";

export default function LibraryResults({
  workoutData,
}: {
  workoutData: IData[];
}) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "duration" | "caloriesBurned" | "rating"
  >("duration");

  const visibleWorkouts = useMemo(() => {
    const search = query.trim().toLowerCase();
    return workoutData
      .filter(
        (workout) =>
          workout.name.toLowerCase().includes(search) ||
          workout.muscleGroups.some((muscle) =>
            muscle.toLowerCase().includes(search),
          ),
      )
      .sort((first, second) => first[sortBy] - second[sortBy]);
  }, [query, sortBy, workoutData]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex min-h-11 items-center gap-3 rounded-md border border-[#292c35] bg-[#15171d] px-3 text-gray-400 sm:w-80">
          <FaMagnifyingGlass aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search workouts or muscle groups"
            aria-label="Search workouts or muscle groups"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-gray-400">
          Sort by
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
            className="min-h-11 rounded-md border border-[#292c35] bg-[#15171d] px-3 text-white outline-none"
          >
            <option value="duration">Duration</option>
            <option value="caloriesBurned">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </div>
      {visibleWorkouts.length ? (
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleWorkouts.map((workout) => (
            <WorkCard key={workout.id} data={workout} />
          ))}
        </div>
      ) : (
        <p className="mb-10 border-y border-[#292c35] py-10 text-center text-sm text-gray-400">
          No workouts match that search.
        </p>
      )}
    </>
  );
}

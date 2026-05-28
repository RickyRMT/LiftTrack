import { useState } from "react";

function WorkoutLogger() {
  // Input states
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  // Array that stores all workout entries
  const [workouts, setWorkouts] = useState([]);

  function addWorkout() {
  // Trim inputs
  const cleanExercise = exercise.trim();
  const w = Number(weight);
  const r = Number(reps);

  // Regex: only letters and spaces allowed
  const exerciseValid = /^[A-Za-z\s]+$/.test(cleanExercise);

  // Number validation
  const numbersValid = w > 0 && r > 0;

  // Block invalid input
  if (!exerciseValid || !numbersValid) {
    alert("Invalid input: check exercise name and numbers (no negatives or symbols).");
    return;
  }

const normalizedExercise = cleanExercise.toLowerCase().trim();

const newWorkout = {
  id: crypto.randomUUID(),
  exercise: cleanExercise,          // for display
  exerciseKey: normalizedExercise,  // for grouping
  weight: w,
  reps: r,
  date: new Date().toLocaleDateString(),
};

  setWorkouts([...workouts, newWorkout]);

  setExercise("");
  setWeight("");
  setReps("");
}

const groupedByDate = workouts.reduce((acc, workout) => {
  const date = workout.date;
  const key = workout.exerciseKey; // 🔥 ONLY this

  if (!acc[date]) acc[date] = {};
  if (!acc[date][key]) {
    acc[date][key] = {
      displayName: workout.exercise,
      sets: [],
      totalVolume: 0,
    };
  }

  acc[date][key].sets.push(workout);
  acc[date][key].totalVolume += workout.weight * workout.reps;

  return acc;
}, {});

function formatExerciseName(name) {
  return name
    .toLowerCase()
    .trim()
    .split(" ")
    .filter(word => word !== "")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function deleteExercise(exercise) {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete ALL ${formatExerciseName(exercise)} sets? This cannot be undone.`
  );

  if (!confirmDelete) return;

  const updated = workouts.filter(
    (w) => w.exercise.trim().toLowerCase() !== exercise
  );

  setWorkouts(updated);
}

function deleteExercise(exercise) {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete ALL ${formatExerciseName(exercise)} sets? This cannot be undone.`
  );

  if (!confirmDelete) return;

  const updated = workouts.filter(
    (w) => w.exercise.trim().toLowerCase() !== exercise
  );

  setWorkouts(updated);
}

function deleteSet(id) {
  const updated = workouts.filter((w) => w.id !== id);
  setWorkouts(updated);
}

return (
  <div>
    <h2>Workout Logger</h2>

    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      <input
      type="text"
      placeholder="Exercise"
      value={exercise}
      onChange={(e) => {
        const value = e.target.value;
        // allow only letters + spaces while typing
        if (/^[A-Za-z\s]*$/.test(value)) {
            setExercise(value);
        }
      }}
    />

      <input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      <button onClick={addWorkout}>
        Add Set
      </button>
    </div>

    <hr />

    <div>
    {Object.entries(groupedByDate).map(([date, exercises]) => (
    <div key={date}>
        <h2>{date}</h2>

        {Object.entries(exercises).map(([exerciseName, data]) => (
        <div key={exerciseName}>
            <h3>{formatExerciseName(data.displayName)}</h3>

            <p>Total Volume: {data.totalVolume}</p>

            {data.sets.map((set) => (
            <div key={set.id}>
                {set.weight} x {set.reps}
            </div>
            ))}
        </div>
        ))}
    </div>
    ))}
</div>
  </div>
);

}

export default WorkoutLogger;
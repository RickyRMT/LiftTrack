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

const newWorkout = {
  id: crypto.randomUUID(),
  exercise: cleanExercise,
  weight: w,
  reps: r,
};

  setWorkouts([...workouts, newWorkout]);

  setExercise("");
  setWeight("");
  setReps("");
}

const groupedWorkouts = workouts.reduce((groups, workout) => {
  const key = workout.exercise.trim().toLowerCase();

  const volume = workout.weight * workout.reps;

  if (!groups[key]) {
    groups[key] = {
      sets: [],
      totalVolume: 0,
    };
  }

  groups[key].sets.push(workout);
  groups[key].totalVolume += volume;

  return groups;
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
  {Object.entries(groupedWorkouts).map(([exerciseName, data]) => (
    <div
      key={exerciseName}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{formatExerciseName(exerciseName)}</h3>

      <p>
        <strong>Total Volume:</strong> {data.totalVolume}
      </p>
      <button
      onClick={() => deleteExercise(exerciseName)}
      style={{ marginTop: "5px" }}
      >
        Delete Exercise
        </button>

      {data.sets.map((set, index) => (
  <div key={index} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <span>
      {set.weight} lbs × {set.reps} reps
    </span>

    <button
      onClick={() => deleteSet(set.id)}
    >
      Delete Set
    </button>
  </div>
))}
    </div>
  ))}
</div>
  </div>
);

}

export default WorkoutLogger;
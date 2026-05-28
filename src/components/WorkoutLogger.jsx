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
    exercise: cleanExercise,
    weight: w,
    reps: r,
  };

  setWorkouts([...workouts, newWorkout]);

  setExercise("");
  setWeight("");
  setReps("");
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
      {workouts.map((workout, index) => (
  <div key={index} style={{ padding: "8px", marginBottom: "5px", border: "1px solid #ddd", borderRadius: "6px" }}>
    <strong>{workout.exercise}</strong>
    <div>{workout.weight} lbs × {workout.reps}</div>

    <button
      onClick={() => {
        const updated = workouts.filter((_, i) => i !== index);
        setWorkouts(updated);
      }}
    >
      Delete
    </button>
  </div>
    ))}
    </div>
  </div>
);

}

export default WorkoutLogger;
import { useState } from "react";

function WorkoutLogger() {
  // Input states
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  // Array that stores all workout entries
  const [workouts, setWorkouts] = useState([]);

  function addWorkout() {

    // Prevent empty inputs
    if (exercise === "" || weight === "" || reps === "") {
      return;
    }

    // Create workout object
    const newWorkout = {
      exercise: exercise,
      weight: weight,
      reps: reps,
    };

    // Add new object into workouts array
    setWorkouts([...workouts, newWorkout]);

    // Clear inputs after submission
    setExercise("");
    setWeight("");
    setReps("");
  }

  return (
    <div>
      <h2>Workout Logger</h2>

      <input
        type="text"
        placeholder="Exercise"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
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

      <hr />

      {workouts.map((workout, index) => (
        <div key={index}>
          <p>
            {workout.exercise} — {workout.weight} lbs × {workout.reps}
          </p>
        </div>
      ))}
    </div>
  );
}

export default WorkoutLogger;
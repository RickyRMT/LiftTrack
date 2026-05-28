import { useState, useEffect } from "react";

function WorkoutLogger() {
  // Input states
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [editingSetId, setEditingSetId] = useState(null);
  const [editWeight, setEditWeight] = useState("");
  const [editReps, setEditReps] = useState("");

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
  const key = workout.exerciseKey;

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

function deleteExercise(exerciseKey) {
  setEditingSetId(null); 

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this entire exercise?"
  );

  if (!confirmDelete) return;

  setWorkouts((prev) =>
    prev.filter((w) => w.exerciseKey !== exerciseKey)
  );
}

function deleteSet(id) {
  setEditingSetId(null); 

  setWorkouts((prev) => prev.filter((w) => w.id !== id));
}

function duplicateSet(set) {
  setEditingSetId(null); 

  const newSet = {
    id: crypto.randomUUID(),
    exercise: set.exercise,
    exerciseKey: set.exerciseKey,
    weight: set.weight,
    reps: set.reps,
    date: set.date,
  };

  setWorkouts((prev) => [...prev, newSet]);
}

function startEdit(set) {
  setEditingSetId(set.id);
  setEditWeight(set.weight);
  setEditReps(set.reps);
}

function saveEdit() {
  const w = Number(editWeight);
  const r = Number(editReps);

  if (w <= 0 || r <= 0) {
    alert("Invalid values");
    return;
  }

  setWorkouts((prev) =>
    prev.map((set) =>
      set.id === editingSetId
        ? { ...set, weight: w, reps: r }
        : set
    )
  );

  setEditingSetId(null);
  setEditWeight("");
  setEditReps("");
}

useEffect(() => {
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setEditingSetId(null);
    }
  }

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);

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

    {Object.entries(exercises).map(([exerciseKey, group]) => (
      <div
        key={exerciseKey}
            style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "12px",
            marginBottom: "15px",
            backgroundColor: "#181236",
            color: "#ffffff"
        }}
        >
        {/* Header row */}
        <div
        style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 10px",
        marginBottom: "6px",
        backgroundColor: "#241a4d",
        borderRadius: "8px",
        transition: "0.15s ease",
        }}
        >
        <h3 style={{ margin: 0 }}>
            {formatExerciseName(group.displayName)}
        </h3>

        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            <button onClick={() => deleteExercise(exerciseKey)}>
            Delete Exercise
            </button>
        </div>
        </div>

        <p>
          <strong>Total Volume:</strong> {group.totalVolume}
        </p>

        {/* Sets */}
        {group.sets.map((set) => (
            <div className="setRow"
            key={set.id}
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 10px",
                marginBottom: "6px",
                backgroundColor: "#241a4d",
                borderRadius: "8px",
            }}
            >
    {editingSetId === set.id ? (
      <div style={{ display: "flex", gap: "5px" }}>
        <input
          type="number"
          value={editWeight}
          onChange={(e) => setEditWeight(e.target.value)}
          style={{ width: "60px" }}
        />

        <input
          type="number"
          value={editReps}
          onChange={(e) => setEditReps(e.target.value)}
          style={{ width: "60px" }}
        />

        <button onClick={saveEdit}>Save</button>
        <button onClick={() => setEditingSetId(null)}>Cancel</button>
      </div>
    ) : (
      <>
        <span>
          {set.weight} × {set.reps}
        </span>

        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => startEdit(set)}>Edit</button>

          <button onClick={() => duplicateSet(set)}>
            +
          </button>

          <button onClick={() => deleteSet(set.id)}>
            Delete
          </button>
        </div>
      </>
    )}
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
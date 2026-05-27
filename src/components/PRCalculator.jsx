import { useState, useEffect } from "react";

function PRCalculator() {
  // Store the form inputs as strings so the fields can be cleared naturally.
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  // Holds the calculated one-rep max estimate, or null when there is no result.
  const [pr, setPr] = useState(null);

  useEffect(() => {
    const w = Number(weight);
    const r = Number(reps);

    // Only calculate if both weight and reps have been entered.
    if (weight === "" || reps === "") {
        setPr(null);
        return;
    }

    // Epley formula: estimated 1RM = weight * (1 + reps / 30).
    const result = w * (1 + r / 30);
    setPr(result.toFixed(1));
  }, [weight, reps]);

  return (
    <div>
      <h2>PR Calculator</h2>

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

      {/* Show the estimate only after a PR has been calculated. */}
      {pr && (
        <h3>
          Estimated 1RM: {pr} lbs
        </h3>
      )}
    </div>
  );
}

export default PRCalculator;

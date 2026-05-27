import { useState, useEffect } from "react";

function PRCalculator() {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [pr, setPr] = useState(null);

  useEffect(() => {
    const w = Number(weight);
    const r = Number(reps);

    // only calculate if both weight and reps exist
    if (weight === "" || reps === "") {
        setPr(null);
        return;
    }

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
      {pr && (
        <h3>
          Estimated 1RM: {pr} lbs
        </h3>
      )}
    </div>
  );
}

export default PRCalculator;
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal, reset } from "../features/goals/goalSlice";

function GoalForm() {
  const [getGoal, setGoal] = useState("");
  const dispach = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispach(createGoal({ text: getGoal }));
    dispach(reset());
    setGoal("");
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            value={getGoal}
            name="text"
            required
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="Submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;

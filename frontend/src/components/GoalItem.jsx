import { useDispatch } from "react-redux";
import { deleteGoal, getGoals } from "../features/goals/goalSlice";
// import { Link } from "react-router-dom";

function GoalItem({ goal, updategoal }) {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button
        onClick={async () => {
          await dispatch(deleteGoal(goal._id));
          dispatch(getGoals());
        }}
        className="close">
        X
      </button>
      <button
        onClick={() => {
          updategoal(goal._id, goal.text);
        }}
        className="edit">
        Edit
      </button>
      {/* <Link to='/updategoal' state={{ from: goal.id }}>
      <p className='edit'>
        Edit
      </p>
      </Link> */}
    </div>
  );
}

export default GoalItem;

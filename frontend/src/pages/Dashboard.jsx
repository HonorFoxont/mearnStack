import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import { reset, getGoals } from "../features/goals/goalSlice";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { goals, isError, isLoading, messege } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(messege);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch, messege, navigate, user]);

  if (isLoading) {
    <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals.</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;

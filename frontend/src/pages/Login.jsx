import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { reset, login } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((initialState) => ({
      ...initialState,
      [e.target.name]: `${e.target.value}`,
    }));
  };

  const { isLoading, isError, isSuccess, messege, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(messege);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, navigate, dispatch, user, messege]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Login and start setting goals</p>
        <div className="form-group"></div>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={onChange}
              id="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={onChange}
              id="password"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;

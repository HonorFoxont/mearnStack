import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { reset, register } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError, messege, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(messege);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, navigate, dispatch, user, messege]);

  const { email, name, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((initialState) => ({
      ...initialState,
      [e.target.name]: `${e.target.value}`,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("password doesen't match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
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
        <p>Please create a account</p>
        <div className="form-group"></div>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={onChange}
              id="name"
              className="form-control"
            />
          </div>
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
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={password2}
              onChange={onChange}
              id="password2"
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
};

export default Register;

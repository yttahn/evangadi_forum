import { useState } from "react";
import axios from "../../axios/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Register.module.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [requireInformation, setRequireInformation] = useState("");

  const handleJoinNowClick = () => {
    navigate("/"); // Adjust the route as needed
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !firstname || !lastname || !email || !password) {
      setRequireInformation("Please provide all required information!");
      return;
    }

    try {
      setRequireInformation("");
      setError(""); // Clear any previous error messages

      await axios.post("/users/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed: ", error.response);
      setError(
        error?.response?.data?.msg || "Registration failed, please try again."
      );
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section className={classes.RegisterContainer}>
      <div className={classes.container}>
        <section className={classes.registration_section}>
          <form className={classes.RegisterForm} onSubmit={handleSubmit}>
            <h3>Join the network</h3>
            <p>
              Already have an account?{" "}
              <span>
                <Link
                  className="text-decoration-none"
                  style={{ color: "orange", cursor: "pointer" }}
                  to="/login"
                >
                  Sign in
                </Link>
              </span>
            </p>
            <div className={classes.RequireInformation}>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {requireInformation && !error && (
                <p style={{ color: "red" }}>{requireInformation}</p>
              )}
            </div>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={classes.RegisterFormHeader}
              required
            />
            <div className={classes.form_flex}>
              <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className={classes.RegisterFormHeader}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className={classes.RegisterFormHeader}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.RegisterFormHeader}
              required
            />
            <div className={classes.RegisterFormHeader}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className={classes.eyeIcon}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEye color="#FE9395" />
                ) : (
                  <FaEyeSlash color="#FE9395" />
                )}
              </div>
            </div>
            <button type="submit" className={classes.agree}>
              Agree and Join
            </button>
            <div className={classes.PrivacyPolicy}>
              <p>
                I agree to the{" "}
                <Link to="#" className={classes.red_link}>
                  privacy policy
                </Link>{" "}
                and{" "}
                <Link to="#" className={classes.red_link}>
                  terms of service
                </Link>
                .
              </p>
              <p className={classes.Account}>
                <Link to={"/login"} className={classes.red_linkAccount}>
                  Already have an account?
                </Link>
              </p>
            </div>
          </form>
        </section>
        <div className={classes.text_content_reg}>
          <h2>About</h2>
          <h1>Evangadi Networks Q & A</h1>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
            <br />
            <br />
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <button
            onClick={handleJoinNowClick}
            className={classes.how_it_work_reg}
          >
            HOW IT WORKS
          </button>
        </div>
      </div>
    </section>
  );
}

export default Register;

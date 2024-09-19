import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";

const Homepage = () => {
  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>Agent Q</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>
          <TypeAnimation
            sequence={[
              "Agent Q is a powerful tool that helps you generate ideas, solve problems, and make decisions.",
              50, // Waits 0.5s
              "Agent Q can assist you in brainstorming, planning, and executing your projects.",
              50, // Waits 0.5s
              "Agent Q is your go-to assistant for enhancing productivity and creativity.",
              50, // Waits 0.5s
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            speed={50} // Increased speed for faster typing
            style={{ display: 'inline-block' }}
          />
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>

      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

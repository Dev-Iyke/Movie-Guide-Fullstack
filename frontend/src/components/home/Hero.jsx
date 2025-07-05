import { useContext } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/features";

const Hero = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] pt-35 bg-[url('/hero-bg.jpg')] bg-cover bg-center text-white">
      <div className="max-w-[600px] text-center">
        <h1 className="text-4xl md:text-6xl font-semibold mb-4">
          Figure Out Your Next Favorite Movie
        </h1>
        <p className="text-lg md:text-xl font-light mb-6">
          Explore a world of cinematic wonders with personalized
          recommendations.
        </p>
      </div>
      {!isAuthenticated ? <Button
        onClick={() => {
          navigate("/register");
        }}
        className="text-black mt-8"
      >
        Get Started
      </Button> : 
      (
        <h2 className="font-semibold text-3xl text-yellow-500">EXPLORE!</h2>
      )}
    </div>
  );
};

export default Hero;

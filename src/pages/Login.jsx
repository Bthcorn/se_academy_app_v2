import React from "react";
import LogoandText from "../components/LogoandText";
import LoginBox from "../components/LoginBox";

function Login() {
  return (
    <div className="flex">
      {" "}
      {/* Flex container to align items side by side */}
      <div>
        {" "}
        {/* Container for Logo, Title, and Subtitle */}
        <div className="ml-20 mt-20">
          <LogoandText />
        </div>
        <div className="my-40 ml-40">
          <h1 className="text-4xl leading-relaxed">
            Login into <br /> your account
          </h1>
          <h3 className="mt-4">KMITL SE Online Learning Platform</h3>
        </div>
      </div>
      <div className="ml-40 mt-20">
        <div className="ml-40 mt-40">
          <LoginBox />
        </div>
      </div>
    </div>
  );
}

export default Login;

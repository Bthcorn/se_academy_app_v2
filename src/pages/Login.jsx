import React from "react";
import LogoandText from "../components/LogoandText";
import LoginBox from "../components/LoginBox";

function Login() {
  return (
    <div className="relative flex h-dvh min-h-screen">
      <div className="fixed left-[5.625rem] top-[-11.6875rem] h-[74.9375rem] w-[0rem] opacity-40 blur-[96px] sm:w-[20rem] md:w-[80rem]">
        <div className="absolute h-[37.6875rem] w-[37.6875rem] rounded-[37.6875rem] bg-[#CB3CFF]"></div>
        <div className="absolute bottom-0 right-0 h-[30.3125rem] w-[30.3125rem] rounded-[30.3125rem] bg-[#7F25FB]"></div>
      </div>
      {/* Flex container to align items side by side */}
      <div className="container flex h-full w-full flex-col items-center px-4 py-8 md:px-10 md:py-20">
        {" "}
        {/* Container for Logo, Title, and Subtitle */}
        <div className="relative w-full">
          <LogoandText />
        </div>
        <div className="mt-auto flex h-full w-full flex-col items-center justify-center md:flex-row">
          <div className="mb-4 flex w-full flex-col items-start md:w-1/2">
            <h1 className="text-2xl leading-relaxed md:text-4xl">
              Login into <br /> your account
            </h1>
            <h3 className="mt-4">KMITL SE Online Learning Platform</h3>
          </div>
          <div className="relative flex w-full max-w-[500px] justify-end md:w-1/2">
            <LoginBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

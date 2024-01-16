import React from "react";

const Success = ({text}) => {
  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] flex justify-center mt-[220px]">
      <div className="w-[400px] h-[150px] gap-2 bg-[#24253c]  flex items-center justify-center p-4 rounded-[24px]">
        <span className="material-symbols-outlined text-6xl text-[#e53854]">task_alt</span>
        <h1 className="text-xl text-[#b2b4bc] font-medium">{text} </h1>
      </div>
    </div>
  );
};

export default Success;

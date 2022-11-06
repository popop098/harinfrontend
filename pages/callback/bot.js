import { useEffect } from "react";

const DiscordCallback = () => {
  useEffect(() => {
    window.close();
  }, []);
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto text-center">
          <h2 className="text-2xl">✅</h2>
          <h2 className="text-2xl text-white font-bold">
            봇 초대가 완료되었습니다. 이 창을 닫아주세요.
          </h2>
        </div>
      </div>
    </>
  );
};

export default DiscordCallback;

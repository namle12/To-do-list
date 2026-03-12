import React from "react";

const Notfound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center bg-slate-50">
      <img
        src="404_NotFound.png"
        alt="404 Not Found"
        className="max-w-full mb-6 w-96"
      />
      <p className="text-xl font-semibold">
        Bạn đã đi lạc vào một trang không tồn tại! Hãy quay lại trang chủ.
      </p>
      <a
        href="/"
        className="inline-block px-6 py-3 font-medium text-white transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark"
      >
        Quay ve trang chu
      </a>
    </div>
  );
};

export default Notfound;

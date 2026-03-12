import React from "react";

const Header = () => {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text ">
        Todox
      </h1>
      <p className="text-muted-foreground">
        Quản lý công việc của bạn một cách hiệu quả
      </p>
    </div>
  );
};

export default Header;

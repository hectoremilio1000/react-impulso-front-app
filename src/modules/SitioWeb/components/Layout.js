import React, { useState } from "react";
import SidebarSitioWeb from "./SidebarSitioWeb";

const LayoutSitioWeb = ({ children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex">
      <SidebarSitioWeb open={open} setOpen={setOpen} />
      <div className="w-full app-container">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default LayoutSitioWeb;

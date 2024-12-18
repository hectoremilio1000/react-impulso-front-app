import React, { useState } from "react";
import SidebarMarketing from "./SidebarMarketing";

const LayoutMarketing = ({ children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex">
      <SidebarMarketing open={open} setOpen={setOpen} />
      <div className="w-full app-container">
        <div className="w-full p-6 app-container-sections">{children}</div>
      </div>
    </div>
  );
};

export default LayoutMarketing;

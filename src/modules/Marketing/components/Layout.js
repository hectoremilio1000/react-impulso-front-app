import React, { useState } from "react";
import SidebarMarketing from "./SidebarMarketing";

const LayoutMarketing = ({ children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex">
      <SidebarMarketing open={open} setOpen={setOpen} />
      <div className="w-full app-container">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default LayoutMarketing;

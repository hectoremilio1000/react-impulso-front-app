import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BsBellFill, BsJustifyRight } from "react-icons/bs";

import { useAuth } from "../AuthContext";
import { Dropdown, Space } from "antd";
import { FaUser } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { FaCalendarAlt, FaCog, FaLongArrowAltUp } from "react-icons/fa";

const TopNavigation = ({ open, setOpen, idSede, companyId, companies }) => {
  const { auth, logout } = useAuth();
  const [selectCompany, setSelectCompany] = useState(null);

  const handleSelectCompany = (id) => {
    console.log(id);
    console.log(companies);
    const company = companies.find((c) => c.id === Number(id));
    console.log(company);
    setSelectCompany(company);
  };
  useEffect(() => {
    handleSelectCompany(companyId);
  }, [companies, companyId]);

  const transformarTexto = (texto) => {
    // return texto.trim().toLowerCase().replace(/\s+/g, "-");
    return texto.trim().toLowerCase().replace(/\s+/g, "-");
  };

  const onMenuClick = ({ key }) => {
    switch (key) {
      case "2":
        // handleProfile();
        break;
      case "3":
        // handlePlan();
        break;
      case "4":
        // handleSettings();
        break;
      case "5":
        logout();
        break;
      default:
        break;
    }
  };

  const last_conection = dayjs().format("DD/MM • HH:mm");
  return (
    <>
      <div className=" bg-white block p-6 border-solid border-b-2 border-gray-8">
        <div className="flex items-center justify-between">
          <div className="block">
            <h1 className="text-gray-2 text-xl font-semibold mr-4 leading-3 inline-block">
              ¡Hola, {auth?.user?.name}!
            </h1>
            <span className="text-gray-5 text-xs rounded-lg bg-gray-9 px-3 inline-block">
              Tu última conexión: {last_conection}
            </span>
          </div>
          <div className="flex justify-end gap-6 self-start">
            <div className="self-center">
              <div className="cursor-pointer counter-icon relative">
                <div className="rounded-full bg-dark-purple text-white text-sm flex items-center justify-center w-5 h-5 text-center absolute -top-2 -right-2">
                  <span className="text-white text-xs">1</span>
                </div>
                <BsBellFill className="text-xl ml-2 active-bell text-gray-400" />
              </div>
            </div>
            <div className="relative px-3 py-2 rounded-full bg-dark-purple text-white">
              <span>{selectCompany?.name}</span>
            </div>
            <Dropdown
              overlayClassName="w-[150px]"
              menu={{
                items: [
                  {
                    key: "1",
                    label: "My Account",
                    disabled: true,
                  },
                  {
                    type: "divider",
                  },
                  {
                    key: "2",
                    label: "Perfil",
                    icon: <FaUser />,
                    extra: "⌘P",
                  },
                  {
                    key: "3",
                    label: "Plan",
                    icon: <FaCalendarAlt />,
                  },
                  {
                    key: "4",
                    label: "Configuracion",
                    icon: <FaCog />,
                  },
                  {
                    key: "5",
                    label: "Cerrar Session",
                    icon: <FaLongArrowAltUp />,
                  },
                ],
                onClick: onMenuClick,
              }}
            >
              <a
                className="cursor-pointer px-4 rounded-full py-2 bg-gray-200 text-gray-800"
                onClick={(e) => e.preventDefault()}
              >
                <Space>
                  <FaUser /> {auth.user.name}
                  <FiChevronDown />
                </Space>
              </a>
            </Dropdown>
            {/* <div className="ml-3">
              <div className="flex flex-col items-end">
                <div>
                  <button className="flex flex-row items-center outline-none">
                    <div className="rounded-full flex justify-center items-center self-center border-2 border-gray-2 h-10 w-10 text-16 avatar-background">
                      <span className="text-gray-2 text-sm font-semibold uppercase">
                        VL
                      </span>
                    </div>
                    <div className="flex flex-col ml-2 mr-1 text-left">
                      <h3 className="text-sm font-semibold text-gray-2 -mb-1">
                        {auth.user.nombre}
                      </h3>
                      <span className="text-gray-5 text-xs my-0">
                        {auth.user.email}
                      </span>
                    </div>
                    <i className="fas fa-chevron-down pl-7 text-gray-5 text-12 border-gray-2"></i>
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex ">
          <span className="title text-18 lg:text-26"></span>
        </div>
      </div>
      <div className="block md:hidden p-6">
        {open ? (
          <BsJustifyRight
            onClick={() => setOpen(false)}
            className="bg-white text-dark-purple rounded-full text-3xl border border-dark-purple cursor-pointer"
          />
        ) : (
          <BsJustifyRight
            onClick={() => setOpen(true)}
            className="bg-white text-dark-purple text-3xl cursor-pointer"
          />
        )}
      </div>
    </>
  );
};

export default TopNavigation;

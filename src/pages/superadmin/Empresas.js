import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FcBusiness } from "react-icons/fc";
import { useAuth } from "../../components/AuthContext";
import { MdAdd } from "react-icons/md";
import {
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  message,
  Modal,
  Select,
  Space,
} from "antd";
import LogoUpload from "../../components/LogoUpload";
import { TbAdjustments, TbCaretDownFilled } from "react-icons/tb";
import { FaEdit, FaEllipsisV, FaEye, FaTrash } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { BsViewList } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
const { Option } = Select;
const { RangePicker } = DatePicker;

const Empresas = () => {
  const { auth } = useAuth();
  const items = [
    {
      key: "1",
      label: (
        <p
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Editar
        </p>
      ),
    },
  ];
  // steps formulario
  const [nowStep, setNowStep] = useState(1);
  const handleNextSteps = () => {
    setNowStep(nowStep + 1);
  };
  const handlePrevSteps = () => {
    setNowStep(nowStep - 1);
  };

  const [business, setBusiness] = useState([]);
  const [plans, setPlans] = useState([]);
  const [filterBusiness, setFilterBusiness] = useState([]);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [selectPlans, setSelectPlans] = useState(null);
  const [empresaCreate, setEmpresaCreate] = useState({
    name: "",
    email: "",
    logo: "",
    website: "",
    phone_contact: "",
    user_id: null,
  });
  const [usuarioCreate, setUsuarioCreate] = useState({
    name: "",
    email: "",
    password: "",
    rol_id: 2,
  });
  const [sedeCreate, setSedeCreate] = useState({
    name: "",
    location: "",
    map_url: "",
    company_id: null,
  });
  const [subscription, setSubscription] = useState({
    user_id: null,
    plan_id: null,
    start_date: "",
    end_date: "",
    status: "active",
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  const abrirModalCreate = (e) => {
    e.stopPropagation();
    setIsModalOpenCreate(true);
  };
  const buscar_empresas = async () => {
    try {
      const response = await axios.get(`${apiUrl}/companies`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(response);
      const data = response.data;
      console.log(data);
      if (data.status === "success") {
        setBusiness(data.data);
        setFilterBusiness(data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error al obtener los modulos:", error);
    }
  };
  useEffect(() => {
    buscar_empresas();
  }, [auth, apiUrl]);

  // PLANES
  const buscarPlans = async () => {
    try {
      const response = await axios.get(`${apiUrl}/plans`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(response);
      if (response.data.status === "success") {
        setPlans(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error al obtener los planes:", error);
    }
  };

  const handleSelectPlans = (id, e) => {
    e.stopPropagation();
    // Si el plan ya está seleccionado, lo deseleccionamos
    if (selectPlans === id) {
      setSelectPlans(null);
      setSubscription({ ...subscription, plan_id: null });
    } else {
      // Si no está seleccionado, lo seleccionamos
      setSubscription({ ...subscription, plan_id: id });
      setSelectPlans(id);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    buscarPlans();
  }, [0]);

  // ESTADOS PARA LA TABLA DINAMICA
  const [itemsPerPage, setItemsPerPage] = useState(10); //items por pagina
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleEmpresas, setVisibleEmpresas] = useState([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone_contact: "",
    website: "",
    plans: [{ tipo: "Plan basico" }],
    created_at: [null, null],
  });

  // Función para aplicar el filtro
  const detectarTotalPages = (data) => {
    if (data.length === 0) {
      setTotalPages(1);
    } else {
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    }
  };
  const applyFilters = () => {
    const regex = /^[a-zA-Z0-9\s]*$/; // Permite solo letras, números y espacios
    const bol = regex.test(searchTerm) ? searchTerm : "";
    console.log(bol);

    if (bol === "") {
      const filteredBusiness = filterBusiness.filter((company) => {
        const searchRegex = new RegExp(searchTerm, "i");

        const matchSearch = Object.values(company).some((value) =>
          searchRegex.test(value.toString())
        );

        const matchFilters =
          (!filters.name || company.name === filters.name) &&
          (!filters.email || company.email === filters.email) &&
          (!filters.website || company.website === filters.website) &&
          (!filters.created_at[0] ||
            ((dayjs(company.created_at).isAfter(filters.created_at[0], "day") ||
              dayjs(company.created_at).isSame(filters.created_at[0], "day")) &&
              (dayjs(company.created_at).isBefore(
                filters.created_at[1],
                "day"
              ) ||
                dayjs(company.created_at).isSame(
                  filters.created_at[1],
                  "day"
                ))));

        return matchSearch && matchFilters;
      });
      detectarTotalPages(filteredBusiness);
      const objetosOrdenados = filteredBusiness.sort((a, b) =>
        dayjs(b.fecha_created).isAfter(dayjs(a.fecha_created)) ? 1 : -1
      );
      const startIndex = (currentPage - 1) * itemsPerPage;
      // setCurrentPage(1);
      const paginated = objetosOrdenados.slice(
        startIndex,
        startIndex + itemsPerPage
      );

      setVisibleEmpresas(paginated);
    } else {
      setSearchTerm(bol);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFiltersChange = (changedFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...changedFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      email: "",
      phone_contact: "",
      website: "",
      created_at: [null, null],
    });

    setSearchTerm("");
    setCurrentPage(1);
    detectarTotalPages(filterBusiness);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filterBusiness.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    setVisibleEmpresas(paginated);
  };
  // useEffect para manejar el filtrado y paginación
  useEffect(() => {
    applyFilters(); // Aplicar filtro inicialmente
  }, [filterBusiness, currentPage, itemsPerPage, searchTerm]);
  const handleCreateChange = (key, value) => {
    setEmpresaCreate((prev) => {
      const newCompany = { ...prev, [key]: value };

      return newCompany;
    });
  };
  const handleCreateSedeChange = (key, value) => {
    setSedeCreate((prev) => {
      const newSede = { ...prev, [key]: value };

      return newSede;
    });
  };
  const handleCreateUsuarioChange = (key, value) => {
    setUsuarioCreate((prev) => {
      const newUser = { ...prev, [key]: value };

      return newUser;
    });
  };
  const handleSubscriptionChange = (dates) => {
    if (dates) {
      setSubscription({
        ...subscription,
        start_date: dates[0] ? dayjs(dates[0]).format("YYYY-MM-DD") : null,
        end_date: dates[1] ? dayjs(dates[1]).format("YYYY-MM-DD") : null,
      });
    } else {
      setSubscription({ ...subscription, start_date: null, end_date: null });
    }
  };
  const [logoFileEmpresa, setLogoFileEmpresa] = useState("");
  const sendImageLogo = async (modelosImages) => {
    return new Promise(async (resolve, reject) => {
      const token = auth.token;
      const formData = new FormData();

      formData.append("propertyName", "logos");

      modelosImages.forEach((img, index) => {
        formData.append(`modelosImages[${index}]`, img.file);
      });

      try {
        const response = await axios.post(
          `http://localhost/apimultimedia/api/uploadimg`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        resolve(data);
      } catch (error) {
        reject(error);
        console.error("Upload error:", error);
      }
    });
  };

  const createCompany = async (newCompany) => {
    const token = auth.token;

    try {
      const response = await axios.post(`${apiUrl}/companies`, newCompany, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data; // Simplemente devuelve los datos
    } catch (error) {
      console.error("Upload error:", error);
      throw error; // Lanza el error para que pueda ser capturado en el llamado
    }
  };
  const createSede = async (newSede) => {
    const token = auth.token;

    try {
      const response = await axios.post(`${apiUrl}/sedes`, newSede, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data; // Simplemente devuelve los datos
    } catch (error) {
      console.error("Upload error:", error);
      throw error; // Lanza el error para que pueda ser capturado en el llamado
    }
  };
  const createUser = async (newUser) => {
    const token = auth.token;

    try {
      const response = await axios.post(`${apiUrl}/newuser`, newUser, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data; // Simplemente devuelve los datos
    } catch (error) {
      console.error("Upload error:", error);
      throw error; // Lanza el error para que pueda ser capturado en el llamado
    }
  };
  const createSubscription = async (newSubscription) => {
    const token = auth.token;

    try {
      const response = await axios.post(
        `${apiUrl}/subscriptions`,
        newSubscription,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response.data; // Simplemente devuelve los datos
    } catch (error) {
      console.error("Upload error:", error);
      throw error; // Lanza el error para que pueda ser capturado en el llamado
    }
  };

  const handleOkCreate = async () => {
    console.log(usuarioCreate);
    console.log(empresaCreate);
    console.log(sedeCreate);
    console.log(subscription);

    setLoadingCreate(true);

    const newUser = { ...usuarioCreate };
    try {
      const userData = await createUser(newUser);
      console.log(userData);

      message.success("Se ha creado al admin correctamente");
      if (userData.status === "success") {
        let urlLogo = "";
        if (empresaCreate.logo !== "") {
          const sendImagen = await sendImageLogo([{ file: logoFileEmpresa }]);
          console.log(sendImagen);
          urlLogo = sendImagen.modelosImages[0];
        }
        const newCompany = {
          ...empresaCreate,
          user_id: userData.data.id,
          logo: urlLogo,
        };
        const companyData = await createCompany(newCompany);
        console.log(companyData);
        if (companyData.status === "success") {
          message.success("Se ha creado la empresa correctamente");
          const newSede = { ...sedeCreate, company_id: companyData.data.id };
          const dataSede = await createSede(newSede);
          if (dataSede.status === "success") {
            message.success("Se ha creado la sede correctamente");
            const newSubscription = {
              ...subscription,
              user_id: userData.data.id,
            };
            const subscriptionData = await createSubscription(newSubscription);
            if (subscriptionData.status === "success") {
              message.success("Se ha creado la subscripccion correctamente");
              await buscar_empresas();
              handleCancelCreate();
            } else {
              message.error("Ocurrio un error al crear la subscripccion");
            }
          } else {
            message.error("Ocurrio un error al crear la empresa");
          }
        } else {
          message.error("Ocurrio un error al crear la empresa");
        }
      } else {
        message.error("Ocurrio un error al crear el usuario");
        setLoadingCreate(false);
      }
    } catch (error) {
      message.error("Ocurrió un error durante la creación del cliente");
    } finally {
      setLoadingCreate(false);
    }
  };
  const handleCancelCreate = () => {
    setEmpresaCreate({
      name: "",
      email: "",
      logo: "",
      website: "",
      phone_contact: "",
      user_id: null,
    });
    setLogoFileEmpresa("");
    setUsuarioCreate({
      name: "",
      email: "",
      password: "",
      rol_id: 2,
    });
    setSedeCreate({
      name: "",
      location: "",
      map_url: "",
      company_id: null,
    });
    setSubscription({
      user_id: null,
      plan_id: null,
      start_date: "",
      end_date: "",
      status: "active",
    });
    setSelectPlans(null);
    setIsModalOpenCreate(false);
  };
  const handleEliminarBusiness = async (id) => {
    console.log(id);
    // let propiedad_id = id;
    // try {
    //   const response = await eliminar_property(propiedad_id);
    //   buscarPropiedades();
    //   message.success("Se elimino correctamente la propiedad");
    // } catch (error) {
    //   message.error("No se elimino la propiedad, hubo un error");
    // }
  };
  // const handleSendProperty = async () => {
  //   setLoadingCreate(false);
  //   if (nombrePropiedad === null || nombrePropiedad === "") {
  //     message.warning("Debes establecer un nombre para subir esta propiedad");
  //     return;
  //   }
  //   if (descripcionPropiedad === null || descripcionPropiedad === "") {
  //     message.warning(
  //       "Debes establecer una descripcion para subir esta propiedad"
  //     );
  //     return;
  //   }
  //   if (
  //     precioPropiedad === null ||
  //     precioPropiedad === "" ||
  //     precioPropiedad === 0
  //   ) {
  //     message.warning("Debes establecer un precio para subir esta propiedad");
  //     return;
  //   }
  //   if (areaPropiedad === null || areaPropiedad === "") {
  //     message.warning(
  //       "Debes establecer una descripcion para subir esta propiedad"
  //     );
  //     return;
  //   }
  //   if (selectedLocality === null || selectedLocality === "") {
  //     message.warning(
  //       "Debes establecer una ubicacion con region, provincia y distrito  para subir esta propiedad"
  //     );
  //     return;
  //   }
  //   if (selectedProvince === null || selectedProvince === "") {
  //     message.warning(
  //       "Debes establecer una ubicacion con region, provincia y distrito  para subir esta propiedad"
  //     );
  //     return;
  //   }
  //   if (selectedZone === null || selectedZone === "") {
  //     message.warning(
  //       "Debes establecer una ubicacion con region, provincia y distrito  para subir esta propiedad"
  //     );
  //     return;
  //   }
  //   if (coverImage === null || coverImage === "") {
  //     message.warning(
  //       "Debes subir una imagen de portada para subir esta propiedad"
  //     );
  //     return;
  //   }
  //   let urlLogo = "";
  //   if (logoPropiedad !== "") {
  //     const sendImagen = await sendImageLogo([{ file: logoFilePropiedad }]);
  //     console.log(sendImagen);
  //     urlLogo = sendImagen.modelosImages[0];
  //   }
  //   let newPropiedad = {
  //     logo: urlLogo,
  //     nombre: nombrePropiedad,
  //     tipo: tipoPropiedad,
  //     purpose: proposito,
  //     descripcion: descripcionPropiedad,
  //     video_descripcion: videoDescripcionPropiedad,
  //     link_extra: linkExtra,
  //     region: selectedProvince,
  //     provincia: selectedLocality,
  //     distrito: selectedZone,
  //     exactAddress: exactAddress,
  //     postalcode: postalCode,
  //     position_locate: position,
  //     area_from: areaPropiedad,
  //     area_const_from: areaContruidaPropiedad,
  //     precio_from: precioPropiedad,
  //     moneda: monedaPreciopropiedad,
  //     etapa: etapaPropiedad,
  //     fecha_entrega: fechaentrega,
  //     fecha_captacion: fechaCaptacion,
  //     fecha_created: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  //     financiamiento: financiamiento,
  //     created_by: session.id,
  //     status: statusPublicacion,
  //     name_reference: referencia,
  //     empresa_id: business.id,
  //   };
  //   // console.log(newPropiedad);
  //   // console.log(selectedAmenities);
  //   // console.log(coverImage);
  //   // console.log(galleryImages);
  //   // console.log(models);
  //   const propiedadData = await createPropiedad(newPropiedad);
  //   console.log(propiedadData);
  //   if (propiedadData.message === "add") {
  //     let idPropiedad = propiedadData.id;
  //     let multimediaPropiedad = [];
  //     if (coverImage !== null) {
  //       const coverData = await sendCoverPropiedad(nombrePropiedad);
  //       let newMultimedia = {
  //         categoria: "Fotos",
  //         url_file: coverData.coverImage,
  //         propiedad_id: idPropiedad,
  //         etiqueta: "Portada",
  //         indice: -1,
  //       };
  //       item.push(newMultimedia);
  //     }
  //     if (galleryImages.length > 0) {
  //       const galleryData = await sendGalleryPropiedad(nombrePropiedad);
  //       galleryData.galleryImages.forEach((file, index) => {
  //         let newMultimedia = {
  //           categoria: "Fotos",
  //           url_file: file,
  //           propiedad_id: idPropiedad,
  //           etiqueta: "Galeria",
  //           indice: index,
  //         };
  //         item.push(newMultimedia);
  //       });
  //     }
  //     if (item.length > 0) {
  //       const multimediaData = await createMultimediaPropiedad(
  //         multimediaPropiedad
  //       );
  //       console.log(multimediaData);
  //     }
  //     if (selectedAmenities.length > 0) {
  //       let newAmenidades = [];
  //       selectedAmenities.forEach((amenity) => {
  //         let newAmenidad = {
  //           propiedad_id: idPropiedad,
  //           amenidad: amenity,
  //         };
  //         newAmenidades.push(newAmenidad);
  //       });
  //       const amenidadesData = await createAmenidadesPropiedad(newAmenidades);
  //       console.log(amenidadesData);
  //     }
  //     if (models.length > 0) {
  //       let newModelos = [];
  //       let imagesModelos = [];
  //       models.forEach((model) => {
  //         let newImage = {
  //           file: model.imagen,
  //         };
  //         imagesModelos.push(newImage);
  //       });
  //       const imagesModelosData = await sendImagesModelos(
  //         nombrePropiedad,
  //         imagesModelos
  //       );

  //       models.forEach((modelo, index) => {
  //         let newModel = {
  //           propiedad_id: idPropiedad,
  //           categoria: modelo.categoria,
  //           nombre: modelo.nombre,
  //           imagenUrl:
  //             imagesModelosData.modelosImages[index] === undefined
  //               ? ""
  //               : imagesModelosData.modelosImages[index],
  //           precio: modelo.precio,
  //           moneda: modelo.moneda,
  //           area: modelo.area,
  //           habs: modelo.habs,
  //           garage: modelo.garage,
  //           banios: modelo.banios,
  //           etapa: modelo.etapa,
  //         };
  //         newModelos.push(newModel);
  //       });
  //       const modelsData = await createModelosPropiedad(newModelos);
  //       console.log(modelsData);
  //       let newUnidades = [];
  //       modelsData.ids.forEach((idModel, index) => {
  //         models[index].unidades.forEach((unidad) => {
  //           let newUnidad = {
  //             modelo_id: idModel,
  //             nombre: unidad.nombre,
  //             status: unidad.status,
  //           };
  //           newUnidades.push(newUnidad);
  //         });
  //       });
  //       const unidadesData = await createUnidadesModelos(newUnidades);
  //       console.log(unidadesData);
  //     }
  //     setLogoFilePropiedad("");
  //     setLogoPropiedad("");
  //     setLoadingCreate(false);
  //     message.success("Se agrego la propiedad");
  //     navigate("/propiedades");
  //   } else {
  //     message.error("Ocurrio un error");
  //   }
  // };

  return (
    <div className="w-full p-6 app-container-sections">
      {/* <div
        className="mb-[32px] flex items-center justify-between py-4 pr-4"
        style={{ background: "linear-gradient(90deg,#fff0,#fff)" }}
      >
        <div className="data">
          <div className="title font-bold text-xl text-bold-font">Empresas</div>
          <div className="subtitle max-w-[30vw] text-xs font-normal text-light-font">
            Lista de empresas
          </div>
        </div>
        <div className="options bg-gray-50 p-4">
          <div className="page-top-card flex items-center gap-3">
            <div className="icon bg-light-purple p-4 rounded text-dark-purple">
              <FcBusiness />
            </div>
            <div>
              <div className="value font-bold text-bold-font text-xl">
                {business.length}
              </div>
              <div className="text-sm font-normal text-light-font">
                Total Business
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* modal create */}
      <Modal
        footer={null}
        title="Register"
        open={isModalOpenCreate}
        onOk={handleOkCreate}
        onCancel={handleCancelCreate}
      >
        <div className="relative w-full">
          {loadingCreate ? (
            <div className="bg-dark-purple z-50 text-white absolute top-0 left-0 right-0 bottom-0 w-full flex items-center justify-center">
              Loading
            </div>
          ) : null}
          <div className="w-full mb-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="w-full flex flex-col items-center">
                <span
                  className={`w-6 h-6 text-center text-xs rounded-full p-1 inline-block ${
                    nowStep >= 1
                      ? "bg-dark-purple text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  1
                </span>
                <span>Datos de Empresa</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full flex items-center">
                  <div
                    className={`w-full h-[2px] rounded-full ${
                      nowStep >= 2 ? "bg-dark-purple" : "bg-gray-200"
                    }`}
                  ></div>
                  <div className="w-full flex flex-col items-center">
                    <span
                      className={`w-6 h-6 text-center text-xs rounded-full p-1 inline-block ${
                        nowStep >= 2
                          ? "bg-dark-purple text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      2
                    </span>
                  </div>
                  <div
                    className={`w-full h-[2px] rounded-full ${
                      nowStep >= 2 ? "bg-dark-purple" : "bg-gray-200"
                    }`}
                  ></div>
                </div>
                <span>Registrar Usuario</span>
              </div>
              <div className="w-full flex flex-col items-center">
                <span
                  className={`w-6 h-6 text-center text-xs rounded-full p-1 inline-block ${
                    nowStep === 3
                      ? "bg-dark-purple text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  3
                </span>
                <span>Selecciona el plan</span>
              </div>
            </div>
          </div>
          {nowStep === 1 ? (
            <>
              <div>
                <LogoUpload
                  setLogoFile={setLogoFileEmpresa}
                  logo={empresaCreate.logo}
                  setLogo={(logo) =>
                    setEmpresaCreate({ ...empresaCreate, logo: logo })
                  }
                />
              </div>
              <div className="model grid grid-cols-2 gap-3 mt-4 relative my-4">
                <div>
                  <label className="text-sm w-full block font-medium mb-4 ">
                    Name
                  </label>
                  <input
                    placeholder="Ingresa el nombre del modulo"
                    className="bg-gray-100 rounded px-3 py-2 w-full text-sm"
                    type="text"
                    value={empresaCreate?.name}
                    onChange={(e) => handleCreateChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm w-full block font-medium mb-4 ">
                    Email
                  </label>
                  <input
                    placeholder="Ingresa el nombre del modulo"
                    className="bg-gray-100 rounded px-3 py-2 w-full text-sm"
                    type="text"
                    value={empresaCreate?.email}
                    onChange={(e) =>
                      handleCreateChange("email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm w-full block font-medium mb-4 ">
                    Celular
                  </label>
                  <input
                    placeholder="Ingresa el nombre del modulo"
                    className="bg-gray-100 rounded px-3 py-2 w-full text-sm"
                    type="text"
                    value={empresaCreate?.phone_contact}
                    onChange={(e) =>
                      handleCreateChange("phone_contact", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm w-full block font-medium mb-4 ">
                    Sitio Web
                  </label>
                  <input
                    placeholder="Ingresa el nombre del modulo"
                    className="bg-gray-100 rounded px-3 py-2 w-full text-sm"
                    type="text"
                    value={empresaCreate?.website}
                    onChange={(e) =>
                      handleCreateChange("website", e.target.value)
                    }
                  />
                </div>
              </div>
              <label className="text-sm w-full block font-medium mb-4 ">
                Sede
              </label>
              <div className="w-full pl-4 my-4 grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm w-full block font-medium mb-4 ">
                    Nombre de referencia
                  </label>
                  <input
                    placeholder="Ingresa el nombre del modulo"
                    className="bg-gray-100 rounded px-3 py-2 w-full text-sm"
                    type="text"
                    value={sedeCreate?.name}
                    onChange={(e) =>
                      handleCreateSedeChange("name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm w-full block font-medium mb-4 ">
                    Direccion
                  </label>
                  <input
                    placeholder="Ingresa el nombre del modulo"
                    className="bg-gray-100 rounded px-3 py-2 w-full text-sm"
                    type="text"
                    value={sedeCreate?.location}
                    onChange={(e) =>
                      handleCreateSedeChange("location", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm w-full block font-medium mb-4 ">
                    Link Google Maps
                  </label>
                  <input
                    placeholder="Ingresa el nombre del modulo"
                    className="bg-gray-100 rounded px-3 py-2 w-full text-sm"
                    type="text"
                    value={sedeCreate?.map_url}
                    onChange={(e) =>
                      handleCreateSedeChange("map_url", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handlePrevSteps()}
                  disabled={nowStep === 1}
                  className="bg-gray-200 text-gray-800 p-3 rounded"
                >
                  Anterior
                </button>
                <button
                  onClick={() => handleNextSteps()}
                  className="bg-dark-purple text-white p-3 rounded"
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : null}

          {nowStep === 2 ? (
            <>
              <div className="model grid grid-cols-2 gap-3 mt-4 relative my-4">
                <div>
                  <label className="text-sm w-full block font-medium mb-4 ">
                    Name
                  </label>
                  <input
                    placeholder="Ingresa el nombre del modulo"
                    className="bg-gray-100 rounded px-3 py-2 w-full text-sm"
                    type="text"
                    value={usuarioCreate?.name}
                    onChange={(e) =>
                      handleCreateUsuarioChange("name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm w-full block font-medium mb-4 ">
                    Email
                  </label>
                  <input
                    placeholder="Ingresa el nombre del modulo"
                    className="bg-gray-100 rounded px-3 py-2 w-full text-sm"
                    type="text"
                    value={usuarioCreate?.email}
                    onChange={(e) =>
                      handleCreateUsuarioChange("email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-sm w-full block font-medium mb-4 ">
                    password
                  </label>
                  <input
                    placeholder="Ingresa el nombre del modulo"
                    className="bg-gray-100 rounded px-3 py-2 w-full text-sm"
                    type="text"
                    value={usuarioCreate?.password}
                    onChange={(e) =>
                      handleCreateUsuarioChange("password", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handlePrevSteps()}
                  className="bg-gray-200 text-gray-800 p-3 rounded"
                >
                  Anterior
                </button>
                <button
                  onClick={() => handleNextSteps()}
                  className="bg-dark-purple text-white p-3 rounded"
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : null}

          {nowStep === 3 ? (
            <>
              <div className="model grid grid-cols-2 gap-3 mt-4 relative my-4">
                {plans.length > 0 &&
                  plans.map((p, index) => {
                    return (
                      <div
                        onClick={(e) => handleSelectPlans(p.id, e)}
                        key={index}
                        className={`w-full transition-all duration-300 p-4 rounded cursor-pointer ${
                          selectPlans === p.id
                            ? "bg-dark-purple text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-[#7f6bef]"
                        } shadow-sm 0 relative`}
                      >
                        <Checkbox
                          checked={selectPlans === p.id}
                          onClick={(e) => handleSelectPlans(p.id, e)}
                          style={{ marginRight: "10px" }}
                        />
                        <h1 className="mb-6 font-bold text-lg">{p.name}</h1>
                        <span className="font-bold text-xl">{p.price}</span>
                        <div className="grid grid-cols-1 gap-2">
                          {p.modules.map((m, index) => {
                            return (
                              <div key={index} className="w-full">
                                {m.name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="model grid grid-cols-2 gap-3 mt-4 relative my-4">
                <div>
                  <label className="text-sm w-full block font-medium mb-4 ">
                    Plan Tiempo
                  </label>
                  <RangePicker onChange={(e) => handleSubscriptionChange(e)} />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handlePrevSteps()}
                  disabled={nowStep === 1}
                  className="bg-gray-200 text-gray-800 p-3 rounded"
                >
                  Anterior
                </button>
                <button
                  onClick={() => handleOkCreate()}
                  className="bg-dark-purple text-white p-3 rounded"
                >
                  Crear Empresa
                </button>
              </div>
            </>
          ) : null}
        </div>
      </Modal>
      <div className="horizontal-options flex items-center mb-[24px]">
        <div className="search-hook flex-grow">
          <div className="inmocms-input bg-white border rounded border-gray-300 flex text-sm h-[46px] overflow-hidden font-normal">
            <input
              className="h-full px-[12px] w-full border-0 border-none focus:outline-none"
              placeholder="Buscar empresa"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="on"
            />
            <AiOutlineSearch className="h-full w-[24px] min-w-[24px] opacity-5 mx-[12px]" />
          </div>
        </div>
        <div className="horizontal-options-items ml-[28px] flex items-center">
          <button
            onClick={() => setActiveFilter(!activeFilter)}
            className="inmocms-button bg-dark-blue text-white rounded p-4"
          >
            <TbAdjustments />
          </button>
          <button
            onClick={(e) => abrirModalCreate(e)}
            className="btn-new ml-[12px] h-[46px] flex gap-2 items-center"
          >
            <MdAdd className="text-white" />
            <span className="mobile-hide">Nueva Empresa</span>
          </button>
        </div>
      </div>
      <div
        className={`${
          activeFilter ? "" : "hidden"
        } filters grid grid-cols-1 md:grid-cols-6 gap-4 bg-white py-4 px-3 mb-4`}
      >
        <Select
          className="w-full text-sm"
          value={filters.plans}
          onChange={(value) => handleFiltersChange({ plan: value })}
          placeholder="Plan"
        >
          <Option value="">Todos</Option>
          {/* Agrega opciones según tus tipos */}
          <Option value="Casa">Casa</Option>
          <Option value="Departamento">Departamento</Option>
          <Option value="Oficina">Oficina</Option>
          <Option value="Lote">Lote</Option>
        </Select>
        <div className="col-span-2">
          <RangePicker
            className="w-full text-sm"
            value={filters.created_at}
            onChange={(dates) => handleFiltersChange({ created_at: dates })}
            placeholder={["Fecha Creación Desde", "Fecha Creación Hasta"]}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row">
          <button
            className="p-3 rounded bg-white text-light-font text-xs"
            onClick={() => handleClearFilters()}
          >
            Limpiar
          </button>
          <button
            className="p-3 rounded bg-dark-purple text-white text-xs"
            onClick={() => applyFilters()}
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="box-table">
        <table
          className="inmocms-table"
          cellPadding="0"
          cellSpacing="0"
          border="0"
        >
          <thead>
            <tr>
              <td align="center">Logo</td>
              <td>Name </td>
              <td>Admin </td>
              <td>Plan </td>
              <td>Estado </td>
              <td>Renovacion </td>
              <td className="ajustes-tabla-celda">Acciones</td>
            </tr>
          </thead>
          <tbody>
            {visibleEmpresas.length > 0 &&
              visibleEmpresas.map((item, index) => {
                return (
                  <tr className="" key={index}>
                    <td>
                      <div
                        className="w-8 h-8 object-contain"
                        style={{
                          backgroundImage: `url('${item.logo}')`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                        }}
                      ></div>
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <b>{item.admin.name}</b> <br /> {item.admin.email}
                    </td>
                    <td>
                      {item.admin.subscriptions[0].plan.name} <br />{" "}
                      {item.admin.subscriptions[0].plan.price}
                    </td>
                    <td>{item.admin.subscriptions[0].status}</td>
                    <td>
                      {dayjs(item.admin.subscriptions[0].endDate)
                        .locale("es")
                        .format("DD [de] MMMM [del] YYYY")}
                    </td>

                    <td className="ajustes-tabla-celda">
                      <div className="ajustes-tabla-celda-item px-4">
                        <Dropdown
                          className="text-sm text-gray-500"
                          placement="bottomRight"
                          menu={{
                            items: [
                              {
                                label: (
                                  <Link
                                    to={`/companies/edit/${item.id}`}
                                    className="pr-6 rounded flex items-center gap-2 text-sm text-gray-500"
                                  >
                                    <FaEdit /> Editar info
                                  </Link>
                                ),
                                key: 1,
                              },
                              {
                                label: (
                                  <button
                                    onClick={() => {
                                      Modal.confirm({
                                        title:
                                          "¿Está seguro de eliminar la propiedad?",
                                        content:
                                          "Al eliminar la propiedad, se eliminarán los datos relacionados con la propiedad como: modelos, unidades y contenido multimedia",
                                        onOk: () =>
                                          handleEliminarBusiness(item.id),
                                        okText: "Eliminar",
                                        cancelText: "Cancelar",
                                      });
                                    }}
                                    className="w-full rounded flex items-center gap-2 text-sm text-red-500"
                                  >
                                    <FaTrash /> Eliminar
                                  </button>
                                ),
                                key: 2,
                              },
                              {
                                label: (
                                  <Link
                                    to={`/property/${item.id}/models`}
                                    className="pr-6 rounded flex items-center gap-2 text-sm text-gray-500 "
                                  >
                                    <BsViewList /> Ver Modelos
                                  </Link>
                                ),
                                key: 3,
                              },
                              {
                                label: (
                                  <Link
                                    to={`/property/${item.id}/multimedia`}
                                    className="pr-6 rounded flex items-center gap-2 text-sm text-gray-500 "
                                  >
                                    <FiImage /> Multimedia
                                  </Link>
                                ),
                                key: 4,
                              },
                            ],
                          }}
                          trigger={["click"]}
                        >
                          <div
                            className="text-xs w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Space>
                              <FaEllipsisV />
                            </Space>
                          </div>
                        </Dropdown>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="table-controls">
        <div className="page">
          <div className="txt">
            Página {currentPage} de {totalPages}
          </div>
          <div style={{ marginBottom: "12px", marginRight: "24px" }}>
            <Select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e));
                setCurrentPage(1); // Reset page to 1 on items per page change
              }}
              // style={{
              //   width: 120,
              // }}
              // dropdownMatchSelectWidth={false}
              placement={"topLeft"}
              options={[
                {
                  value: "1",
                  label: "1",
                },
                {
                  value: "10",
                  label: "10",
                },
                {
                  value: "25",
                  label: "25",
                },
                {
                  value: "50",
                  label: "50",
                },
                {
                  value: "100",
                  label: "100",
                },
                {
                  value: "500",
                  label: "500",
                },
              ]}
            />
          </div>
        </div>
        <div className="pagination-controls flex gap-2 items-center">
          <button
            className={`p-3 text-xs rounded ${
              currentPage === 1
                ? "bg-light-purple text-dark-purple"
                : "bg-dark-purple text-white"
            }  `}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            1
          </button>
          <button
            className={`p-3 text-xs rounded ${
              currentPage === 1
                ? "bg-light-purple text-dark-purple"
                : "bg-dark-purple text-white"
            }  `}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <button className="p-3 rounded bg-dark-purple text-white text-xs">
            {currentPage}
          </button>
          <button
            className={`p-3 text-xs rounded ${
              currentPage === totalPages
                ? "bg-light-purple text-dark-purple"
                : "bg-dark-purple text-white"
            }  `}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            className={`p-3 text-xs rounded ${
              currentPage === totalPages
                ? "bg-light-purple text-dark-purple"
                : "bg-dark-purple text-white"
            }  `}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {totalPages}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Empresas;

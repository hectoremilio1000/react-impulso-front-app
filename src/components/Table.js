import React from "react";

const Table = ({ columns, data }) => {
  return (
    <>
      <div className="box-table">
        <table
          className="inmocms-table"
          cellPadding="0"
          cellSpacing="0"
          border="0"
        >
          <thead>
            <tr>
              {columns.map((item, index) => {
                return <td key={index}>{item.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, index) => {
                return (
                  <tr className="" key={index}>
                    <td className="check-field">
                      <input
                        type="checkbox"
                        value={item.id || ""}
                        onClick={(e) => handleCheckSelect(e, item.id)}
                        checked={selectsProperties.find((s) => {
                          if (s === item.id) {
                            return true;
                          } else {
                            return false;
                          }
                        })}
                      />
                    </td>
                    <td>
                      <div className="flex flex-col align-center">
                        {item.nombre}
                        <span className="small-size green font-bold">
                          {item.purpose}
                        </span>
                      </div>
                    </td>
                    <td>{item.tipo}</td>
                    <td className="whitespace-no-wrap">
                      {item.exactAddress === null ? "" : item.exactAddress}
                      <br />
                      <p className="font-bold">
                        {item.region_name}
                        {", "}
                        {item.provincia_name}
                        {", "}
                        {item.distrito_name}
                      </p>
                    </td>
                    <td>
                      <div className="whitespace-no-wrap">
                        {item.exactAddress}
                      </div>
                    </td>
                    <td>{item.habs === null ? "0" : item.habs}</td>
                    <td>1</td>
                    <td>Si</td>
                    <td className="whitespace-no-wrap">
                      {item.moneda === "DOLLAR" ? item.precio_from : null}
                      {item.moneda === "DOLLAR" ? "$" : "S/"}
                      {item.moneda === "PEN" ? item.precio_from : null}
                    </td>
                    <td>{buscarEmpresaId(item.empresa_id)}</td>
                    <td>
                      <div
                        className="foto"
                        style={{
                          backgroundImage: `url('${item.logo}')`,
                        }}
                      ></div>
                    </td>
                    <td>
                      <div style={{ textAlign: "center" }}>
                        <div>
                          <span className="estado publicado">
                            {item.status}
                          </span>
                        </div>
                      </div>
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
                                    target="_blank"
                                    to={`/${transformarTexto(
                                      buscarEmpresaId(item.empresa_id)
                                    )}/proyectos/${item.id}`}
                                    className="pr-6 rounded flex items-center gap-2 text-sm text-gray-500"
                                  >
                                    <FaEye /> Ver Propiedad
                                  </Link>
                                ),
                                key: 0,
                              },
                              {
                                label: (
                                  <Link
                                    to={`/propiedades/editar/${item.id}`}
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
                                          handleEliminarProperty(item.id),
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
          <div className="disabled" style={{ marginBottom: "12px" }}>
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              trigger={["click"]}
              disabled={selectsProperties.length > 0 ? false : true}
            >
              <Button>
                Editar selección <TbCaretDownFilled />
              </Button>
            </Dropdown>
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
    </>
  );
};

export default Table;

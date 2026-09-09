import React, { useEffect, useState } from 'react'
import { formatCurrency } from 'global/helper/formatCurrency';
import storeSchema from 'global/store';
import ReactPaginate from 'react-paginate';
import ActionButton from './ActionButton';

const TablePeopleAssignment = ({ data, setData, setSelectedData, sortBy, rangeDate, setTableDataModal, toggleModal, dispatch, navigation, location }) => {
  const headerTable = ["Action", "No Project", "Nama Project", "Total"];

  useEffect(() => {
    if (data) {
      setTableData(data?.list_data);
    }
  }, [data]);

  const [tableData, setTableData] = useState(data?.list_data);
  const [checkAll, setCheckAll] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (data?.total_data) {
      setTotalPage(Math.ceil(data?.total_data / perPage));
    }
  }, [data?.total_data, perPage]);

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    const updatedData = tableData?.map((item) => {
      return { ...item, checked: !checkAll };
    });
    setTableData(updatedData);
  };

  const handleCheckbox = (e, PROJECT_ID) => {
    e.preventDefault();
    setCheckAll(false);

    const updatedData = tableData?.map((item) => {
      if (item.PROJECT_ID === PROJECT_ID) {
        return { ...item, checked: item?.checked ? !item.checked : true };
      }
      return item;
    });

    setTableData(updatedData);
  };

  useEffect(() => {
    const checkedData = tableData?.filter((item) => {
      return item?.checked;
    });

    if (checkedData?.length > 0) {
      setSelectedData(checkedData);
    } else {
      setCheckAll(false);
      setSelectedData(checkedData);
    }
  }, [tableData, setSelectedData]);

  const renewData = async () => {
    const res = await storeSchema.actions.getListProject({
      page: currentPage,
      limit: perPage,
      order: sortBy === "Latest" ? "DESC" : "ASC",
      project_type_id: 1,
      startDate: rangeDate?.startDate,
      endDate: rangeDate?.endDate,
    });
    if (res?.message === "Success") {
      setData(res?.data);
      setTotalPage(Math.ceil(res?.data?.total_data / perPage));
    } else {
      setData({});
    }
  };

  const ChangePerPage = (e) => {
    setPerPage(e.target.value);
  };

  useEffect(() => {
    renewData();
    // eslint-disable-next-line
  }, [perPage, currentPage, sortBy]);

  const changePage = async (e) => {
    const newPage = e.selected + 1;
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className=" overflow-auto pb-[350px]">
        <table className="table table-xs">
          <thead>
            <tr>
            <th className='bg-white'>
                No
                {/* <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={checkAll}
                    onChange={handleCheckAll}
                  />
                </label> */}
              </th>
              {headerTable?.map((header, i) => {
                return <th key={i}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {tableData?.length > 0 ? tableData?.map((v, i) => {
              return (
                <tr key={i}>
                  <td className='w-[3%]'>{v.ROW_NUMBER}</td>
                  <td>
                    {/* <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={v?.checked}
                        onChange={(e) => handleCheckbox(e, v.PROJECT_ID)}
                      />
                    </label> */}

                    <ActionButton 
                        dispatch={dispatch} 
                        selectedData={tableData.filter(item => item.PROJECT_ID == v.PROJECT_ID)} 
                        setTableDataModal={setTableDataModal} 
                        toggleModal={toggleModal}
                        navigation={navigation}
                        location={location}
                    />
                  </td>
                  <td className='w-[20%]'>{v.PROJECT_NO || '-'}</td>
                  <td className='w-[57%]'>{v.PROJECT_NAME || '-'}</td>
                  <td className='w-[20%]'>{formatCurrency(v.TOTAL_COST) || '-'}</td>
                </tr>
              )
            }) : (
              <tr>
                <td colSpan={headerTable?.length}>
                  <div className="flex justify-center items-center">
                    No Data to Display
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-2 mb-6 gap-4">
        <div className="pagination">
          <ReactPaginate
            breakLabel={"..."}
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={totalPage}
            onPageChange={changePage}
            className={"flex gap-1 items-center"}
            activeClassName={'active-pagination'}
            containerClassName="flex gap-2 justify-center mt-4"
            pageClassName="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow hover:bg-gray-200"
            pageLinkClassName="w-full h-full flex items-center justify-center"
            previousLinkClassName={`flex items-center justify-center w-10 h-10 rounded-full bg-white shadow hover:bg-gray-200 `}
            nextLinkClassName="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow hover:bg-gray-200"
            disabledLinkClassName="disabled"
            disabledClassName="disabled"
          />
        </div>
        <div className="perpage flex items-center gap-2 text-xs">
          <select
            className="select select-bordered select-xs w-full max-w-[100px]"
            onChange={ChangePerPage}
          >
            <option value="5">5/Page</option>
            <option value="10" selected>
              10/Page
            </option>
            <option value="25">25/Page</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default TablePeopleAssignment;

import React, { useState } from "react";
import "./Paginate.css";

export default function Paginate({
  data,
  pageLimit,
  dataLimit,
  onDelete,
  RenderComponent,
}) {
  const [selected, select] = useState([]);
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToFirstPage() {
    setCurrentPage(1);
  }
  function goToLastPage() {
    setCurrentPage(pages);
  }
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  //   console.log(data);
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    // console.log()
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  const selectAllVisible = () => {
    if (selected.length === getPaginatedData().length) {
      //need to toggle
      console.log("unselect all");
      select([]);
    } else {
      console.log("selecting all");
      // this.state.data.map((el) => el.id);
      select([...getPaginatedData().map((el) => el.id)]);
    }
    console.log(selected);
  };
  const selectRow = (id) => {
    let newSelected = [...selected];
    let idx = selected.indexOf(id);

    if (idx >= 0) {
      //need to remove
      // newSelected.splice(1, idx);
      console.log("removing object");

      newSelected = selected.filter((el) => el !== id);
    } else {
      console.log("adding object");
      newSelected = [id, ...newSelected];
    }
    console.log(newSelected);
    select([...newSelected]);
  };
  return (
    <>
      <RenderComponent
        columns={Object.keys(data[0]).slice(1)}
        data={getPaginatedData()}
        selected={selected}
        onAllSelect={selectAllVisible}
        onSelect={selectRow}
        delete={onDelete}
      />

      {/* show the pagiantion
              it consists of next and previous buttons
              along with page numbers, in our case, 5 page
              numbers at a time
          */}
      <div className="pagination">
        {/* First button */}
        <button
          onClick={goToFirstPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          first
        </button>
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          <img
            src="https://img.icons8.com/material-sharp/24/000000/chevron-left.png"
            alt="previous button"
          />
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          <img
            src="https://img.icons8.com/material-rounded/24/000000/chevron-right.png"
            alt="next button"
          />
        </button>
        <button
          onClick={goToLastPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          last
        </button>
      </div>
    </>
  );
}

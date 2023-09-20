import React from "react";

const Pages = ({
  handlePreviousBtn,
  handleNextBtn,
  prevUrl,
  nextUrl,
  currentPage,
  totalPages,
}) => {
  return (
    <>
      <div className="pagination-container">
        {prevUrl && <button onClick={handlePreviousBtn}>Previous</button>}
        <span>
          Page {currentPage} of {totalPages}{" "}
        </span>
        {nextUrl && currentPage < totalPages && (
          <button onClick={handleNextBtn}>Next</button>
        )}
      </div>
    </>
  );
};

export default Pages;

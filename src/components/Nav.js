import React from "react";

export default function Nav({ handleSearchChange }) {
  return (
    <nav className="navbar navbar-expand navbar-dark">
      <div className="navbar-collapse row">
      <div className="searchbox">
      <form className="form-inline">
        <input
          className="form-control center"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={e => handleSearchChange(e)}
        />
      </form>
    </div>
      </div>
    </nav>
  );
}



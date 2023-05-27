import { useState } from "react";
import { createPortal } from "react-dom";

const Search = ({ show, search }) => {
  const [q, setQ] = useState("");

  return createPortal(
    <form
      className={`search-form ${!show && "hidden"}`}
      onSubmit={(e) => {
        search(e, q);
      }}>
      {/* <select name="filter">
				<option value="pokemon">Pokemon</option>
				<option value="people">People</option>
			</select> */}
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="form-control"
        placeholder="Search DexApp..."
      />
      <button id="search">
        <i className="material-icons">search</i>
      </button>
    </form>
  );
};

export default Search;

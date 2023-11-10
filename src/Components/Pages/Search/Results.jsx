import Spinner from "components/modules/Spinner";

import { addOrdinalSuffix } from "utils/Helpers";

const Results = ({ results, isLoading, params }) => {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h3 className="header2">
        Showing all {params.type !== "All" ? params.type : null} types from{" "}
        {params.gen === "All" ? "each" : addOrdinalSuffix(params.gen)} generation
      </h3>
      <div className="result-container">
        {results
          .filter((result) => {
            if (params.type === "All" && params.gen === "All") {
              return result;
            } else if (result.gen === parseInt(params.gen) && result.types.includes(params.type)) {
              return result;
            } else if (result.gen === parseInt(params.gen) && params.type === "All") {
              return result;
            } else if (result.types.includes(params.type) && params.gen === "All") {
              return result;
            }
          })
          .map((result) => {
            return (
              <></>
              // <ResultCard
              //   key={result.id}
              //   id={result.id}
              //   art_url={result.art_url}
              //   name={result.name}
              //   isLoading={isLoading}
              // />
            );
          })}
      </div>
    </>
  );
};

export default Results;

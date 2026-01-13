import Header from "./components/Header.jsx";
import decisions from "./data.js";
import Decision from "./components/Decision.jsx";
import { useState } from "react";
import "./style.css";

function App() {
  const [selectedId, setSelectedId] = useState({
    OptionA: "",
    OptionB: "",
  });

  const [result, setResult] = useState(null);

  const optionATitle = decisions.find(
    (d) => d.id === selectedId.OptionA
  )?.title;
  const optionBTitle = decisions.find(
    (d) => d.id === selectedId.OptionB
  )?.title;
  const optionATime = decisions.find((d) => d.id === selectedId.OptionA)?.time;
  const optionARisk = decisions.find((d) => d.id === selectedId.OptionA)?.risk;
  const optionAPayoff = decisions.find(
    (d) => d.id === selectedId.OptionA
  )?.payoff;
  const optionAFlex = decisions.find(
    (d) => d.id === selectedId.OptionA
  )?.flexibility;
  const optionBTime = decisions.find((d) => d.id === selectedId.OptionB)?.time;
  const optionBRisk = decisions.find((d) => d.id === selectedId.OptionB)?.risk;
  const optionBPayoff = decisions.find(
    (d) => d.id === selectedId.OptionB
  )?.payoff;
  const optionBFlex = decisions.find(
    (d) => d.id === selectedId.OptionB
  )?.flexibility;

  const optionAObj = decisions.find((d) => d.id === selectedId.OptionA);
  const optionBObj = decisions.find((d) => d.id === selectedId.OptionB);

  const rank = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  function compareOptions(optionA, optionB) {
    if (rank[optionA.payoff] !== rank[optionB.payoff]) {
      return {
        winner: rank[optionA.payoff] > rank[optionB.payoff] ? "A" : "B",
        reason: "Higher payoff",
      };
    }

    if (rank[optionA.risk] !== rank[optionB.risk]) {
      return {
        winner: rank[optionA.risk] < rank[optionB.risk] ? "A" : "B",
        reason: "Lower risk",
      };
    }

    if (rank[optionA.time] !== rank[optionB.time]) {
      return {
        winner: rank[optionA.time] < rank[optionB.time] ? "A" : "B",
        reason: "Lower time",
      };
    }

    return {
      winner: "Tie",
      reason: "All criteria equal",
    };
  }

  function onCompare() {
    console.log("Compare button clicked");
  }

  const [isClicked, setIsClicked] = useState(false);

  function handleClick(id) {
    setSelectedId((preValue) => {
      if (preValue.OptionA === "") {
        return {
          OptionA: id,
          OptionB: preValue.OptionB,
        };
      } else if (preValue.OptionB === "") {
        return {
          OptionA: preValue.OptionA,
          OptionB: id,
        };
      } else {
        return preValue;
      }
    });
  }

  return (
    <div>
      <Header />
      <ul>
        {decisions.map((item) => {
          let label = "";

          if (item.id === selectedId.OptionA) {
            label = "OptionA";
          } else if (item.id === selectedId.OptionB) {
            label = "OptionB";
          } else {
            label = item.title;
          }
          return (
            <Decision
              key={item.id}
              title={item.title}
              id={item.id}
              label={label}
              onClick={handleClick}
            />
          );
        })}
      </ul>
      {selectedId.OptionA && selectedId.OptionB && (
        <button
          onClick={() => {
            const comparison = compareOptions(optionAObj, optionBObj);
            setResult(comparison);
            setIsClicked(true);
          }}
        >
          Compare
        </button>
      )}
      {isClicked && (
        <>
          <table className="compare-table">
            <thead>
              <tr>
                <th></th>
                <th>{optionATitle}</th>
                <th>{optionBTitle}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Time</td>
                <td>{optionATime}</td>
                <td>{optionBTime}</td>
              </tr>
              <tr>
                <td>Risk</td>
                <td>{optionARisk}</td>
                <td>{optionBRisk}</td>
              </tr>
              <tr>
                <td>Payoff</td>
                <td>{optionAPayoff}</td>
                <td>{optionBPayoff}</td>
              </tr>
              <tr>
                <td>Flexibility</td>
                <td>{optionAFlex}</td>
                <td>{optionBFlex}</td>
              </tr>
            </tbody>
          </table>

          {result && (
            <div>
              <h3>
                Winner:{" "}
                {result.winner === "A"
                  ? optionATitle
                  : result.winner === "B"
                  ? optionBTitle
                  : "Tie"}
              </h3>
              <p>Reason: {result.reason}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;

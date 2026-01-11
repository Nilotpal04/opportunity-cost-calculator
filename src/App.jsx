import Header from "./components/Header.jsx";
import decisions from "./data.js";
import Decision from "./components/Decision.jsx";
import { useState } from "react";

function App() {
  const [selectedId, setSelectedId] = useState({
    OptionA: "",
    OptionB: "",
  });

  const optionATitle = decisions.find(d => d.id === selectedId.OptionA)?.title;
  const optionBTitle = decisions.find(d => d.id === selectedId.OptionB)?.title;

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
        <button onClick={() => setIsClicked(true)}>Compare</button>
      )}
      {isClicked && (
        <div>
          <p>Option A : {optionATitle}</p>
          <p>Option B : {optionBTitle}</p>
        </div>
      )}
    </div>
  );
}

export default App;

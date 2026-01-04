import Header from "./components/Header.jsx";
import decisions from "./data.js";
import Decision from "./components/Decision.jsx";
import { useState } from "react";

function App() {
  const [selectedId, setSelectedId] = useState({
    OptionA: "",
    OptionB: "",
  });

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
    </div>
  );
}

export default App;

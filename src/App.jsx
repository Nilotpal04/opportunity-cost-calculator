import Header from "./components/Header.jsx";
import decisions from "./data.js";
import Decision from "./components/Decision.jsx";
import {useState} from "react"

function App() {
  const [selectedId, setSelectedId] = useState();
  function handleClick(id){
    setSelectedId(id);
  }

  return (
    <div>
      <Header />
      <ul>
      {decisions.map((item) => (
        <Decision
          key={item.id}
          title={item.title}
          id={item.id}
          onClick={handleClick}
        />
      ))}
      </ul>
      <p>Selected ID: {selectedId}</p>
    </div>
  );
}

export default App;


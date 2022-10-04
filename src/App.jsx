import { useEffect, useState } from "react";
import "./styles/index.scss";
import Form from "./components/Form";
import List from "./components/List";
import Header from "./components/Header";

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={`main-wrapper ${theme}`}>
      <section className="background main">
        <div className="container">
          <Header theme={theme} setTheme={setTheme}/>
          <Form />
          <List />
        </div>
        <p className="align-center">Drag and drop to organize list</p>
      </section>
    </div>
  );
}

export default App;

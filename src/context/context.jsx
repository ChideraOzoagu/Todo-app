import React, { useContext, useEffect, useState } from "react";
export const AppContext = React.createContext();

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(list));
  } else {
    return [];
  }
  
};
const themeStorage = () => {
  let theme = localStorage.getItem("theme");
  if (theme) {
    return (theme = JSON.parse(theme));
  } else {
    return "dark";
  }
};

export const AppProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [theme, setTheme] = useState(themeStorage());

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [list, theme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = {
        id: new Date().getTime().toString(),
        todoItem: name,
        completed: false,
      };
      setList([...list, newItem]);
      setName("");
    }
  };
  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };
  const completedItem = (id) => {
    const tempList = list.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return { ...item };
    });
    setList(tempList);
  };

  return (
    <AppContext.Provider
      value={{
        name,
        setName,
        handleSubmit,
        list,
        setList,
        removeItem,
        completedItem,
        setList,
        theme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

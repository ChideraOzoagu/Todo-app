import React, { useContext, useState } from "react";
export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [taskComplete, setTaskComplete] = useState(false)
  const [completedList, setCompletedList] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = {
        id: new Date().getTime().toString(),
        todoItem: name,
      };
      setList([...list, newItem]);
      setName("");
    }
  };
  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList)
  };
  const completedItem = (id)=>{
    const newList = list.filter((item)=> item.id === id)
    setTaskComplete(!taskComplete)
    // setCompletedList([...completedList, newList])
    
  }
  return (
    <AppContext.Provider
      value={{
        name,
        setName,
        handleSubmit,
        list,
        setList,
        removeItem,
        taskComplete,
        completedItem,
        completedList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

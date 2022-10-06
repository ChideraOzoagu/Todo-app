import React, { useRef, useState } from "react";
import { useGlobalContext } from "../context/context";

const FILTER_MAP = {
  All: () => true,
  Active: (item) => !item.completed,
  Completed: (item) => item.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const List = () => {
  const { list, removeItem, completedItem, setList } = useGlobalContext();
  const [filter, setFilter] = useState(FILTER_NAMES[0]);

  // filtered array
  const filtered = list.filter(FILTER_MAP[filter]);

  // amount of list left
  const taskLength = () => {
    const listLength = list.filter((item) => !item.completed);
    return listLength.length;
  };

  // clear completed list
  const clearCompleted = () => {
    const completedTasks = list.filter((item) => {
      return !item.completed;
    });
    setList(completedTasks);
  };

  // drag and drop functionality
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;

  };
  
  const drop =()=>{
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current]
    copyListItems.splice(dragItem.current, 1)
    copyListItems.splice(dragOverItem.current, 0, dragItemContent)
    setList(copyListItems);
    dragItem.current = null;
    dragOverItem.current = null;
  }

  return (
    <>
      <section className="list">
        {/* single item */}
        {list.length > 0 &&
          filtered.map((item, index) => {
            const { id, todoItem, completed } = item;
            return (
              <div
                className="single-item"
                key={id}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
                draggable
              >
                <div
                  className={`listName-check ${completed ? "completed" : ""}`}
                  onClick={() => completedItem(id)}
                >
                  <div className="checkmark"></div>
                  <p className="todoItem">{todoItem}</p>
                </div>
                <button className="delete-btn" onClick={() => removeItem(id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                  >
                    <path
                      fill="#494C6B"
                      fillRule="evenodd"
                      d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        {/* end of single item */}
        <div className="list-footer">
          <p>
            {taskLength()} {`${list.length !== 1 ? "tasks" : "task"}`} left
          </p>
          <div className={` desktop-filter desktop-only`}>
            {FILTER_NAMES.map((name) => {
              return (
                <p
                  className={`${filter === name ? "active" : ""}`}
                  key={name}
                  onClick={() => setFilter(name)}
                >
                  {name}
                </p>
              );
            })}
          </div>
          <p className="clear-btn" onClick={clearCompleted}>
            Clear Completed
          </p>
        </div>
      </section>
      <div className="mobile-only filter">
        {FILTER_NAMES.map((name) => {
          return (
            <p
              className={`${filter === name ? "active" : ""}`}
              key={name}
              onClick={() => setFilter(name)}
            >
              {name}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default List;

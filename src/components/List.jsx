import React, { useState } from "react";
import { useGlobalContext } from "../context/context";
const List = () => {
  const { list, removeItem, completedItem, taskComplete, completedList } = useGlobalContext();

  return (
    <>
      <section className="list">
        {/* single item */}
        {list.length > 0 &&
          list.map((item) => {
            const { id, todoItem } = item;
            return (
              <div className="single-item" key={id}>
                <div className={`listName-check ${taskComplete ?'completed':''}`} onClick={()=> completedItem(id)}>
                  <div className="checkmark"></div>
                  <p className="todoItem">{todoItem}</p>
                </div>
                <button className="delete-btn" onClick={()=>removeItem(id)}>
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
          <p>{list.length} items left</p>
          <div className="desktop-filter desktop-only">
            <p>All</p>
            <p>Active</p>
            <p>Completed</p>
          </div>
          <p className="clear-btn">Clear Completed</p>
        </div>
      </section>
      <div className="mobile-only filter">
        <p>All</p>
        <p>Active</p>
        <p>Completed</p>
      </div>
    </>
  );
};

export default List;

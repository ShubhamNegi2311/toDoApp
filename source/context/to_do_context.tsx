import React from 'react';
import {ToDo} from '../types/app_types';

type ToDoContextType = {
  toDoList: ToDo[];
  addNewToDo: (data: ToDo) => void;
  deleteToDo: (data: ToDo) => void;
  checkToDo: (data: ToDo) => void;
};

export const ToDoContext = React.createContext({} as ToDoContextType);

type ToDoContextProviderType = {
  children: React.ReactNode;
};

export const ToDoContextProvider = (props: ToDoContextProviderType) => {
  const [toDoList, setToDoList] = React.useState<ToDo[]>([]);

  const addNewToDo = (data: ToDo) => {
    setToDoList(prev => {
      return [...prev, data];
    });
  };

  const deleteToDo = (data: ToDo) => {
    const filteredData = toDoList.filter(item => {
      if (item.id !== data.id) {
        return item;
      }
    });

    setToDoList(filteredData);
  };

  const checkToDo = (data: ToDo) => {
    const updatedList = toDoList.map(item => {
      if (item.id === data.id) {
        return {...item, isChecked: true};
      } else {
        return item;
      }
    });

    setToDoList(updatedList);
  };

  const value = {toDoList, addNewToDo, deleteToDo, checkToDo};
  return (
    <ToDoContext.Provider value={value}>{props.children}</ToDoContext.Provider>
  );
};

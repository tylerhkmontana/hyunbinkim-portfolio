import { createContext, useContext, useState } from "react";

const Context = createContext();

export function TaskManager({ children }) {
  const [tasks, setTasks] = useState({
    openedPrograms: []
  });

  const [activeProgram, setActiveProgram] = useState({
    name: '',
    iconImage: ''
  })

  const openProgram = (iconName, iconImage) => {
    let newProgram = {
        iconName,
        iconImage
    }
    setTasks(prev => ({
        ...prev,
        openedPrograms: [...prev.openedPrograms, newProgram]
    }))

    setActiveProgram({
        iconName,
        iconImage
    })
  }

  const closeProgram = (iconName) => {
    let newOpenedPrograms = tasks.openedPrograms.filter(program => program.iconName !== iconName)

    if (activeProgram.iconName === iconName) 
        setActiveProgram(newOpenedPrograms.length > 0 ? newOpenedPrograms[newOpenedPrograms.length - 1] : {iconName: '', iconImage: ''})

    setTasks(prev => ({
        ...prev,
        openedPrograms: newOpenedPrograms
    }))
  }

  const switchToActive = (iconName, iconImage) => setActiveProgram({ iconName, iconImage })

  return (
    <Context.Provider value={{ tasks, activeProgram, openProgram, closeProgram, switchToActive }}>{children}</Context.Provider>
  );
}

export function useTaskManager() {
  return useContext(Context);
}
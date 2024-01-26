import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export function TaskManager({ children }) {
  const [windowInfo, setWindoInfo] = useState({
    width: 0,
    height: 0
  })

  const [tasks, setTasks] = useState({
    openedPrograms: {}
  });

  const [activeProgram, setActiveProgram] = useState('')

  useEffect(() => {
    // initialize window size
    setWindoInfo({
        width: window.innerWidth,
        height: window.innerHeight
    })

    // update window size
    function resizeHandler() {
        setWindoInfo({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    window.addEventListener('resize', () => resizeHandler())

    return () => window.removeEventListener('click', () =>  resizeHandler())
  }, [])

  const openProgram = (pid, iconName, iconImage, width, height, x, y) => {
    if ((pid in tasks.openedPrograms)) {
        if (tasks.openedPrograms[pid].isMinimized) {
            unminimizeProgram(pid)
        }
    } else {
        let newProgram = {
            iconName,
            iconImage,
            width,
            height,
            x,
            y,
            isMinimized: false,
            isMaximized: false
        }
    
        setTasks(prev => ({
            ...prev,
            openedPrograms: {...tasks.openedPrograms, [pid]: newProgram}
        }))

        setActiveProgram(pid)
    }
  }

  const closeProgram = (pid) => {
    let newOpenedPrograms = {...tasks.openedPrograms}
    delete newOpenedPrograms[pid]
    let pids = Object.keys(newOpenedPrograms).filter(id => !newOpenedPrograms[id].isMinimized )

    if (pids.length > 0) {
        setActiveProgram(pids.pop())
    }
    

    setTasks(prev => ({
        ...prev,
        openedPrograms: {...newOpenedPrograms}
    }))
  }

  const maximizeProgram = (pid) => {
    console.log(document.getElementById(pid))
    document.getElementById(pid).style.transform = 'translate(0, 0)'
    let updatedPrograms = {...tasks.openedPrograms}
    updatedPrograms[pid].isMaximized = true

    setTasks(prev => ({
        ...prev,
        openedPrograms: {...updatedPrograms}
    })) 
  }

  const restoreProgram = (pid) => {
    let updatedPrograms = {...tasks.openedPrograms}
    updatedPrograms[pid].isMaximized = false

    setTasks(prev => ({
        ...prev,
        openedPrograms: {...updatedPrograms}
    })) 
  }


  const minimizeProgram = (pid) => {
    let updatedPrograms = {...tasks.openedPrograms}

    updatedPrograms[pid].isMinimized = true

    setTasks(prev => ({
        ...prev,
        openedPrograms: updatedPrograms
    }))

    let pids = Object.keys(updatedPrograms).filter(id => !updatedPrograms[id].isMinimized )

    setActiveProgram(pids.pop())
  }

  const unminimizeProgram = (pid) => {
    let updatedPrograms = {...tasks.openedPrograms}

    updatedPrograms[pid].isMinimized = false

    setTasks(prev => ({
        ...prev,
        openedPrograms: updatedPrograms
    }))

    setActiveProgram(pid)
  }

  const switchToActive = (pid) => setActiveProgram(pid)

  return (
    <Context.Provider value={{ 
        windowInfo,
        tasks, 
        activeProgram, 
        openProgram, 
        closeProgram, 
        maximizeProgram,
        restoreProgram,
        minimizeProgram, 
        unminimizeProgram, 
        switchToActive, 
    }}>{children}</Context.Provider>
  );
}

export function useTaskManager() {
  return useContext(Context);
}
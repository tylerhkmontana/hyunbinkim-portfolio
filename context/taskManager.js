import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export function TaskManager({ children }) {
  const [screenInfo, setScreenInfo] = useState({
    width: 0,
    height: 0
  })

  // Might add few more active tasks in the future
  const [tasks, setTasks] = useState({openedPrograms: {}});
  const [activeProgram, setActiveProgram] = useState("dae7d90f-e2db-4cfc-8ac1-0b0948be817d")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = window.innerWidth < 1025
    // initialize window size
    setScreenInfo({
        width: window.innerWidth,
        height: window.innerHeight
    })

    // check if the viewport is mobile
    if (checkIsMobile) {
      setIsMobile(true)
    }

    setTasks(prev => ({
      ...prev,
      openedPrograms: {
        "dae7d90f-e2db-4cfc-8ac1-0b0948be817d": {
          programInfo:  {
            pid: "dae7d90f-e2db-4cfc-8ac1-0b0948be817d",
            iconName: "Welcome.bat",
            iconImage: "/icons/bat.png",
            programType: "cmd",
            asciiArt: "█░█░█ █▀▀ █░░ █▀▀ █▀█ █▀▄▀█ █▀▀   ▀█▀ █▀█\n▀▄▀▄▀ ██▄ █▄▄ █▄▄ █▄█ █░▀░█ ██▄   ░█░ █▄█\n\n█░█ █▄█ █░█ █▄░█ █▄▄ █ █▄░█   █▄▀ █ █▀▄▀█ ▀ █▀\n█▀█ ░█░ █▄█ █░▀█ █▄█ █ █░▀█   █░█ █ █░▀░█ ░ ▄█\n\n█▀█ █▀█ █▀█ ▀█▀ █▀▀ █▀█ █░░ █ █▀█   █░█░█ █▀▀ █▄▄ █▀ █ ▀█▀ █▀▀\n█▀▀ █▄█ █▀▄ ░█░ █▀░ █▄█ █▄▄ █ █▄█   ▀▄▀▄▀ ██▄ █▄█ ▄█ █ ░█░ ██▄",
            content: "Welcome to windows 95 themed portfolio website of mine. \nPlease feel free to explore the one & only Operating System I created. \n \n* all of my projects are located in \"Portfolios\" folder \n** you can read my resume from Resume.txt file"
          },
          windowInfo: {
            width: checkIsMobile ? window.innerWidth * .8 : window.innerWidth/2,
            height: checkIsMobile ? window.innerHeight * .8 : window.innerHeight/2,
            x: checkIsMobile ? 40 : 100,
            y: checkIsMobile ? 40 : 100,
            isMinimized: false,
            isMaximized: false
          }
        }
      }
    }))

    // update window size
    function resizeHandler() {
        setScreenInfo({
            width: window.innerWidth,
            height: window.innerHeight
        })

        if (window.innerWidth < 1025) {
          setIsMobile(true)
        } else {
          setIsMobile(false)
        }
    }

    window.addEventListener('resize', () => resizeHandler())

    return () => window.removeEventListener('click', () =>  resizeHandler())
  }, [])

  const openProgram = (programInfo, width, height, x, y) => {
    const { pid } = programInfo
    if ((pid in tasks.openedPrograms)) {
        if (tasks.openedPrograms[pid].isMinimized) {
            unminimizeProgram(pid)
        }
    } else {
        let newProgram = {
            programInfo,
            windowInfo : {
              width,
              height,
              x,
              y,
              isMinimized: false,
              isMaximized: false
            }
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
    let pids = Object.keys(newOpenedPrograms).filter(id => !newOpenedPrograms[id].windowInfo.isMinimized )

    if (pids.length > 0) {
        setActiveProgram(pids.pop())
    }
    

    setTasks(prev => ({
        ...prev,
        openedPrograms: {...newOpenedPrograms}
    }))
  }

  const maximizeProgram = (pid) => {
    document.getElementById(pid).style.transform = 'translate(0, 0)'
    let updatedPrograms = {...tasks.openedPrograms}
    updatedPrograms[pid].windowInfo.isMaximized = true

    setTasks(prev => ({
        ...prev,
        openedPrograms: {...updatedPrograms}
    })) 
  }

  const restoreProgram = (pid) => {
    let updatedPrograms = {...tasks.openedPrograms}
    updatedPrograms[pid].windowInfo.isMaximized = false

    setTasks(prev => ({
        ...prev,
        openedPrograms: {...updatedPrograms}
    })) 
  }


  const minimizeProgram = (pid) => {
    let updatedPrograms = {...tasks.openedPrograms}

    updatedPrograms[pid].windowInfo.isMinimized = true

    setTasks(prev => ({
        ...prev,
        openedPrograms: updatedPrograms
    }))

    let pids = Object.keys(updatedPrograms).filter(id => !updatedPrograms[id].windowInfo.isMinimized )

    setActiveProgram(pids.pop())
  }

  const unminimizeProgram = (pid) => {
    let updatedPrograms = {...tasks.openedPrograms}

    updatedPrograms[pid].windowInfo.isMinimized = false

    setTasks(prev => ({
        ...prev,
        openedPrograms: updatedPrograms
    }))

    setActiveProgram(pid)
  }

  const switchToActive = (pid) => setActiveProgram(pid)

  return (
    <Context.Provider value={{ 
        screenInfo,
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
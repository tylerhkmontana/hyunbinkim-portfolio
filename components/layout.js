import { useState, useEffect } from "react";
import { useTaskManager } from "@/context/taskManager";
import Window from '@/components/window'

export default function Layout({ children }) {
  const { tasks, activeProgram, minimizeProgram, unminimizeProgram, switchToActive } = useTaskManager()
  const { openedPrograms }  = tasks
  const [isStartToggled, setIsStartToggled] = useState(false)

  useEffect(() => {
    function deselectHandler(e) {
        if (e.target.id  !== 'startMenu' && e.target.id !== 'startButton') {
            setIsStartToggled(false)
        }
    }

    window.addEventListener('click', e => deselectHandler(e))

    return () => window.removeEventListener('click', e => deselectHandler(e))
})

  const clickedFromTaskbar = (pid) => {
    if (openedPrograms[pid].isMinimized) {
      unminimizeProgram(pid)
    } else if (activeProgram === pid && !openedPrograms[pid].isMinimized) {
      minimizeProgram(pid)
    } else {
      switchToActive(pid)
    }
  }

  return (
    <div>
      <main>
        {/* <button onClick={() => console.log(tasks.openedPrograms)}>Open Task Manager</button> */}
        {children}

        {/* Opened Windows */}
        {
          Object.keys(openedPrograms).map((pid) => <Window key={pid} programInfo={openedPrograms[pid]} pid={pid}/>)
        }

        {/* Start Menu */}
        <div id="startMenu" className="fixed left-1 bottom-8 z-[100] w-64 h-auto bg-[#C0C0C0] shadow-[1px_1px_1px_#000,-1px_-1px_1px_#fff]" style={{ display: isStartToggled ? 'block' : 'none' }}>
          <div className="absolute h-full w-8 top-0 left-0 bg-[#909090]">
            <h2 className="absolute rotate-[270deg] origin-[0 0] bottom-0 left-0 ml-[-48px] mb-[62px] text-xl text-white"><strong className="text-2xl text-[#c0c0c0]">Borninkorea</strong>94</h2>
          </div>
          <ul className="flex flex-col h-full justify-evenly items-stretch">
            <li className="pl-12 pr-2 py-3 flex items-center justify-between hover:bg-[#000080] hover:text-white">
              <div className="flex items-center gap-2">
                <img className="w-7 h-7" src="/icons/documents.png" alt="documents icon"/>
                <span><span className="underline">D</span>ocuments</span>
              </div>
              <span>&#9656;</span>
            </li>
            <li className="pl-12 pr-2 py-3 flex items-center justify-between hover:bg-[#000080] hover:text-white">
              <div className="flex items-center gap-2">
                <img className="w-7 h-7" src="/icons/settings.png" alt="setting icon"/>
                <span><span className="underline">S</span>ettings</span>
              </div>
              <span>&#9656;</span>
            </li>
            <li className="pl-12 py-3 flex items-center gap-2 hover:bg-[#000080] hover:text-white">
              <img className="w-7 h-7" src="/icons/find.png" alt="find icon"/>
              <span><span className="underline">F</span>ind</span>
            </li>
            <li className="pl-12 py-3 flex items-center gap-2 hover:bg-[#000080] hover:text-white">
              <img className="w-7 h-7" src="/icons/run.png" alt="run icon"/>
              <span><span className="underline">R</span>un</span>
            </li>
            <hr/>
            <li className="pl-12 py-3 flex items-center gap-2 hover:bg-[#000080] hover:text-white">
              <img className="w-7 h-7" src="/icons/shutdown.png" alt="shutdown icon"/>
              <span>Sh<span className="underline">u</span>t Down..</span>
            </li>
          </ul>
        </div>


      {/* Status Bar */}
        <footer className="fixed bottom-0 w-screen h-8 bg-[#C0C0C0] shadow-[0px_-2px_2px_#fff] flex items-stretch justify-start p-1">
          <div 
            id="startButton" 
            onClick={() => setIsStartToggled(!isStartToggled)} 
            className="shadow-[-1px_-1px_2px_#fff,1px_1px_2px_#000] flex items-center px-2 gap-1 cursor-pointer active:shadow-[inset_2px_2px_0px_#7d7d7d,inset_-2px_-2px_0px_#ffffff]" 
            style={{ boxShadow: isStartToggled ? 'inset 2px 2px 0px #7d7d7d, inset -2px -2px 0px #ffffff' : '' }}>
            <div id="startButton" className="grid grid-cols-2 grid-rows-2 gap-[2px] w-4 h-4">
              <div id="startButton" className="w-auto h-auto bg-[#FF1614]"></div>
              <div id="startButton" className="w-auto h-auto bg-[#138412]"></div>
              <div id="startButton" className="w-auto h-auto bg-[#0808FE]"></div>
              <div id="startButton" className="w-auto h-auto bg-[#FFFF1B]"></div>
            </div>
            <span id="startButton" className="text-sm">Start</span>
          </div>

          <div className="flex ml-4 gap-2">
            {
              Object.keys(openedPrograms).map((pid, i) => 
                <span 
                  key={i}
                  className="px-2 w-40 cursor-pointer flex items-center gap-1" 
                  style={{ 
                    boxShadow: activeProgram === pid ? 'inset 2px 2px 0px #7d7d7d, inset -2px -2px 0px #ffffff' : '-1px -1px 2px #fff, 1px 1px 2px #000', 
                    backgroundColor: activeProgram === pid && 'rgb(248 250 252)'
                  }}
                  onClick={() => clickedFromTaskbar(pid)}>
                    <img className="w-4 h-4" src={openedPrograms[pid].iconImage} alt={`icon image of ${openedPrograms[pid].iconName}`}/>
                  { openedPrograms[pid].iconName }
                </span>)
            }
          </div>

          <div className="shadow-[inset_2px_2px_0px_#7d7d7d,inset_-2px_-2px_0px_#ffffff] px-2 flex items-center ml-auto">
            <img className="w-4" src="/icons/sound.png" alt="sound icon"/>
            <span className="text-xs">
              3:49 PM
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

import Draggable from "react-draggable"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTaskManager } from "..//context/taskManager"

export default function Icon({ iconImage, iconName, pid }) {
    const { openProgram, tasks } = useTaskManager()
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        function deselectHandler(e) {
            if (e.target.id  !== iconName) {
                setIsSelected(false)
            }
        }

        window.addEventListener('click', e => deselectHandler(e))

        return () => window.removeEventListener('click', e => deselectHandler(e))
    })

    

    function open(e) {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const pids = Object.keys(tasks.openedPrograms)
        let openLocation = { x: 50, y: 50}

        if (pids.length > 0) {
            openLocation.x = tasks.openedPrograms[pids[pids.length - 1]].x + 20
            openLocation.y = tasks.openedPrograms[pids[pids.length - 1]].y + 20
        } 

        if (e.detail === 2) {
            setIsSelected(true)
            openProgram(pid, iconName, iconImage, windowWidth/2, windowHeight/2, openLocation.x, openLocation.y)
        } else if (e.detail === 1) {
            setIsSelected(!isSelected)
        }
    }

    const selectedStyle = {
        backgroundColor: '#00007F', 
        border: '1px dotted ',
        color: 'white'
      }

    return (
        <>
            <Draggable>
                <div id={iconName} className="flex flex-col items-center gap-1 w-20 h-20 cursor-pointer" onClick={e => open(e)}>
                <Image src={iconImage} width={50} height={50} style={{ pointerEvents: 'none'}} alt={`icon image of ${iconName}`}/>
                <p className="text-xs p-[1px]" style={ isSelected ? selectedStyle : {} }>{ iconName }</p>
                </div>
            </Draggable>
        </>
    )
}
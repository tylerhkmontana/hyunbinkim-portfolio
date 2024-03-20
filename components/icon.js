import Draggable from "react-draggable"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTaskManager } from "..//context/taskManager"

export default function Icon({ programInfo }) {
    const { iconName, iconImage, programType, url } = programInfo
    const { openProgram, tasks } = useTaskManager()
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        function deselectHandler(e) {
            if (e.target.id  !== iconName) {
                setIsSelected(false)
            }
        }

        window.addEventListener('click', e => deselectHandler(e))
        // window.addEventListener('touchstart', e => deselectHandler(e))


        return () => {
            // window.removeEventListener('click', e => deselectHandler(e))
            window.removeEventListener('touchstart', e => deselectHandler(e))
        }
    })

    

    function open(e) {
        const windowWidth = window.innerWidth/2
        const windowHeight = window.innerHeight/2
        const pids = Object.keys(tasks.openedPrograms)
        let openLocation = { x: 50, y: 50}

        if (pids.length > 0) {
            openLocation.x = tasks.openedPrograms[pids[pids.length - 1]].windowInfo.x + 20
            openLocation.y = tasks.openedPrograms[pids[pids.length - 1]].windowInfo.y + 20
        } 

        if (e.detail === 2) {
            setIsSelected(true)
            programType === 'browser' ? 
                window.open(url) : 
                openProgram(programInfo, windowWidth, windowHeight, openLocation.x, openLocation.y)
        } else if (e.detail === 1) {
            setIsSelected(!isSelected)
        }
    }

    function mobileopen(e) {
        const windowWidth = window.innerWidth * .8
        const windowHeight = window.innerHeight * .8
        const pids = Object.keys(tasks.openedPrograms)
        let openLocation = { x: 40, y: 40}

        if (pids.length > 0) {
            openLocation.x = tasks.openedPrograms[pids[pids.length - 1]].windowInfo.x + 10
            openLocation.y = tasks.openedPrograms[pids[pids.length - 1]].windowInfo.y + 10
        } 

        programType === 'browser' ? 
            window.open(url) : 
            openProgram(programInfo, windowWidth, windowHeight, openLocation.x, openLocation.y)
    }

    const selectedStyle = {
        backgroundColor: '#00007F', 
        border: '1px dotted ',
        color: 'white'
      }

    return (
        <>
            <Draggable>
                <div id={iconName} className="flex flex-col items-center gap-1 w-20 h-20 cursor-pointer" onClick={e => open(e)} onTouchStart={e => mobileopen(e)}>
                <Image src={iconImage} width={50} height={50} style={{ pointerEvents: 'none'}} alt={`icon image of ${iconName}`}/>
                <p className="text-xs p-[1px] text-center" style={ isSelected ? selectedStyle : {} }>{ iconName }</p>
                </div>
            </Draggable>
        </>
    )
}
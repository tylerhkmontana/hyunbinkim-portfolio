import Draggable from "react-draggable"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTaskManager } from "..//context/taskManager"

export default function Icon({ iconImage, iconName }) {
    const { openProgram, closeProgram, activeProgram } = useTaskManager()
    const [isSelected, setIsSelected] = useState(false)
    const [isWindowOpened, setIsWindowOpened] = useState(false)
    const [windowStatus, setWindowStatus] = useState({
        width: 800,
        height: 500,
        x: 50,
        y: 50,
        isMaximized: false
    })

    useEffect(() => {
        function deselectHandler(e) {
            if (e.target.id  !== iconName) {
                setIsSelected(false)
            }
        }

        window.addEventListener('click', e => deselectHandler(e))

        return () => window.removeEventListener('click', e => deselectHandler(e))
    })

    function draggableHandler(event, data) {
        setWindowStatus(prev => ({...prev, x: data.x, y: data.y }))
    }

    function open(e) {
        if (e.detail === 2 && !isWindowOpened) {
            setIsSelected(true)
            setIsWindowOpened(true)
            openProgram(iconName, iconImage)
        } else if (e.detail === 1) {
            setIsSelected(!isSelected)
        }
    }

    function close() {
        setIsWindowOpened(false)
        closeProgram(iconName)
    }

    function maximize() {
        const screenHeight = window.innerHeight
        const screenWidth = window.innerWidth

        setWindowStatus(prev => ({width: screenWidth, height: screenHeight - 35, x: 0, y: 0, isMaximized: true}))
    }

    function restore() {
        const screenHeight = window.innerHeight
        const screenWidth = window.innerWidth

        setWindowStatus(prev => ({width: 800, height: 500, x: 50, y: 50, isMaximized: false}))
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
            
            <Draggable handle="#windowTop" onStop={draggableHandler}>
                <div 
                    className="p-[2px] bg-[#c0c0c0] fixed flex flex-col shadow-[1px_1px_1px_#000,-1px_-1px_1px_#fff]" 
                    style={{ 
                        display: isWindowOpened ? 'flex' : 'none', 
                        resize: 'both', 
                        overflow: 'auto', 
                        width: windowStatus.width, 
                        height: windowStatus.height, 
                        top: windowStatus.y,
                        left: windowStatus.x,
                        zIndex: activeProgram.iconName === iconName ? 99 : 20 }}>
                    <div 
                        id="windowTop" 
                        className="w-full h-7 bg-[#909090] flex items-center justify-start px-1 py-2 gap-2"
                        style={{ 
                            backgroundColor: activeProgram.iconName === iconName ? '#000080' : '#909090', 
                            color: activeProgram.iconName === iconName ? '#fff' : '#000'}}>
                        <img className="w-5 h-5" src={iconImage} alt={`icon of ${iconName}`}/>
                        <span className=".iconName">
                            { iconName }
                        </span>
                        
                        <div className="flex gap-1 ml-auto">
                            <button 
                                className="bg-[#c0c0c0] px-2 text-sm shadow-[1px_1px_1px_#000,-1px_-1px_1px_#fff] active:shadow-[inset_1px_1px_0px_#7d7d7d,inset_-1px_-1px_0px_#ffffff] font-bold text-black"
                                onClick={restore}>
                                _
                            </button>
                            <button 
                                className="bg-[#c0c0c0] px-1 text-sm shadow-[1px_1px_1px_#000,-1px_-1px_1px_#fff] active:shadow-[inset_1px_1px_0px_#7d7d7d,inset_-1px_-1px_0px_#ffffff] flex items-center"
                                onClick={windowStatus.isMaximized ? restore : maximize}>
                                <img className="w-4 h-4" src={windowStatus.isMaximized ? '/restore.png' : '/maximize.png'} alt="maximize icon"/>
                            </button>
                            <button 
                                className="bg-[#c0c0c0] px-2 text-sm shadow-[1px_1px_1px_#000,-1px_-1px_1px_#fff] active:shadow-[inset_1px_1px_0px_#7d7d7d,inset_-1px_-1px_0px_#ffffff] font-bold text-black"
                                onClick={close}>
                                X
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-7 bg-[#c0c0c0] flex items-center gap-2 pl-1">
                            <span><span className="underline">F</span>ile</span>
                            <span><span className="underline">E</span>dit</span>
                            <span><span className="underline">V</span>iew</span>
                            <span><span className="underline">H</span>elp</span>
                    </div>
                    <div className="w-full shadow-[inset_1px_1px_0px_#7d7d7d,inset_-1px_-1px_0px_#ffffff] bg-white grow">
                     <p>asdf</p>
                    </div>
                    <div className="w-full h-7 bg-[#c0c0c0] flex">
                            <div className="flex-[2] flex items-center px-2 shadow-[inset_1px_1px_1px_#7d7d7d,inset_-1px_-1px_1px_#ffffff]">
                                <p>3 object(s)</p>
                            </div>
                            <div className="flex-[1] flex items-center px-2 shadow-[inset_1px_1px_1px_#7d7d7d,inset_-1px_-1px_1px_#ffffff]">
                                <p>267 bytes</p>
                            </div>
                    </div>
                </div>
            </Draggable>
        </>
    )
}
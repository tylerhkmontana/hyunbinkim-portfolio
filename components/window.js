import Draggable from "react-draggable"
import Markdown from "react-markdown"
import Icon from "./icon"
import { useTaskManager } from "..//context/taskManager"
import { useState } from "react"

export default function Window({ programInfo, windowInfo, pid }) {
    const { screenInfo, activeProgram, closeProgram, maximizeProgram, restoreProgram, minimizeProgram, switchToActive } = useTaskManager()
    const { iconName, iconImage, programType, asciiArt, content, children, url } = programInfo
    const { width, height, x, y, isMaximized, isMinimized } = windowInfo
    const [markdown, setMarkdown] = useState('')

    function close() {
        closeProgram(pid)
    }

    function draggableHandler(event, data) {
        // setWindowStatus(prev => ({...prev, x: data.x, y: data.y }))
    }

    async function fetchMd (url) {
        let markdown
        try {
            await fetch(url)
                .then(response => response.text())
                .then(result => {
                    setMarkdown(result)
                })
           
        } catch(err) {
            console.log(err)
           setMarkdown('Failed to fetch...')
        }
    }

    function renderMainWindow() {
        if (programType === 'cmd') {
            return <div className="w-full shadow-[inset_1px_1px_0px_#7d7d7d,inset_-1px_-1px_0px_#ffffff] bg-black text-white grow px-2 py-3 overflow-y-auto">
                {
                    asciiArt &&
                    <>
                    <pre className="leading-4">
                        { asciiArt }
                    </pre>
                    <br/>
                    </>
                }
                <pre>
                    {content}
                </pre>
               <br/>
                <p>
                    C:\Windows\Users\HyunbinKim <strong className="animate-blink">_</strong>
                </p>
            </div>

        }
        else if (programType === 'folder') {
            return <div className="w-full shadow-[inset_1px_1px_0px_#7d7d7d,inset_-1px_-1px_0px_#ffffff] bg-white grow px-2 py-3 flex flex-wrap gap-2 overflow-auto">
                {
                    children &&
                    children.map((child, i) => <Icon key={i} programInfo={child}/>)
                }
            </div>
        } else if (programType === 'txt') {
            return <div className="w-full shadow-[inset_1px_1px_0px_#7d7d7d,inset_-1px_-1px_0px_#ffffff] bg-white grow px-2 py-3 overflow-auto">
             <pre>
                { content }
             </pre>
            </div>
        } else if (programType === 'md') {
            fetchMd(url)
            return <div className="w-full shadow-[inset_1px_1px_0px_#7d7d7d,inset_-1px_-1px_0px_#ffffff] bg-white grow px-2 py-3 overflow-auto">
                <Markdown className="whitespace-pre-wrap">
                    { markdown }
                </Markdown>
            </div>
        } 
    }

    return (
        <Draggable handle="#windowTop" onStop={draggableHandler} onStart={() => switchToActive(pid)}>
        {/* Window Top */}
        <div 
            id={pid}
            className="p-[2px] bg-[#c0c0c0] fixed flex flex-col shadow-[1px_1px_1px_#000,-1px_-1px_1px_#fff]" 
            style={{ 
                display: isMinimized ? 'none' : 'flex',
                resize: 'both', 
                overflow: 'auto', 
                width: isMaximized ? screenInfo.width : width, 
                height: isMaximized ? screenInfo.height -35 : height, 
                top: isMaximized ? 0 : y,
                left: isMaximized ? 0 : x,
                zIndex: activeProgram === pid ? 99 : 20 }}>
            <div 
                id="windowTop"
                className="w-full h-7 bg-[#909090] flex items-center justify-start px-1 py-2 gap-2"
                style={{ 
                    backgroundColor: activeProgram === pid ? '#000080' : '#909090', 
                    color: activeProgram === pid ? '#fff' : '#000'}}>
                <img className="w-5 h-5" src={iconImage} alt={`icon of ${iconName}`} style={{ pointerEvents: 'none'}}/>
                <span className=".iconName">
                    { iconName }
                </span>
                
                {/* Window Top buttons */}
                <div className="flex gap-1 ml-auto">
                    <button 
                        className="bg-[#c0c0c0] px-2 text-sm shadow-[1px_1px_1px_#000,-1px_-1px_1px_#fff] active:shadow-[inset_1px_1px_0px_#7d7d7d,inset_-1px_-1px_0px_#ffffff] font-bold text-black"
                        onClick={() => minimizeProgram(pid)}>
                        _
                    </button>
                    <button 
                        className="bg-[#c0c0c0] px-1 text-sm shadow-[1px_1px_1px_#000,-1px_-1px_1px_#fff] active:shadow-[inset_1px_1px_0px_#7d7d7d,inset_-1px_-1px_0px_#ffffff] flex items-center"
                        onClick={() => isMaximized ? restoreProgram(pid) : maximizeProgram(pid)}>
                        <img className="w-4 h-4" src={isMaximized ? '/restore.png' : '/maximize.png'} alt="maximize icon"/>
                    </button>
                    <button 
                        className="bg-[#c0c0c0] px-2 text-sm shadow-[1px_1px_1px_#000,-1px_-1px_1px_#fff] active:shadow-[inset_1px_1px_0px_#7d7d7d,inset_-1px_-1px_0px_#ffffff] font-bold text-black"
                        onClick={close}>
                        X
                    </button>
                </div>
            </div>

            {/* Widow Menus */}
            {
                programType !== 'cmd' &&
                    <div className="w-full h-7 bg-[#c0c0c0] flex items-center gap-2 pl-1">
                        <span><span className="underline">F</span>ile</span>
                        <span><span className="underline">E</span>dit</span>
                        <span><span className="underline">V</span>iew</span>
                        <span><span className="underline">H</span>elp</span>
                    </div>
            }
           

            {/* Window Main Section */}
            {
                renderMainWindow()
            }

            {/* Window property */}
            {
                programType === 'folder' &&
                <div className="w-full h-7 bg-[#c0c0c0] flex">
                        <div className="flex-[2] flex items-center px-2 shadow-[inset_1px_1px_1px_#7d7d7d,inset_-1px_-1px_1px_#ffffff]">
                            <p>3 object(s)</p>
                        </div>
                        <div className="flex-[1] flex items-center px-2 shadow-[inset_1px_1px_1px_#7d7d7d,inset_-1px_-1px_1px_#ffffff]">
                            <p>267 bytes</p>
                        </div>
                </div>
            }
        </div>
    </Draggable>
    )
}
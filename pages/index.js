import Icon from '@/components/icon'
import { useTaskManager } from '@/context/taskManager';

export default function Home() {
  const { tasks, activeProgram } = useTaskManager()

  return (
    <main>
      <div className='flex flex-col py-8 px-4 gap-2'>
        <Icon iconImage='/thispc.png' iconName='This PC' iconId={Math.random() * 100}/>
        <Icon iconImage='/folder.png' iconName='My Documents'/>
      </div>
    </main>
  );
}

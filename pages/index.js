import Icon from '@/components/icon'
import programs from '@/data/fileSystem.json'
import { v4 } from 'uuid';

export default function Home() {
  let icons = programs.map(p => ({...p, pid: v4()}))
  // let icons = [
  //   {
  //     pid: v4(),
  //     iconName: 'This PC',
  //     iconImage: '/icons/thispc.png'
  //   },
  //   {
  //     pid: v4(),
  //     iconName: 'My Documents',
  //     iconImage: '/icons/folder.png'
  //   }
  // ]


  return (
    <main>
      <div className='flex flex-col py-8 px-4 gap-2'>
        {
          icons.map((icon, i) =>  <Icon key={i} iconImage={icon.iconImage} iconName={icon.iconName} pid={icon.pid}/>)
        }
      </div>
    </main>
  );
}

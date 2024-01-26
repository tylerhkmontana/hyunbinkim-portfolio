import Icon from '@/components/icon'
import { v4 } from 'uuid';

export default function Home() {
  let icons = [
    {
      pid: v4(),
      iconName: 'This PC',
      iconImage: '/thispc.png'
    },
    {
      pid: v4(),
      iconName: 'My Documents',
      iconImage: '/folder.png'
    }
  ]


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

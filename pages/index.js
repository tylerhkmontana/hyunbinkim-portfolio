import Icon from '@/components/icon'
import programs from '@/data/fileSystem.json'

export default function Home() {
  return (
    <main>
      <div className='flex flex-col py-8 px-4 gap-2'>
        {
          programs.map((program, i) =>  <Icon key={i} programInfo={program}/>)
        }
      </div>
    </main>
  );
}

import {
    HomeIcon,
    ReloadIcon,
    PlayIcon,
    EraseIcon,
    DeleteIcon
} from '../Icons'
import { useControl } from '../context/ControlContext'
import { Link } from 'react-router-dom'

/**
 * 
 * @param {*} request - Lista de pictogramas que se reciben, quienes luego seran escritos y escuchados
 */
function Control() {
    const { pictograms, play, erase, remove } = useControl()

    return (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-white shadow-xl m-3">
            <div className="flex items-center gap-2 w-1/6 border border-solid border-gray-200 p-4">
                <Link to="/">
                    <HomeIcon className='rounded-lg bg-red-300 p-2 cursor-pointer' size={40} />
                </Link>
                <ReloadIcon className='rounded-lg bg-red-300 p-2 cursor-pointer' size={40} />
            </div>

            <div className='flex-1 flex items-center gap-2 bg-white p-4 border border-solid border-gray-200 overflow-x-auto'>
                {pictograms.map(pictogram => (
                    <span key={pictogram.id} className="text-lg">{pictogram.name}</span>
                ))}
            </div>

            <div className='flex items-center gap-2 w-1/6 border border-solid border-gray-200 p-4'>
                <PlayIcon onClick={play} className='rounded-lg bg-red-300 p-2 cursor-pointer' size={40} />
                <EraseIcon onClick={erase} className='rounded-lg bg-red-300 p-2 cursor-pointer' size={40} />
                <DeleteIcon onClick={remove} className='rounded-lg bg-red-300 p-2 cursor-pointer' size={40} />
            </div>
        </div>
    )
}

export default Control
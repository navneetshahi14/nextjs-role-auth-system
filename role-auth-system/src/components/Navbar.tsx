import { Button } from './ui/button'
import { redirect } from 'next/navigation'


const Navbar = () => {

    const handleLogOut = () =>{
        localStorage.clear()
        redirect('/login')
    }
  return (
    <div className='h-[5%] w-full bg-[#ffffffb4] flex justify-between items-center px-10 py-2'>
        <h2 className="uppercase font-bold">Role-auth-system</h2>
        <Button onClick={handleLogOut} className='cursor-pointer ' >Logout</Button>
    </div>
  )
}

export default Navbar
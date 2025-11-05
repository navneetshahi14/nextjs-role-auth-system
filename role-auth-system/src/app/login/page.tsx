'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'


const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleLogin =async () =>{
        const data = await fetch(`http://localhost:7000/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
        })
        
        const resData = await data.json()
        localStorage.setItem("role",resData.role)
        localStorage.setItem("token",resData.token)
        
        toast.success(resData.message)
        redirect('/')
    }



  return (
    <>
        <div className="h-screen w-full  bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% flex justify-center items-center">
            <div className="min-h-[40%] min-w-[60%] md:min-w-[40%] bg-[#ffffff99] shadow-2xl rounded-lg p-2 flex flex-col justify-between border-2 border-black">
                <div className="mb-10">
                    <h1 className="text-center uppercase font-semibold text-lg">Login</h1>
                </div>
                <div className="flex gap-3 flex-col justify-center items-center">
                    <div className="flex flex-col gap-1 w-[70%]">
                        <Label htmlFor='email' >Email</Label>
                        <Input onChange={(e)=>setEmail(e.target.value)} type='email ' placeholder='Enter your email' id='email' />
                    </div>
                    <div className="flex flex-col gap-1 w-[70%] ">
                        <Label htmlFor='password' >Password</Label>
                        <Input onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Enter your password' id='password' />
                    </div>
                    <div className="flex justify-center mt-5 w-[70%]">
                        <Button className='w-[80%]' onClick={handleLogin}>Submit</Button>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-center">
                        Don't have account <span className='text-sky-500 cursor-pointer uppercase ' onClick={()=>redirect('/register')}>Register</span>
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
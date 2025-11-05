'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { redirect } from 'next/navigation'
import { useState } from 'react'

const Register = () => {

    const [name,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [role,setRole] = useState("client")

    const handleRegister = async() =>{
        console.log(role,name,email,password)
        const data = await fetch(`https://nextjs-role-auth-system.onrender.com/auth/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name,email,password,role})
        })
        
        localStorage.setItem("role",resData.role)
        localStorage.setItem("token",resData.token)
        
        toast.success(resData.message)
        redirect('/')
    }

  return (
    <>
        <div className="h-screen w-full  bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% flex justify-center items-center">
            <div className="min-h-[40%] max-h-[70%] min-w-[60%] md:min-w-[40%] bg-[#ffffff99] border-2 border-black shadow-2xl rounded-lg p-2 flex flex-col justify-between">
                <div className="mb-10">
                    <h1 className="text-center uppercase font-semibold text-lg">Register</h1>
                </div>
                <div className="flex gap-3 flex-col justify-center items-center">
                    <div className="flex flex-col gap-1 w-[70%]">
                        <Label htmlFor='username' >Username</Label>
                        <Input onChange={(e)=>setUsername(e.target.value)} type='username' placeholder='Enter your Name' id='username' />
                    </div>
                    <div className="flex flex-col gap-1 w-[70%]">
                        <Label htmlFor='email' >Email</Label>
                        <Input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Enter your email' id='email' />
                    </div>
                    <div className="flex flex-col gap-1 w-[70%] ">
                        <Label htmlFor='password' >Password</Label>
                        <Input onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Enter your password' id='password' />
                    </div>
                    <div className="flex flex-col gap-1 w-[70%]">
                        <Label htmlFor='role'>
                            Role
                        </Label>
                        <Select value={role} onValueChange={(e) => setRole(e)} >
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='client' >Client</SelectItem>
                                    <SelectItem value='Hr' >HR</SelectItem>
                                    <SelectItem value='admin' >Admin</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-center mt-5 w-[70%]">
                        <Button onClick={handleRegister} className='w-[80%]' >Submit</Button>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-center">
                        Already have account <span className='text-sky-500 cursor-pointer uppercase ' onClick={()=>redirect('/login')}>Login</span>
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register

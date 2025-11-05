"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export type data = {
  _id: string;
  name: string;
  email: string;
  role: string;
  contacted: [];
};

export default function Home() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [allData, setAllData] = useState<data[]>([]);

  // Load token and role once
  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    const storedRole = localStorage.getItem("role") || "";
    if (storedToken === "") {
      redirect("/login");
    }
    setToken(storedToken);
    setRole(storedRole);
  }, []);

  // Fetch data when token and role are set
  useEffect(() => {
    const fetchData = async () => {
      if (!token || !role) return;

      try {
        let endpoint = "";
        if (role === "admin") endpoint = "all-users";
        else if (role === "Hr") endpoint = "my-clients";
        else if (role === "client") endpoint = "hrs";

        const response = await fetch(`http://localhost:7000/role/${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        const resdata = await response.json();
        console.log(resdata);
        setAllData(resdata);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [token, role]);

  const table = [
    { id: 1, name: "name" },
    { id: 2, name: "email" },
    { id: 3, name: "role" },
    { id: 4, name: "contacted" },
  ];

  const handleContact = async(hrId:string) =>{
    const data = await fetch(`http://localhost:7000/role/contact`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authorization":`Bearer ${token}`
      },
      body:JSON.stringify({hrId})
    })

    console.log(data)
    console.log("Hello world")

    if(data){
      alert("Contacted")
    }
  }

  return (
    <>
      <div className="min-h-screen w-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% flex flex-col items-center">
        <Navbar />
        {(role === "admin" || role === "hr") && (
          <div className="w-full min-h-[90%] px-10">
            <Table>
              <TableHeader>
                <TableRow>
                  {table.map((data) => (
                    <TableHead key={data.id}>
                      <h1 className="uppercase">{data.name}</h1>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {allData.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.contacted.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {role === "client" && (
          <div className="w-full min-h-[90%] px-10">
            <Table>
              <TableHeader>
                <TableRow>
                  {table.map((data) => (
                    <TableHead key={data.id}>
                      <h1 className="uppercase">{data.name}</h1>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {allData.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    {/* <TableCell>{user.contacted.length}</TableCell> */}
                    <TableCell>
                      <Button className="cursor-pointer" onClick={()=>handleContact(user._id)}>Contact</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
}

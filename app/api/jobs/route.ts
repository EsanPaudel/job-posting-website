import { auth } from "@/auth"
import { NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"

export async function POST(req:Request){
 const session = await auth()
 if(!session?.user || !session.user.id){
    return NextResponse.redirect(new URL("/auth/signin",req.url))
 }
 try {
    const data = await req.json()
    const job =  await prisma.job.create({
        data:{
            ...data,
            postedById:session.user.id
        }
    })
    return NextResponse.json(job)

 } catch (error) {
    console.error("Error Creating Job:",error)
    return new NextResponse("Internal Server Error",{status:500})
 }
}

export async function GET(req:Request){
 try {
   const jobs= await prisma.job.findMany({orderBy:{
      postedAt:"desc"
   }})
   return NextResponse.json(jobs)

 } catch (error) {
    console.error("Error Fetching Job:",error)
    return new NextResponse("Internal Server Error",{status:500})
 }
}
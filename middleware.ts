import { NextResponse } from "next/server";

export function middleware(){
    return new NextResponse("Hello World");
}
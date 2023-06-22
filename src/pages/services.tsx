import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import { link } from 'fs';
import Head from 'next/head';
import Navbar from '~/components/Navbar';
import {  useAuth, useUser } from '@clerk/nextjs';

const services = () => {
    const data = [
        {
            img: "/P2.jpg",
            name: "Hamza Louihrani",
            title: "Web Devlopper",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit voluptates optio libero ut voluptas ullam."
        },
        {
            img: "/P2.jpg",
            name: "Hamza Louihrani",
            title: "Web Devlopper",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit voluptates optio libero ut voluptas ullam, repellat consectetur labore corporis voluptatum id nulla ipsum neque facilis, ipsa quas doloremque aspernatur corrupti."
        },
        {
            img: "/P2.jpg",
            name: "Hamza Louihrani",
            title: "Web Devlopper",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit voluptates optio libero ut voluptas ullam, repellat consectetur labore corporis voluptatum id nulla ipsum neque facilis, ipsa quas doloremque aspernatur corrupti."
        },
        {
            img: "/P2.jpg",
            name: "Hamza Louihrani",
            title: "Web Devlopper",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit voluptates optio libero ut voluptas ullam, repellat consectetur labore corporis voluptatum id nulla ipsum neque facilis, ipsa quas doloremque aspernatur corrupti."
        },
        {
            img: "/P2.jpg",
            name: "Hamza Louihrani",
            title: "Web Devlopper",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit voluptates optio libero ut voluptas ullam, repellat consectetur labore corporis voluptatum id nulla ipsum neque facilis, ipsa quas doloremque aspernatur corrupti."
        },
    ]
    const { isLoaded, isSignedIn, user } = useUser();
    console.log("user", user)
  return (
    <div>
            <title>Task.io</title>
        <Navbar />

        <div className="Post">
        <div className="service"> 
        {<Image className="service-img" src={"/S-2.jpg"} alt="cover" width={2000} height={500} /> }
            <div className="service-text">
              <h1>Services</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, ipsum laborum temporibus facere <br />consequatur fuga a aut aperiam dicta labore laudantium cupiditate dolorum ea explicabo delectus impedit ab aliquid odit.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, ipsum laborum temporibus facere consequatur fuga a aut aperiam dicta labore laudantium cupiditate dolorum ea explicabo delectus impedit ab aliquid odit.</p>
              
            </div>
         </div>
        <div className="postsTitle">
           
            <h1>Available Services</h1>
            <button className='createbtn'>Create Service</button>
            
        </div>
        
            <div className='cardsGrid' >
                
{
    data.map((item, i) => {
        return  <div key={i} className="card">
        <div className="image-content">
            <span className='overlay'></span>

            <div className="card-image">
                <Image src={item.img} alt="" width={150} height={150} className='card-img'/>
            </div>
        </div>
        <div className="card-content">
            <h2 className='name'>{item.name}</h2>
            <h3 className='title'>{item.title}</h3>
            <p className="description">{item.description}</p>

            <button className="getincontactbtn">GET IN CONTACT</button>
         </div>

    </div>
    })
}
                       

            </div>

        </div>
           
        
    </div>
              
  )
}

export default services
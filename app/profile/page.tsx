"use client"

import { useSession } from "next-auth/react";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "@components/Profile";

const Profile = ()=> {
  const {data : session} = useSession();
  const [posts,setPost] = useState([]);
  const router = useRouter();

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPost(data)

    }

    if(session?.user.id)fetchPosts();
  },[])

  const handleEdit = (post : any)=>{
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post : any)=>{
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method : "DELETE"
        
        } )
        const filteredPost = posts.filter((p : any) => p._id !== post._id)
        setPost(filteredPost)
      } catch (error) {
        console.log(error)
      }
    }
  }
 
  return(
    <ProfileCard 
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete} 
    />
  )
}

export default Profile;
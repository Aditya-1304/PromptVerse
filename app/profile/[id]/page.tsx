"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import ProfileCard from "@components/Profile"

interface UserProfileProps {
  params: {
    id: string;
  };
}

interface Post {
  // Define the structure of a post here
  _id: string;
  title: string;
  content: string;
  // Add other fields as necessary
}

const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <ProfileCard 
      name={userName || ''}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s Exceptional Prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
}

export default UserProfile;
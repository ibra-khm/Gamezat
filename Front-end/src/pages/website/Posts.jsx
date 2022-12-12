import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chat from '../../components/website/posts/Chat'
import CreatePost from '../../components/website/posts/CreatePost'
import Post from '../../components/website/posts/Post'



function AdUnit({ adCode }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: adCode }} />
  );
}

export default function Posts() {
  const [posts, setPosts] = useState([]);


  //fetch all posts from database
  useEffect(() => {
    axios.get("/api/posts").then((response) => {
      setPosts(response.data.data);
      console.log(response.data.data);
    });
  }, []);
  return (
    <>


        <div className="mt-0 grid lg:max-w-screen lg:grid-cols-7 sm:max-w-screen sm:grid-cols-1 md:grid-cols-1 bg-fixed  " style={{backgroundImage: "url('https://mg.co.za/wp-content/uploads/2022/01/2dfd1c78-pexels-lucie-liz-3165335.jpg)", objectFit:'cover'}}>

          <div className=' dark:bg-black bg-gray-300 lg:px-40  pt-[7rem] dark:bg-opacity-80 sm:max-w-10 lg:col-start-3 lg:col-span-3 sm:col-start-1 sm:col-span-1 md:col-start-1 md:col-span-1 md:mx-auto sm:mx-auto'>
            <CreatePost setPosts={setPosts} />
            <Post posts={posts.reverse()} setPosts={setPosts} />
            <vr />
          </div>
          <div className='lg:col-start-6 lg:mt-[6rem] lg:col-span-2 '>

            {/* <Chat /> */}
            {/* <AdUnit adCode={adsenseCode} /> */}
          </div>


        </div>
    

    </>

  )
}

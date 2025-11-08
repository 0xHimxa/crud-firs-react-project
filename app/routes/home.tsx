import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PiBoxingGloveBold } from "react-icons/pi";
import { PiBoxingGloveFill } from "react-icons/pi";
import type { Route } from "./+types/home";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "~/config/firebase";
import { useFetcher, useLoaderData } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";


interface Post {
  id: string;
  posterName: string;
  poster_userId: string;
  post: string;
  postId: string;
  poster_img: string;
  totalLikes: PostLike[]
}

interface PostLike {
  id: string;
  userId: string;
  postId: string;
}

export async function loader({ request }: Route.LoaderArgs) {
 
 

 
 
 
  let post:any = [];
  const spec_collection = collection(db, "posts");

  try {
    const pre_posts = await getDocs(spec_collection);
    const post_filter = pre_posts.docs.map(async (doc) => {

      let combined: PostLike[] = [];
      const postInfo = doc.data();
      const like_collection = collection(db, "likes");
      const getLike = query(
        like_collection,
        where("postId", "==", postInfo.postId)
      );

      try {
        const postLikes = await getDocs(getLike);
        const filter = postLikes.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as PostLike
        );
        combined = filter;
      } catch (e) {
        console.log((e as Error).message, "faild to get specific post likes");
      }
      

      return { id: doc.id ,...doc.data(), totalLikes: combined };
    });
    const joinContent =  await Promise.all(post_filter)
    post = joinContent
  } catch (e) {
    console.log((e as Error).message, "failed to get post");
  }
console.log(post)
  return { post};
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const userId = form.get("userId");
  const postId = form.get("postId");
  const removeLike = form.get('removelike')



  const like_col = collection(db, "likes");





console.log(postId,'post',userId,'user','action')
  try {
    await addDoc(like_col, {
      userId,
      postId,
    });
  } catch (e) {
    console.log((e as Error).message, "failed to add like");
  }


  return null
}

export default function Home() {
  const { post } = useLoaderData();
  const [like, setLiked] = useState(false);
  const fetcher = useFetcher();
  const [user] = useAuthState(auth);

const caalAction = (event: React.FormEvent<HTMLFormElement>)=>{
event.preventDefault()
  

const form = new FormData(event.target as HTMLFormElement)

 fetcher.submit(form,{
  method: 'post'
 })
}


  return (
    <div style={{ paddingLeft: "20px" }}>
      {post.map((doc: Post) => {
      const hasUserLiked = doc.totalLikes.some((users)=> users.userId == user?.uid)     
     const postUserLike = doc.totalLikes.find((userLike)=> userLike.userId === user?.uid)
        return (
          <>
            <div className="post-box" key={doc.id}>
              <div className="user-header">
                <img src={doc.poster_img} className="user-img" width={50} />

                <p className="user-name1">{doc.posterName}</p>
                <p className="user-name2">@{doc.posterName}</p>
              </div>

              <div className="post-text">{doc.post}</div>

              <div className="like-action">
                <fetcher.Form method="post" onSubmit={caalAction}>

                  <input type="hidden" name="userId" value={user?.uid}/>
                 
                  <input type="hidden" name="postId" value={doc.postId}/>
                 <input type="hidden"  name='removelike' value={hasUserLiked? postUserLike?.id: ''}/>
               
                  <button
                   type="submit"
                  >
                    {hasUserLiked ? (
                      <PiBoxingGloveFill className="like-icon" />
                    ) : (
                      <PiBoxingGloveBold className="like-icon" />
                    )}
                  </button>
                </fetcher.Form>

                <span>{doc.totalLikes.length}</span>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { redirect, useFetcher } from "react-router";
import { auth, db } from "~/config/firebase";
import type { Route } from "./+types/create-post";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4, v4 } from "uuid";

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const username = form.get("username");
  const userId = form.get("userId");
  const userImg = form.get("userImg");
  const spec_collection = collection(db, "posts");
  const post = form.get("posts");

  try {
    await addDoc(spec_collection, {
      postId: v4(),
      post,
      posterName: username,
      poster_userId: userId,
      poster_img: userImg,
    });


    return redirect('/')
  } catch (e) {
    console.log((e as Error).message, "failde to send post to Db");
  }
}

function CreatPost() {
  const [user] = useAuthState(auth);

  const fecter = useFetcher();

  const sendPost = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);
    const post = form.get("posts");

    if (post == "") return;

    if (user) {
      if (user.uid && user.displayName && user.photoURL) {
        const userId = user.uid;
        const profile_pic = user.photoURL;
        const displayName = user.displayName;

        form.append("userId", userId.toString());
        form.append("userImg", profile_pic.toString());
        form.append("username", displayName);

        fecter.submit(form, {
          method: "post",
        });
      }
    }
  };
  console.log(user?.photoURL)

  return (
    <div className="create-box">
      <div>
        <div className="post-headers">
          <div className="img-user-name">
            <img src={user?.photoURL || ''} alt=""  className="c-img"/>
          
          </div>

          <div className="save-btn">
            <button>Save</button>
          </div>
        </div>

        <fecter.Form className="form-input" onSubmit={sendPost}>
          <textarea name="posts" id="" rows={10} cols={60}></textarea>

          <button type="submit" disabled={fecter.state !== 'idle' ? true: false}>{fecter.state !== 'idle'?'....' :'Post'} </button>
        </fecter.Form>
      </div>
    </div>
  );
}

export default CreatPost;

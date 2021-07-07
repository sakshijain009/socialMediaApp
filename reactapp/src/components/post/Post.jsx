import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useState } from "react";

export default function Post({post}) {
    const [like,setLike] = useState(post.like);
    const [isLiked,setIsLiked] = useState(false);

    const likeHandler = ()=>{
        setLike(isLiked?like-1:like+1)
        setIsLiked(!isLiked)
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={Users.filter((u) => u.id === post?.userId)[0].profilePicture} className="postProfileImg" />
                        <span className="postUsername">
                            {Users.filter((u) => u.id === post?.userId)[0].username}
                        </span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={post.photo} className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src="/assets/like.png" className="likeIcon" onClick={likeHandler} />
                        <img src="/assets/love.png" className="likeIcon" onClick={likeHandler} />
                        <span className="postLikeCounter">{like} people liked this</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
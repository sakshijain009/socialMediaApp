import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({profile}){
    const HomeRightbar = () => {
        return (
          <>
           <div className="birthdayContainer">
                <img src="/assets/birthday.png" className="birthdayImg" />
                <span className="birthdayText"><b>Ishita Sharma</b> and <b>3 others</b> have birthday today</span>
            </div>
            <img src="/assets/ad.jpg" className="rightbarAd" />
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
                {Users.map((u) => (
                    <Online key={u.id} user={u} />
                ))}
            </ul>
          </>
        );
      };

      const ProfileRightbar = () => {
          return (
              <>
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">Jodhpur</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">Bikaner</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">Single</span>
                    </div>
                </div>

                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    <div className="rightbarFollowing">
                        <img className="rightbarFollowingImg" src="assets/nature.jpg" />
                        <span className="rightbarFollowingName">Ashi Gupta</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img className="rightbarFollowingImg" src="assets/nature.jpg" />
                        <span className="rightbarFollowingName">Ashi Gupta</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img className="rightbarFollowingImg" src="assets/nature.jpg" />
                        <span className="rightbarFollowingName">Ashi Gupta</span>
                    </div>
                </div>
              </>
          )
      }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}
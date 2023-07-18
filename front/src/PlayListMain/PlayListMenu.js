import React from 'react';
import {Link} from "react-router-dom";
import RangkingIcon from "../MainIMG/RankingIcon.png";
import SearchIcon from "../MainIMG/SearchIcon.png";
import MypliIcon from "../MainIMG/MyPliIcon.png";
import AddPliIcon from "../MainIMG/AddPliIcon.png";

function PlayListMenu(props) {
    return (
        <div className="playlistbuttonlist">
            <div className="playlistbuttonset1">
                <Link to="../rankingpage" className="playlistbutton">
                    <img
                        className="playlistbuttonicon"
                        alt=""
                        src={RangkingIcon}
                    />
                    <div className="playlistbuttontext">랭킹</div>
                </Link>
                <Link to="../playlistsearch" className="playlistbutton">
                    <img
                        className="playlistbuttonicon"
                        alt=""
                        src={SearchIcon}
                    />
                    <div className="playlistbuttontext">검색</div>
                </Link>
            </div>
            <div className="playlistbuttonset1">
                <Link to="../playlistmypli" className="playlistbutton">
                    <img className="playlistbuttonicon" alt="" src={MypliIcon} />
                    <div className="playlistbuttontext">내 플리</div>
                </Link>
                <Link to="" className="playlistbutton">
                    <img
                        className="playlistbuttonicon"
                        alt=""
                        src={AddPliIcon}
                    />
                    <div className="playlistbuttontext">플리 만들기</div>
                </Link>
            </div>
        </div>
    );
}

export default PlayListMenu;
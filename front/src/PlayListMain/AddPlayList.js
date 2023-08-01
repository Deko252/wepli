import {useCallback, useEffect, useRef, useState} from "react";
import Axios from "axios";
import PlayListDetailClose from "../MainIMG/PlayListDetailClose.png";
import PlayListSave from "../MainIMG/playListSave.png";
import PlusIcon from "../MainIMG/plusIcon.png";
import "./AddPlayList.css";
import {useNavigate} from "react-router-dom";
import weplilogo from "../sidebar/photo/weplilogo.png";

const AddPlayLsit = () => {
    const bucketURl = process.env.REACT_APP_BUCKET_URL;
    const [nickname, setNickname] = useState("");
    const [userImg, setUserImg] = useState("");
    const [pliTitle, setPliTitle] = useState("");
    const [pliDesc, setPliDesc] = useState("");
    const [pliImg, setPliImg] = useState(bucketURl + "/playlist/88e584de-fb85-46ce-bc1a-8b2772babe42");
    const PliImgRef = useRef();
    const [uploadPliImgName , setUploadPliImgName] = useState("/playlist/88e584de-fb85-46ce-bc1a-8b2772babe42");
    const [genre01, setGenre01] = useState("");
    const [genre02, setGenre02] = useState("");
    const [genre03, setGenre03] = useState("");
    const [genre04, setGenre04] = useState("");
    const [genres , setGenres] = useState("");
    const [tag01, setTag01] = useState("");
    const [tag02, setTag02] = useState("");
    const [tag03, setTag03] = useState("");
    const [tag04, setTag04] = useState("");
    const [tags , setTags] = useState("");
    const navigate = useNavigate();

    const closBacknavigate = useNavigate();

    const onIconsClick = useCallback(() => {
        // Please sync "PlayListMain03MyPlayListMain" to the project
    }, []);

    const onPlayListaddCloseIconClick = useCallback(() => {
        // Please sync "PlayListMain03MyPlayListMain" to the project
    }, []);


    const pliTitleOnChange = useCallback(e => {
        setPliTitle(e.target.value);
    });
    const pliDescOnChange = useCallback(e => {
        setPliDesc(e.target.value);
    });
    const genre01OnChange = useCallback(e => {
        setGenre01(e.target.value);
    });
    const genre02OnChange = useCallback(e => {
        setGenre02(e.target.value);
    });
    const genre03OnChange = useCallback(e => {
        setGenre03(e.target.value);
    });
    const genre04OnChange = useCallback(e => {
        setGenre04(e.target.value);
    });
    const tag01OnChange = useCallback(e => {
        setTag01(e.target.value);
    });
    const tag02OnChange = useCallback(e => {
        setTag02(e.target.value);
    });
    const tag03OnChange = useCallback(e => {
        setTag03(e.target.value);
    });
    const tag04OnChange = useCallback(e => {
        setTag04(e.target.value);
    });

    const closBack = () => {
        closBacknavigate(-1);
    };

    useEffect(() => {
        setGenres((genre01 === null? genre01 : genre01 + ",") + (genre02 === null? genre02 : genre02 + ",") + (genre03 === null? genre03 : genre03 + ",") + genre04)
    },[genre01, genre02, genre03, genre04]);
    useEffect(() => {
        setTags((tag01 === null? tag01 : tag01 + ",") + (tag02 === null? tag02 : tag02 + ",") + (tag03 === null? tag03 : tag03 + ",") + tag04)
    },[tag01, tag02, tag03, tag04]);

    useEffect(() => {
        let nickname = window.localStorage.getItem("data");
        if (nickname == null) {
            nickname = window.sessionStorage.getItem("data");
        }
        if(nickname == null) {
            alert("로그인 후 이용가능한 기능입니다");
            closBacknavigate(-1);
        } else {
            setNickname(JSON.parse(nickname).nick);
            setUserImg(JSON.parse(nickname).img);

        }
    }, []);

    const savePliImg = (e) => {
        const uploadPliImg = new FormData();
        uploadPliImg.append('directoryPath', "playlist");
        uploadPliImg.append('upload', e.target.files[0]);
        Axios({
            method:"post",
            url: "/api/lv1/os/imgupload",
            data: uploadPliImg,
            headers: {"Content-Type" : "multipart/form-data"}
        }).then(res => {
            setUploadPliImgName(res.data);
        }).catch(error => {
            console.log(error);
        })
        setUploadPliImgName(uploadPliImg);
        const PliImgfile = PliImgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(PliImgfile);
        reader.onloadend = () => {
            setPliImg(reader.result);
        };
    };

    const addPliData = {
        title: pliTitle,
        desc: pliDesc,
        genre: genres,
        tag: tags,
        img: uploadPliImgName,
        isPublic: 0,
        nick: nickname
    }


    const addPli = () => {
        if(pliTitle === "" ) {
            alert("제목을 입력해주세요.");
            return;
        }
        const addPliUrl = "/api/lv1/p/list";
        Axios.post(addPliUrl, addPliData)
            .then(res =>
                navigate("/mypli")
            )
            .catch((error) => {
                    alert("실패애러" + error)

                }
            )
    };

    return (
        <div className="playlistaddframe">
            <div className="playlistadd">
                <div className="playlistaddtop">
                    <label className="playlistaddchangimginputbody">
                        <input type="file" className="playlistaddchangimginput" onChange={savePliImg} ref={PliImgRef}/>
                        <img className="playlistaddcover-plus" src={PlusIcon}/>
                        <img
                            className="playlistaddcover-icon"
                            alt=""
                            src={pliImg}
                        />
                    </label>
                    <div className="playlistaddinplaylistinfos">
                        <input className="playlistaddinplaylisttitle" value={pliTitle} onChange={pliTitleOnChange}
                               placeholder="제목을 입력해 주세요" maxLength={10}/>

                        <div className="playlistaddinplaylistuserin">
                            <img
                                className="playlistaddprofileimage-icon"
                                alt=""
                                src={userImg != null ? `${bucketURl}/profile/${userImg}` : weplilogo}
                            />
                            <div className="playlistaddinplaylistnickna">
                                {nickname}
                            </div>
                        </div>
                        <textarea className="playlistaddinplaylistinfo" placeholder="소개글을 적어주세요 (이미지는 클릭시 변경하실 수 있습니다.)"
                                  onChange={pliDescOnChange} maxLength="50">
                        </textarea>
                        <div className="playlistaddinplaylistinfobu">
                            <div className="playlistaddbuttonbody" onClick={addPli}>
                                <img
                                    className="playlistaddplaybutton-icon"
                                    alt=""
                                    src={PlayListSave}
                                />
                                저장
                            </div>
                        </div>
                    </div>
                </div>
                <div className="playlistaddtagframe">
                    <div className="playlistaddtaggroup1">
                        <div className="playlistaddtagheader">
                            <div className="tagtitle">장르 (10글자 까지 입력 가능합니다)</div>
                            <div className="commettilteiconbody">#</div>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={genre01} maxLength="10"
                                   onChange={genre01OnChange} placeholder="장르를 적어주세요"/>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={genre02} maxLength="10"
                                   onChange={genre02OnChange} placeholder="장르를 적어주세요"/>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={genre03} maxLength="10"
                                   onChange={genre03OnChange} placeholder="장르를 적어주세요"/>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={genre04} maxLength="10"
                                   onChange={genre04OnChange} placeholder="장르를 적어주세요"/>
                        </div>

                    </div>
                    <div className="playlistaddtaggroup1">
                        <div className="playlistaddtagheader">
                            <div className="tagtitle">태그 (10글자 까지 입력 가능합니다)</div>
                            <div className="commettilteiconbody">#</div>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={tag01} maxLength="10" onChange={tag01OnChange}
                                   placeholder="태그를 적어주세요"/>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={tag02} maxLength="10" onChange={tag02OnChange}
                                   placeholder="태그를 적어주세요"/>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={tag03} maxLength="10" onChange={tag03OnChange}
                                   placeholder="태그를 적어주세요"/>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={tag04} maxLength="10" onChange={tag04OnChange}
                                   placeholder="태그를 적어주세요"/>
                        </div>
                    </div>
                </div>
                <img
                    className="playlistaddclose-icon"
                    alt=""
                    src={PlayListDetailClose}
                    onClick={closBack}
                />
            </div>
        </div>
    );
};

export default AddPlayLsit;

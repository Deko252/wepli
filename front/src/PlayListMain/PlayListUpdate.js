import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import PlusIcon from "../MainIMG/plusIcon.png";
import PlayListSave from "../MainIMG/playListSave.png";
import PlayListDetailClose from "../MainIMG/PlayListDetailClose.png";
import "./PlayListUpdate.css";

function PlayListUpdate(props) {
    const idx = useParams().pliId;
    const bucketURl = process.env.REACT_APP_BUCKET_URL;
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
    const [updateNick, setUpdateNick] = useState("");
    const [updatePlayUserImg, setUpdatePlayUserImg] = useState("");
    const navigate = useNavigate();
    const [isPublicCheckBox, setIsPublicCheckBox] = useState(false);


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

    const closBack = async ()  => {
       await Axios({
            method: "delete",
            url: "/api/lv1/os/imgdelete",
            directoryPath : "playlist"
        })
            .then(res => {
            })
            .catch(error => {
            })
        navigate("/pli/" + idx);
    };

    useEffect(() => {
        setGenres((genre01 === "" ? genre01 : genre02 === "" && genre03 === "" && genre04 === "" ?  genre01 : (genre01 + ",")) + (genre02 === "" ? genre02 : genre03 === "" && genre04 === "" ? genre02 : (genre02 + ",")) + (genre03 === ""  ? genre03 : genre04 === "" ? genre03 : (genre03 + ",")) +  (genre04));
    },[genre01, genre02, genre03, genre04]);
    useEffect(() => {
        setTags((tag01 === "" ? tag01 : tag02 === "" && tag03 === "" && tag04 === "" ?  tag01 : (tag01 + ",")) + (tag02 === "" ? tag02 : tag03 === "" && tag04 === "" ? tag02 : (tag02 + ",")) + (tag03 === ""  ? tag03 : tag04 === "" ? tag03 : (tag03 + ",")) +  (tag04));
    },[tag01, tag02, tag03, tag04]);

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

    const updatePliData = {
        idx: idx,
        title: pliTitle,
        desc: pliDesc,
        genre: genres,
        tag: tags,
        img: uploadPliImgName,
        isPublic: isPublicCheckBox? 0 : 1
    }


    const updatePli = () => {
        if(pliTitle === "" ) {
            alert("제목을 입력해주세요.");
            return;
        }
        const updatePliUrl = "/api/lv1/p/list";
        Axios.patch(updatePliUrl, updatePliData)
            .then(res =>
                navigate("/pli/" + idx)
            )
            .catch((error) => {
                    alert("실패애러" + error)

                }
            )
    };

    const [plaListDetailResult, setPlaListDetailResult] = useState([]);
    const [plaListDetailInfo, setPlaListDetailInfo] = useState([]);

    useEffect(() => {
        const plaListDetailUrl = "/api/lv0/p/playdetail";
        Axios.get(plaListDetailUrl, {params: {idx: idx, curr: 1, cpp: 6}})
            .then(res => {
                setPlaListDetailResult(res.data);
                setPlaListDetailInfo(res.data.play[0]);
                setPliTitle(res.data.play.title);
                setPliDesc(res.data.play.desc);
                setGenre01(res.data.play.genre.split(",")[0] === undefined ? "" : res.data.play.genre.split(",")[0]);
                setGenre02(res.data.play.genre.split(",")[1] === undefined ? "" : res.data.play.genre.split(",")[1]);
                setGenre03(res.data.play.genre.split(",")[2] === undefined ? "" : res.data.play.genre.split(",")[2]);
                setGenre04(res.data.play.genre.split(",")[3] === undefined ? "" : res.data.play.genre.split(",")[3]);
                setTag01(res.data.play.tag.split(",")[0] === undefined ? "" : res.data.play.tag.split(",")[0]);
                setTag02(res.data.play.tag.split(",")[1] === undefined ? "" : res.data.play.tag.split(",")[1]);
                setTag03(res.data.play.tag.split(",")[2] === undefined ? "" : res.data.play.tag.split(",")[2]);
                setTag04(res.data.play.tag.split(",")[3] === undefined ? "" : res.data.play.tag.split(",")[3]);
                setPliImg(bucketURl + res.data.play.img);
                setUploadPliImgName(res.data.play.img);
                setIsPublicCheckBox(res.data.play.isPublic === 0);
                setUpdateNick(res.data.play.nick);
                setUpdatePlayUserImg(res.data.playUserImg);
            })
            .catch(res => console.log(res));
    }, []);

    const isPublicCheckBoxChange = (e) => {
        setIsPublicCheckBox(e.target.checked);
    }
    const updateSessionNick = JSON.parse(sessionStorage.getItem("data")).nick;
    return (
        <div className="playlistaddframe">
        {
            updateSessionNick === updateNick ?
            <div className="playlistadd">
                <div className="playlistaddtop">
                    <label className="playlistaddchangimginputbody">
                        <input type="file" className="playlistaddchangimginput" onChange={savePliImg} ref={PliImgRef}/>
                        <img className="playlistaddcover-plus" src={PlusIcon}/>
                        <img
                            className="playlistaddcover-icon"
                            alt=""
                            src={bucketURl + uploadPliImgName}
                        />
                    </label>
                    <div className="playlistaddinplaylistinfos">
                        <input className="playlistaddinplaylisttitle" value={pliTitle} onChange={pliTitleOnChange}
                               placeholder="제목을 입력해 주세요" maxLength={10}/>

                        <div className="playlistaddinplaylistuserin">
                            <img
                                className="playlistaddprofileimage-icon"
                                alt=""
                                src={`${bucketURl}/profile/${updatePlayUserImg}`}
                            />
                            <div className="playlistaddinplaylistnickna">
                                {updateNick}
                            </div>
                        </div>
                        <textarea className="playlistaddinplaylistinfo" placeholder="소개글을 적어주세요 (이미지는 클릭시 변경하실 수 있습니다.)"
                                  onChange={pliDescOnChange} maxLength="50" value={pliDesc}>
                        </textarea>
                        <div className="playlistaddinplaylistinfobu">
                            <div className="playlistaddbuttonbody" onClick={updatePli}>
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
                <div className="isPublictoggleBody">
                    <span className="isPublictoggleText">공개</span>
                    <div className="isPublictoggle isPublictoggle-r" id="isPublictoggle-3">
                        <input type="checkbox" className="isPublicCheckbox" checked={isPublicCheckBox} onChange={isPublicCheckBoxChange}/>
                        <div className="knobs"></div>
                        <div className="layer"></div>
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
                                   onChange={genre01OnChange} placeholder="장르를 적어주세요" type="text"/>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={genre02} maxLength="10"
                                   onChange={genre02OnChange} placeholder="장르를 적어주세요" type="text"/>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={genre03} maxLength="10"
                                   onChange={genre03OnChange} placeholder="장르를 적어주세요" type="text"/>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={genre04} maxLength="10"
                                   onChange={genre04OnChange} placeholder="장르를 적어주세요" type="text"/>
                        </div>

                    </div>
                    <div className="playlistaddtaggroup1">
                        <div className="playlistaddtagheader">
                            <div className="tagtitle">태그 (10글자 까지 입력 가능합니다)</div>
                            <div className="commettilteiconbody">#</div>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={tag01} maxLength="10" onChange={tag01OnChange}
                                   placeholder="태그를 적어주세요" type="text"/>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={tag02} maxLength="10" onChange={tag02OnChange}
                                   placeholder="태그를 적어주세요" type="text"/>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={tag03} maxLength="10" onChange={tag03OnChange}
                                   placeholder="태그를 적어주세요" type="text"/>
                        </div>
                        <div className="playlistaddtagform">
                            <input className="txtplaylistaddform" value={tag04} maxLength="10" onChange={tag04OnChange}
                                   placeholder="태그를 적어주세요" type="text"/>
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
                :<h1 style={{ width: "100%", textAlign: "center", marginTop: "25%", position: "absolute" }}>페이지가 없습니다</h1>
        }
        </div>
    );
};

export default PlayListUpdate;
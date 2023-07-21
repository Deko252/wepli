import React from 'react';

const StageLeftSide = ({ data }) => {
    return (
        <div className="stage-left">
            <div className="stage-left-header">
                <div className="stage-left-button-group-a">
                    <div className={"stagebutton stage-button-stage" + (data.leftType ? ' stageactive' : '')}
                        onClick={() => data.setLeftType(true)}>
                        <div className="stage-button-stage-text">스테이지</div>
                    </div>

                    <div className={"stagebutton stage-button-queue" + (data.leftType ? '' : ' stageactive')}
                        onClick={() => data.setLeftType(false)}>
                        <div className="stage-button-queue-text">대기열</div>
                    </div>
                </div>

                <div className="stage-left-button-group-b">
                    <div className="stage-button-grab stagebutton">
                        <svg
                            className="stage-button-grab-icon"
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.1944 40.7143V25.6154M31.25 19.6843V19.4505C31.25 16.5566 29.1802 14.4331 27.0435 15.135L15.7588 18.842C14.2517 19.337 13.1944 21.1163 13.1944 23.1575V25.6154M31.25 19.6843V36.4286M31.25 19.6843L13.1944 25.6154M13.1944 37.8571H10.8796C8.32276 37.8571 6.25 39.9891 6.25 42.619C6.25 43.934 7.28638 45 8.56482 45C11.1217 45 13.1944 42.868 13.1944 40.2381V37.8571ZM31.25 33.5714H28.9352C26.3783 33.5714 24.3056 35.7034 24.3056 38.3333C24.3056 39.6483 25.3419 40.7143 26.6204 40.7143C29.1772 40.7143 31.25 38.5823 31.25 35.9524V33.5714Z"
                                stroke="black"
                                strokeWidth="2"
                            />
                            <path
                                d="M36.25 5V10M36.25 10V15M36.25 10H31.25M36.25 10H41.25"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div className="stage-button-up stagebutton">
                        <svg
                            className="stage-button-up-icon"
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M37.6341 31.3974L38.712 25.2778C38.9813 23.7493 37.7841 22.3513 36.2059 22.3513H28.2904C27.5058 22.3513 26.9084 21.6599 27.0354 20.899L28.0478 14.8321C28.2123 13.8465 28.1653 12.838 27.9099 11.8713C27.6983 11.0705 27.069 10.4274 26.2414 10.1664L26.0199 10.0965C25.5198 9.93877 24.9738 9.97548 24.5022 10.1986C23.9832 10.4442 23.6034 10.8921 23.4627 11.4248L22.7359 14.1756C22.5047 15.0508 22.1678 15.8957 21.7335 16.6939C21.099 17.8603 20.1179 18.7937 19.098 19.6565L16.8999 21.5162C16.2802 22.0406 15.9547 22.8258 16.0252 23.6266L17.266 37.7156C17.3799 39.0079 18.4803 40 19.8 40H26.902C32.2207 40 36.7598 36.3616 37.6341 31.3974Z"
                                stroke="black"
                                strokeWidth="2"
                            />
                            <path
                                d="M11.25 22.3513L12.7344 39.2061C12.772 39.633 12.4296 40 11.9936 40C11.5829 40 11.25 39.6728 11.25 39.2691V22.3513Z"
                                stroke="black"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>

                    <div className="stage-button-down stagebutton">
                        <svg
                            className="stage-button-down-icon"
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M37.6341 18.6026L38.712 24.7222C38.9813 26.2507 37.7841 27.6487 36.2059 27.6487H28.2904C27.5058 27.6487 26.9084 28.3401 27.0354 29.101L28.0478 35.1679C28.2123 36.1535 28.1653 37.162 27.9099 38.1287C27.6983 38.9295 27.069 39.5726 26.2414 39.8336L26.0199 39.9035C25.5198 40.0612 24.9738 40.0245 24.5022 39.8014C23.9832 39.5558 23.6034 39.1079 23.4627 38.5752L22.7359 35.8244C22.5047 34.9492 22.1678 34.1043 21.7335 33.3061C21.099 32.1397 20.1179 31.2063 19.098 30.3435L16.8999 28.4838C16.2802 27.9594 15.9547 27.1742 16.0252 26.3734L17.266 12.2844C17.3799 10.9921 18.4803 10 19.8 10H26.902C32.2207 10 36.7598 13.6384 37.6341 18.6026Z"
                                stroke="black"
                                strokeWidth="2"
                            />
                            <path
                                d="M11.25 27.6487L12.7344 10.7939C12.772 10.367 12.4296 10 11.9936 10C11.5829 10 11.25 10.3272 11.25 10.7309V27.6487Z"
                                stroke="black"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>

                    <div className="stage-button-skip stagebutton">
                        <div className="stage-button-skip-text">SKIP</div>
                    </div>
                </div>
            </div>

            <div className="stage-left-body">
                asdf
                {/* <YouTube
                            key={'YTP'}
                            videoId={youtube} /> */}
            </div>
        </div>
    );
};

export default StageLeftSide;
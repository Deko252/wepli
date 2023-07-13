package com.bit.dto;

import lombok.Data;

@Data
public class SongDto {
    private int idx;
    private int playlistID;
    private String title;
    private String img;
    private int songlength;
    private String genre;
    private String tag;
    private String singer;
    private String songaddress;
    private String songorigin;
}
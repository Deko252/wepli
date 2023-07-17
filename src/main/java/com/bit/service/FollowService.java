package com.bit.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bit.jwt.JwtTokenProvider;
import com.bit.mapper.BlacklistMapper;
import com.bit.mapper.FollowMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FollowService {
    @Autowired
    FollowMapper followMapper;

    @Autowired
    BlacklistMapper blacklistMapper;

    @Autowired
    JwtTokenProvider jwtTokenProvider;
    // 팔로우 목록 받아오기
    public List<Map<String, Object>> selectFollowList(String token) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        return followMapper.selectFollowlist(nick); 
    }
    
    // 팔로워 목록 받아오기
    public List<Map<String, Object>> selectFollowerlist(String token) {
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        return followMapper.selectFollowerlist(nick);
    }

    // 팔로우 추가
    public boolean insertFollowlist(String token, String target) {
        Map<String, String> data = new HashMap<>();
        String nick = jwtTokenProvider.getUsernameFromToken(token.substring(6));

        log.info("nick -> {}", nick);
        log.info("target -> {}", target);

        data.put("black", nick);
        data.put("target", target);

        if(blacklistMapper.isBlackchk(data) > 0) {
            blacklistMapper.deleteBlacklist(data);
        }
        data.remove("black");
        data.put("follow", nick);

        log.info("Map in nick -> {}", data.get("follow"));
        log.info("Map in target -> {}", data.get("target"));
        
        
        return followMapper.insertFollowlist(data) > 0;
    }

    // 팔로우 삭제
    public boolean unFollowlist(String token, String target) {
        Map<String, String> data = new HashMap<>();
        String follow = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        data.put("follow", follow);
        data.put("target", target);
        return followMapper.unFollowlist(data) > 0;
    }
    
    // 특정 유저가 나를 팔로우 했을시 팔로우 끊기(대상이 날 팔로우 한것을 끊음)
    public boolean deleteFollowlist(String token, String target) {
        Map<String, String> data = new HashMap<>();
        String follow = jwtTokenProvider.getUsernameFromToken(token.substring(6));
        data.put("follow", target);
        data.put("target", follow);
        return followMapper.unFollowlist(data) > 0;
    }
}
package com.spring.boot.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.boot.controller.BoardController;
import com.spring.boot.dto.MemberDTO;
import com.spring.boot.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService{
	private Logger logger = LoggerFactory.getLogger(BoardController.class);

	@Autowired
	private MemberMapper memberMapper;

	@Override
	public int regist(MemberDTO memberDto) throws Exception {
		return memberMapper.regist(memberDto);
	}

	@Override
	public int shopRegist(MemberDTO memberDto) throws Exception {
		return memberMapper.shopRegist(memberDto);
	}

	@Override
	public int login(MemberDTO memberDto) throws Exception {
		return memberMapper.login(memberDto);
	}

	@Override
	public int shopLogin(MemberDTO memberDto) throws Exception {
		return memberMapper.shopLogin(memberDto);
	}

	@Override
	public int logout() throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void delete() throws Exception {
		// TODO Auto-generated method stub
		
	}
	
	
}

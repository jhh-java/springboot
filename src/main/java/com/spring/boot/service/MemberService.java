package com.spring.boot.service;

import org.springframework.stereotype.Repository;

import com.spring.boot.dto.MemberDTO;

@Repository
public interface MemberService {

	public int regist(MemberDTO memberDto) throws Exception;
	public int login(MemberDTO member) throws Exception;
	public int logout() throws Exception;
	public void delete() throws Exception;
	public int shopRegist(MemberDTO memberDto) throws Exception;
	public int shopLogin(MemberDTO member) throws Exception;
}

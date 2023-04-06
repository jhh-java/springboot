package com.spring.boot.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.spring.boot.dto.MemberDTO;

@Mapper
public interface MemberMapper {
	public int regist(MemberDTO dto) throws Exception;
	public int login(MemberDTO memberDto) throws Exception;
	public int logout() throws Exception;
	public void delete() throws Exception;
	public int shopRegist(MemberDTO dto) throws Exception;
	public int shopLogin(MemberDTO memberDto) throws Exception;
}

package com.spring.boot.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.boot.dto.MemberDTO;
import com.spring.boot.service.MemberService;

import jakarta.annotation.Resource;

@RestController
public class MemberController {
	private Logger logger = LoggerFactory.getLogger(BoardController.class);

	@Resource
	private MemberService memberService;
	
	@Autowired
	MemberDTO memberDto;
	
	@RequestMapping("/regist")
	public int join(@RequestBody MemberDTO memberDto) throws Exception{
		int res = memberService.regist(memberDto);
		if(res == 1) {
			return 200;
		}else {
			return 400;
		}
	}
	
	@RequestMapping("/shop/regist")
	public int shopRegist(@RequestBody MemberDTO memberDto) throws Exception{
		int res = memberService.shopRegist(memberDto);
		if(res == 1) {
			return 200;
		}else {
			return 400;
		}
	}
	
	@RequestMapping("/login")
	public String login(@RequestBody MemberDTO member) throws Exception{
		int res;
		if(member.getShop() != null) {
			res = memberService.shopLogin(member);
		}else {
			res = memberService.login(member);
		}
		String msg;
		if(res == 1) {
			msg = "SUCCESS";
			return msg;
		}else {
			msg = "FAIL";
			return msg;
		}
	}
}

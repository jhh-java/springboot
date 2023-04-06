package com.spring.boot.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ShopController {
	private Logger logger = LoggerFactory.getLogger(BoardController.class);
	
	@GetMapping("/shopIndex")
	public String shopIndex() {
		return "/shop/index";
	}

	@GetMapping("/shop/login")
	public String login() {
		return "/shop/login";
	}
}

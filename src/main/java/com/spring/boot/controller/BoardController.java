package com.spring.boot.controller;

import java.io.File;
import java.net.URLDecoder;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.spring.boot.dto.BoardDTO;
import com.spring.boot.service.BoardService;
import com.spring.boot.util.MyUtil;

import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin
public class BoardController {
	private Logger logger = LoggerFactory.getLogger(BoardController.class);
	
	@Resource
	private BoardService boardService;
	
	@Autowired
	MyUtil myutil;
	@Autowired
	BoardDTO boardDto;
	
	@RequestMapping("/")
	public ModelAndView login() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		return mav;
	}

	@RequestMapping("/join")
	public ModelAndView join() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("regist");
		return mav;
	}
	
	@RequestMapping("/list")
	public ModelAndView list() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("list");
		return mav;
	}
	
	@RequestMapping("/cnt")
	public int index() throws Exception{
		int res = 0;
		try {
			res = boardService.cnt();
            log.info("BoardController.index");
		} catch (Exception e) {
            log.error("에러",e);
		}
		ModelAndView mav = new ModelAndView();
		mav.addObject("cnt", res);
//		mav.addObject("list", list);
//		mav.setViewName("index");
//		return mav;
		return res;
	};
	
	@RequestMapping("/getList")
	public List<BoardDTO> page(@RequestBody BoardDTO board) throws Exception {
		List<BoardDTO> list = boardService.getList(board);
		return list;
	}
	
	@RequestMapping("/create")
	public ModelAndView create() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("create");
		return mav;
	}
	
	@RequestMapping("/insert")
	public boolean insert(@RequestBody BoardDTO board) throws Exception {
		boolean res = boardService.save(board);
//		if(res != false) {
//			int currentId = boardService.currunt();
//			log.info(String.valueOf(currentId));
//			boardDto.setId(currentId);
//			boardDto.setId(board.getId());
//		}
		return res;
	}
	
	@PostMapping("/imageSave")
	private void imageSave(MultipartFile file) throws Exception{
		String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
		UUID uuid = UUID.randomUUID();
		String fileName = uuid + "_" + file.getOriginalFilename();
		String originFileName = file.getOriginalFilename();
		File saveFile = new File(projectPath, fileName);
		log.info("projectPath : " + projectPath);
		log.info("fileName : " + fileName);
		if(!file.isEmpty()) {
			file.transferTo(saveFile);
			int currentId = boardService.currunt();
			log.info(String.valueOf(currentId));
			boardDto.setId(currentId);
			boardDto.setFilename(fileName);
			boardDto.setFilepath(projectPath);
			boardDto.setOriginFileName(originFileName);
			boardService.updateFile(boardDto);
		}
	}
	
	@RequestMapping("/goDetail")
	public ModelAndView goDetail(int id) throws Exception {
		ModelAndView mav = new ModelAndView();
//		mav.addObject("id", board.getId());
		mav.setViewName("detail");
		return mav;
	}
	
	@RequestMapping("/detail")
	public List<BoardDTO> detail(@RequestBody BoardDTO boardDto)throws Exception{
		List<BoardDTO> list = boardService.detail(boardDto.getId());
//		ModelAndView mav = new ModelAndView();
//		mav.addObject("detail", list);
//		mav.setViewName("detail");
		return list;
	}
	
	
	@RequestMapping("/modify")
	public List<BoardDTO> modify(@RequestBody BoardDTO board) throws Exception{
		boolean res = boardService.update(board);
		
		List<BoardDTO> list = boardService.detail(boardDto.getId());
		return list;
	}
	
	@RequestMapping("/delete")
	public void delete(@RequestBody BoardDTO board) throws Exception {
		boardService.delete(board.getId());
	}

	@PostMapping("/deleteFile")
	public void deleteFile(@RequestBody BoardDTO board) throws Exception {
		String fileName = board.getFilename();
		File file = new File("C:\\workspace\\SpringBootBoard\\src\\main\\resources\\static\\files\\"+fileName);
		file.delete();
	}
}

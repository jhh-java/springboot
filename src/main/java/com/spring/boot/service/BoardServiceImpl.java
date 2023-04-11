package com.spring.boot.service;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.boot.controller.BoardController;
import com.spring.boot.dto.BoardDTO;
import com.spring.boot.mapper.BoardMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BoardServiceImpl implements BoardService{
	private Logger logger = LoggerFactory.getLogger(BoardController.class);
	
	@Autowired
	private BoardMapper boardMapper;

	@Override
	public int cnt() throws Exception {
		return boardMapper.cnt();
	}

	@Override
	public List<BoardDTO> getList() throws Exception {
		return boardMapper.getList();
	}

	@Override
	public boolean save(BoardDTO board) throws Exception {
//		String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
//		UUID uuid = UUID.randomUUID();
//		String fileName = uuid + "_" + file.getOriginalFilename();
//		File saveFile = new File(projectPath, fileName);
//		file.transferTo(saveFile);
		
		boolean res = boardMapper.save(board);
		if(res) {
			logger.info("insert success");
			return true;
		}else {
			return false;
		}
	}

	@Override
	public boolean update(BoardDTO board) throws Exception {
		int res = boardMapper.update(board);
		if(res == 1) {
			logger.info("update success");
			return true;
		}else {
			return false;
		}
	}
	
	@Override
	public void updateFile(BoardDTO board) throws Exception {
		boardMapper.updateFile(board);
	}
	
	@Override
	public int currunt() throws Exception {
		return boardMapper.currunt();
	}

	@Override
	public void delete(int id) throws Exception {
		boardMapper.delete(id);
	}

	@Override
	public List<BoardDTO> detail(int id) throws Exception {
		return boardMapper.detail(id);
	}

	
	
}

package com.spring.boot.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.boot.controller.BoardController;
import com.spring.boot.dto.BoardDTO;
import com.spring.boot.mapper.BoardMapper;

@Service
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
	public boolean save(BoardDTO dto) throws Exception {
		boolean res = boardMapper.save(dto);
		if(res) {
			logger.info("insert success");
			return true;
		}else {
			return false;
		}
	}

	@Override
	public boolean update(BoardDTO dto) throws Exception {
		int res = boardMapper.update(dto);
		if(res == 1) {
			logger.info("update success");
			return true;
		}else {
			return false;
		}
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

package com.spring.boot.service;

import java.util.List;

import com.spring.boot.dto.BoardDTO;

public interface BoardService {
	
	public int cnt() throws Exception;
	public List<BoardDTO> getList() throws Exception;
	public List<BoardDTO> detail(int id) throws Exception;
	public boolean save(BoardDTO board) throws Exception;
	public boolean update(BoardDTO board) throws Exception;
	public void delete(int id) throws Exception;
	public void updateFile(BoardDTO board) throws Exception;
	public int currunt() throws Exception;
}

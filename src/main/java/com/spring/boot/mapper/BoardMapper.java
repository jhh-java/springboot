package com.spring.boot.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.spring.boot.dto.BoardDTO;

@Mapper
public interface BoardMapper {
	
	public int cnt() throws Exception;
	public List<BoardDTO> getList(BoardDTO board) throws Exception;
	public boolean save(BoardDTO board) throws Exception;
	public int update(BoardDTO board) throws Exception;
	public void delete(int id) throws Exception;
	public List<BoardDTO> detail(int id);
	public void updateFile(BoardDTO board) throws Exception;
	public int currunt() throws Exception;
	public List<BoardDTO> search(BoardDTO board) throws Exception;
}

package com.spring.boot.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.spring.boot.dto.BoardDTO;

@Mapper
public interface BoardMapper {
	
	public int cnt() throws Exception;
	public List<BoardDTO> getList() throws Exception;
	public boolean save(BoardDTO dto) throws Exception;
	public int update(BoardDTO dto) throws Exception;
	public void delete(int id) throws Exception;
	public List<BoardDTO> detail(int id);
	
}

var _listData;
var Yn;

var _cnt = 0;

var _pageIdx = 1;
var _listLength = 10;
var _currentIdx = 1;

var main = {
	init : function(){
		console.log('index js start');
		main.event();
		main.callData();
		Yn = localStorage.getItem('loginYn');
		if(Yn == 'Y'){
			$('#btnBack').prop('hidden', true);
			$('#btnLogout').prop('hidden', false);
		}else{
			$('#btnBack').prop('hidden', false);
			$('#btnLogout').prop('hidden', true);
		}
		console.log('_pageIdx : ' + _pageIdx);
		console.log('_listLength : ' + _listLength);
		console.log('_currentIdx : ' + _currentIdx);
	},
	
	event : function(){
		$('#btnBack').on('click', function(){
			location.href='/';
		});
		$('#btnLogout').on('click', function(){
			localStorage.removeItem('loginYn');
			localStorage.removeItem('boardDetail');
			localStorage.removeItem('user');
			location.href='/';
		});
		$('#page>.pageNum').on('click', function (e) {
		    if(e.currentTarget.text != _pageIdx){
			    _listLength = Number(e.currentTarget.text)*10;
			    _currentIdx = _listLength - 9;
			    _pageIdx = Number(e.currentTarget.text);
			    
			    console.log('_pageIdx : ' + _pageIdx);
				console.log('_listLength : ' + _listLength);
				console.log('_currentIdx : ' + _currentIdx);
			    
			    console.log(e);
			    console.log(_currentIdx, _listLength);
			    console.log('click page num : '+e.currentTarget.text);
			    for(var i = 0; i< $('#page>a').length; i++){
					if($('#page>a')[i].style.color != ''){
						$('#page>a')[i].style = '';
					}
				}
				e.currentTarget.style.fontWeight = 'bold';
				e.currentTarget.style.fontSize = '1.2rem';
				e.currentTarget.style.color = 'black';
				main.callData2(_currentIdx, _listLength);
			}
		});
		
		$('#searchType').on('change', function(){
			if($('#searchType').val() == 'modifyDate'){
				$('#datePicker').prop('hidden', false);
				$('#searchWord').prop('hidden', true);
				$('#datePicker').datepicker({
//					showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
//					buttonImage: "/application/db/jquery/images/calendar.gif", // 버튼 이미지
//					buttonImageOnly: true, // 버튼에 있는 이미지만 표시한다.
					changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시한다.
					changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
					minDate: '-100y', // 현재날짜로부터 100년이전까지 년을 표시한다.
					nextText: '다음 달', // next 아이콘의 툴팁.
					prevText: '이전 달', // prev 아이콘의 툴팁.
					numberOfMonths: [1,1], // 한번에 얼마나 많은 월을 표시할것인가. [2,3] 일 경우, 2(행) x 3(열) = 6개의 월을 표시한다.
					stepMonths: 3, // next, prev 버튼을 클릭했을때 얼마나 많은 월을 이동하여 표시하는가. 
					yearRange: 'c-100:c+10', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.
//					showButtonPanel: true, // 캘린더 하단에 버튼 패널을 표시한다. 
//					currentText: '오늘 날짜' , // 오늘 날짜로 이동하는 버튼 패널
//					closeText: '닫기',  // 닫기 버튼 패널
					dateFormat: "yy-mm-dd", // 텍스트 필드에 입력되는 날짜 형식.
//					showAnim: "slide", //애니메이션을 적용한다.
					showMonthAfterYear: true , // 월, 년순의 셀렉트 박스를 년,월 순으로 바꿔준다. 
					dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], // 요일의 한글 형식.
					monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], // 월의 한글 형식.
					yearRange: "2013:2023" //연도 범위
				});
			}
		});
		
	},
	
	callData(){
		$.ajax({
            url:'/cnt', //request 보낼 서버의 경로
            method:'post', // 메소드(get, post, put 등)
            type:'json',
            contentType: 'application/json',
            data: JSON.stringify({'index': 'index'}), //보낼 데이터
            success: function(data) {
                //서버로부터 정상적으로 응답이 왔을 때 실행
                console.log(data);
                _cnt = data;
                $('#cnt').text('');
                $('#cnt').text('게시글 수 : '+data);
                var page = Math.ceil(data/10);
                $('.pageNum').remove();
                var a;
                var maxNo = _pageIdx+9; 
                if(maxNo > page){
					maxNo = page;
					$('#next').prop('hidden', true);
				}else{
					$('#next').prop('hidden', false);
				}
				if(_pageIdx >10){
					$('#prev').prop('hidden', false);
				}else{
					maxNo = 10;
					_pageIdx = 1;
					$('#prev').prop('hidden', true);
				}
                for(var i = maxNo; i>=_pageIdx; i--){
					a = document.createElement('a');
					a.href = 'javascript:void(0);';
					a.text = i;
					a.className = 'pageNum';
					if(_pageIdx == i){
						a.style.fontWeight = 'bold';
						a.style.fontSize = '1.2rem';
						a.style.color = 'black';
					}
					document.getElementById('page').children[0].after(a);
				}
                main.callData2(_currentIdx, _listLength);
            },
            error: function(err) {
                //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
                console.log(err);
            }
        });
	},
	
	callData2(pageIdx, listLength){
		$.ajax({
            url:'/getList', //request 보낼 서버의 경로
            method:'post', // 메소드(get, post, put 등)
            type:'json',
            contentType: 'application/json',
            data: JSON.stringify({'pageIdx': pageIdx, 'listLength':listLength}), //보낼 데이터
            success: function(data) {
                //서버로부터 정상적으로 응답이 왔을 때 실행
                main.drawTable(data);
            },
            error: function(err) {
                //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
                console.log(err);
            }
        });
	},
	
	drawTable(data){
		console.log(data);
		$('#table').html('');
		_listData = data;
		var template;
			template	+=	'<tr>';
			template	+=		'<th>';
			template	+=		'No';
			template	+=		'</th>';
			template	+=		'<th>';
			template	+=		'ID';
			template	+=		'</th>';
			template	+=		'<th>';
			template	+=		'제목';
			template	+=		'</th>';
			template	+=		'<th>';
			template	+=		'게시자';
			template	+=		'</th>';
			template	+=		'<th>';
			template	+=		'게시일';
			template	+=		'</th>';
			template	+=	'/<tr>';
		data.forEach(function(list){
			template	+=	'<tr>';
			template	+=		'<td>';
			template	+=			list.rownum;
			template	+=		'</td>';
			template	+=		'<td>';
			template	+=			'<a href="/goDetail?id='+list.id+'">';
			template	+=				list.id;
			template	+=			'<a>';
			template	+=		'</td>';
			template	+=		'<td>';
			template	+=			'<a href="/goDetail?id='+list.id+'">';
			template	+=				list.title;
			template	+=			'<a>';
			template	+=		'</td>';
			template	+=		'<td>';
			template	+=		list.modifyName;
			template	+=		'</td>';
			template	+=		'<td>';
			template	+=		list.modifyDate.substr(0,10);
			template	+=		'</td>';
			template	+=	'/<tr>';
		});
		$('#table').html(template);
		main.event();
	},
	
	prePage(obj){
		_currentIdx = _currentIdx-100;
	    _listLength = _listLength -100;
	    _pageIdx = Number(obj.nextElementSibling.text)-10;
	    
	    console.log('_pageIdx : ' + _pageIdx);
		console.log('_listLength : ' + _listLength);
		console.log('_currentIdx : ' + _currentIdx);
		
		console.log(_currentIdx, _listLength);
		
		main.callData();
	},
	
	nextPage(obj){
		_listLength = (Number(obj.previousElementSibling.text)+1)*10;
	    _currentIdx = _listLength - 9;
	    _pageIdx = Number(obj.previousElementSibling.text)+1;
	    
	    console.log('_pageIdx : ' + _pageIdx);
		console.log('_listLength : ' + _listLength);
		console.log('_currentIdx : ' + _currentIdx);
	    
		console.log(_currentIdx, _listLength);
//		main.callData2(_currentIdx, _listLength);
		main.callData();
	},
	
	search(){
		_searchType = $('#searchType').val();
		if(_searchType == ''){
			alert('검색 유형을 선택하세요.');
		}else{
			var _searchWord;
			if(_searchType == 'modifyDate'){
				_searchWord = $('#datePicker').val();
			}else{
				_searchWord = $('#searchWord').val();
			}
			
			console.log(_searchWord);
			params = {
				'searchType'	: _searchType,
				'searchWord'	: _searchWord,
				'pageIdx'		: _pageIdx,
				'listLength'	: _listLength
			};
			$.ajax({
			    url:'/search', //request 보낼 서버의 경로
			    method:'post', // 메소드(get, post, put 등)
			    type:'json',
			    contentType: 'application/json',
			    data: JSON.stringify(params), //보낼 데이터
			    success: function(data) {
			        //서버로부터 정상적으로 응답이 왔을 때 실행
			        console.log(data);
			        if(data.length < 1){
						main.callData2(_currentIdx, _listLength);
					}else{
				        main.drawTable(data);
					}
			    },
			    error: function(err) {
			        //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
			        console.log(err);
			        alert(err.responseJSON.error);
			    }
			});
		}
	},
	
	enter(){
		if(window.event.keyCode == 13){
			main.search();
		}
		
	},
}

main.init();
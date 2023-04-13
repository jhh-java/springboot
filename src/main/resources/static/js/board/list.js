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
	
	detail(id){
//		$.ajax({
//            url:'/goDetail', //request 보낼 서버의 경로
//            method:'post', // 메소드(get, post, put 등)
//            type:'json',
//            contentType: 'application/json',
//            data: JSON.stringify({'id': id}), //보낼 데이터
//            success: function(data) {
//                //서버로부터 정상적으로 응답이 왔을 때 실행
//                console.log(data);
//            },
//            error: function(err) {
//                //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
//                console.log(err);
//            }
//        });
	}
}

main.init();
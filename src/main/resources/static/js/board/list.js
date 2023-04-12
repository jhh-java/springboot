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
                $('#cnt').text($('#cnt').text()+data);
                var page = Math.ceil(data/10);
                var a;
                for(var i = 10; i>=1; i--){
					a = document.createElement('a');
					a.href = 'javascript:void(0);';
					a.text = i;
					if(_currentIdx == i){
						a.style.fontWeight = 'bold';
						a.style.fontSize = '1.2rem';
						a.style.color = 'black';
					}
					a.onclick = function(obj){
						if(_currentIdx == Number(obj.currentTarget.text)){
							false;
						}else{
							obj.currentTarget.style.fontWeight = 'bold';
							obj.currentTarget.style.fontSize = '1.2rem';
							obj.currentTarget.style.color = 'black';
							main.page(this);
						}
						if(String(_currentIdx).includes('7')){
							main.redraw();
						}
					}
					document.getElementById('page').children[0].after(a);
				}
                main.callData2(_pageIdx, _listLength);
            },
            error: function(err) {
                //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
                console.log(err);
            }
        });
	},
	
	redraw(){
		var test1 = _currentIdx-4;
		var test2 = _currentIdx+6;
		console.log(test1,test2);
		$('#page').html('');
		$('#page').append(
			'<a id="prev" href="javascript:void(0);" onclick="main.prePage();">[이전]</a>'
			+'<a id="next" href="javascript:void(0);" onclick="main.nextPage();">[다음]</a>');
		for(var i = test2; i>=test1; i--){
			a = document.createElement('a');
			a.href = 'javascript:void(0);';
			a.text = i;
			if(_currentIdx == i){
				a.style.fontWeight = 'bold';
				a.style.fontSize = '1.2rem';
				a.style.color = 'black';
			}
			a.onclick = function(obj){
				if(_currentIdx == Number(obj.currentTarget.text)){
					false;
				}else{
					obj.currentTarget.style.fontWeight = 'bold';
					obj.currentTarget.style.fontSize = '1.2rem';
					obj.currentTarget.style.color = 'black';
					main.page(this);
				}
				if(String(_currentIdx).includes('7')){
					main.redraw();
				}
			}
			document.getElementById('page').children[0].after(a);
		}
	},
	
	prePage(){
		console.log(_currentIdx);
		if(_currentIdx <= 10){
			false;
		}else{
			
		}
	},
	
	nextPage(){
//		_currentIdx = 11;
//		$('#page').html()
		Math.ceil(_currentIdx/10)*10
//		$('#prev').after()
		var test1 = _currentIdx-4;
		var test2 = _currentIdx+6;
		console.log(test1,test2);
		if(String(_currentIdx).includes('7')){
			for(var i = test1; i<=test2; i++){
				$('#page').html('');
			}
		}
	},
	
	page(obj){
		var listLength = Number(obj.text) * _listLength;
		_currentIdx = Number(obj.text); 
		var pageIdx = listLength-9;
		main.callData2(pageIdx, listLength);
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
		_listData = data;
		var template;
			template	+=	'<tr>';
			template	+=		'<th>';
			template	+=		'제목';
			template	+=		'</th>';
			template	+=		'<th>';
			template	+=		'내용';
			template	+=		'</th>';
			template	+=		'<th>';
			template	+=		'게시일';
			template	+=		'</th>';
			template	+=		'<th>';
			template	+=		'게시자';
			template	+=		'</th>';
			template	+=	'/<tr>';
		data.forEach(function(list){
			console.log(list);
			template	+=	'<tr>';
			template	+=		'<td>';
			template	+=			'<a href="/goDetail?id='+list.id+'">';
			template	+=				list.title;
			template	+=			'<a>';
			template	+=		'</td>';
			template	+=		'<td>';
			template	+=			'<a href="/goDetail?id='+list.id+'">';
			template	+=				list.detail;
			template	+=			'<a>';
			template	+=		'</td>';
			template	+=		'<td>';
			template	+=		list.modifyDate.substr(0,10);
			template	+=		'</td>';
			template	+=		'<td>';
			template	+=		list.modifyName;
			template	+=		'</td>';
			template	+=	'/<tr>';
		});
		$('#table').html(template);
		for(var i=0; i< document.getElementById('page').children.length; i++){
			if(_currentIdx != i){
				document.getElementById('page').children[i].style = '';
			}else{
				if(String(_currentIdx).includes('7')){
					
				}
				
			}
		}
		if(_currentIdx > 10){
			$('#prev').prop('hidden', false);
		}
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
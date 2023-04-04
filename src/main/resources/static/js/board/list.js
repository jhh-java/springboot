var _listData;
var Yn;
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
                $('#cnt').text($('#cnt').text()+data);
                main.callData2();
            },
            error: function(err) {
                //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
                console.log(err);
            }
        });
	},
	
	callData2(){
		$.ajax({
            url:'/getList', //request 보낼 서버의 경로
            method:'post', // 메소드(get, post, put 등)
            type:'json',
            contentType: 'application/json',
            data: JSON.stringify({'index': 'index'}), //보낼 데이터
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
			template	+=			'<a style="text-decoration-line: none;" href="/goDetail?id='+list.id+'">';
			template	+=				list.title;
			template	+=			'<a>';
			template	+=		'</td>';
			template	+=		'<td>';
			template	+=			'<a style="text-decoration-line: none;" href="/goDetail?id='+list.id+'">';
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
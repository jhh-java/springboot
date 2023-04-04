var _listData;
var main = {
	init : function(){
		console.log('index js start');
		main.event();
		main.callData();
	},
	
	event : function(){
		$('#login').on('click', function(){
			if(($('#userId').val() != '') && ($('#userPassword').val() != '')){
				var obj = {
					id			:	$('#userId').val(),
					password	:	$('#userPassword').val()
				};
				$.ajax({
		            url:'/login', //request 보낼 서버의 경로
		            method:'post', // 메소드(get, post, put 등)
		            type:'json',
		            contentType: 'application/json',
		            data: JSON.stringify(obj), //보낼 데이터
		            success: function(data) {
		                //서버로부터 정상적으로 응답이 왔을 때 실행
		                console.log(data);
		                if(data == 'SUCCESS'){
							localStorage.setItem('loginYn', 'Y');
							localStorage.setItem('user', $('#userId').val());
							alert('로그인 성공!!!');
			                location.href = 'list'
						}else{
							alert('로그인 실패!');
						}
		            },
		            error: function(err) {
		                //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
		                console.log(err);
		            }
		        });
			}else if(($('#userId').val() == '') && ($('#userPassword').val() == '')){
				alert('아이디와 비밀번호를 입력해주세요.');
			}else if(($('#userId').val() != '') && ($('#userPassword').val() == '')){
				alert('비밀번호를 입력해주세요.');
			}else if(($('#userId').val() == '') && ($('#userPassword').val() != '')){
				alert('아이디를 입력해주세요.');
			}
		});
		
		$('#userPassword').on('keydown', function(e){
			if(e.keyCode == 13){
				$('#login').trigger('click');
			}
		})
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
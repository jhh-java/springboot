var main = {
	init : function(){
		console.log('index js start');
		main.event();
	},
	
	event : function(){
		$('#signIn').on('click', function(){
			main.login();
		});
		$('#regist').on('click', function(){
			main.regist();
		});
	},
	
	login : function(){
		var param = {
			id		:	$('#loginName').val(),
			password:	$('#loginPassword').val(),
			shop	: 	'Y'
		};
		$.ajax({
		    url:'/login', //request 보낼 서버의 경로
		    method:'post', // 메소드(get, post, put 등)
		    type:'json',
		    contentType: 'application/json',
		    data: JSON.stringify(param), //보낼 데이터
		    success: function(data) {
		        //서버로부터 정상적으로 응답이 왔을 때 실행
		        console.log(data);
	        	alert(data);
		        if(data == 'SUCCESS'){
			        localStorage.setItem('loginYn', 'Y');
			        location.href='/shopIndex';
				}
		    },
		    error: function(err) {
		        //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
		        console.log(err);
		    }
		});
	},
	
	regist : function(){
		var param = {
			name			:	$('#registerName').val(),
			id				:	$('#registerUserID').val(),
			email			:	$('#registerEmail').val(),
			password		:	$('#registerPassword').val(),
		};
		$.ajax({
		    url:'/shop/regist', //request 보낼 서버의 경로
		    method:'post', // 메소드(get, post, put 등)
		    type:'json',
		    contentType: 'application/json',
		    data: JSON.stringify(param), //보낼 데이터
		    success: function(data) {
		        //서버로부터 정상적으로 응답이 왔을 때 실행
		        console.log(data);
		        if(data === 200){
					alert('Welcome!');
					location.reload();
				}
		    },
		    error: function(err) {
		        //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
		        console.log(err);
		    }
		});
	}
}

main.init();

/*
$.ajax({
    url:'/insert', //request 보낼 서버의 경로
    method:'post', // 메소드(get, post, put 등)
    type:'json',
    contentType: 'application/json',
    data: JSON.stringify({index:'index'}), //보낼 데이터
    success: function(data) {
        //서버로부터 정상적으로 응답이 왔을 때 실행
        console.log(data);
        location.href='/list';
    },
    error: function(err) {
        //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
        console.log(err);
    }
});
*/
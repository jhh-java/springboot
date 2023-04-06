var main = {
	init : function(){
		console.log('index js start');
		main.event();
	},
	
	event : function(){
		
	},
	
	sample : function(){
		
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
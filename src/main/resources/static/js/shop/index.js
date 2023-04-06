var clickCnt = 0;
var loginYn;
var main = {
	init : function(){
		console.log('index js start');
		main.event();
		loginYn = localStorage.getItem('loginYn');
		if(loginYn === 'Y'){
			$('#login').prop('hidden', true);
			$('#logout').prop('hidden', false);
			$('.cart').prop('hidden', false);
		}
	},
	
	event : function(){
		$('footer').on('click', function(){
			clickCnt = clickCnt + 1;
			if(clickCnt === 5){
				$('#btnBack').prop('hidden', false);
			}
		});
		
		$('#logout').on('click', function(){
			alert('logout!');
			localStorage.removeItem('loginYn');
			location.reload();
		});
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
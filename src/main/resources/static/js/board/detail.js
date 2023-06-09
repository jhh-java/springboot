var _listData;
var searchParams = new URLSearchParams(location.search);
let param;
var user;

var main = {
	init : function(){
		console.log('index js start');
		main.event();
		for (param of searchParams) {
		  	console.log(param);
		}
		if(localStorage.getItem('user') != null){
			user = localStorage.getItem('user');
		}
		main.callData();
	},
	
	event : function(){
		$('#btnBack').on('click', function(){
			location.href='/list';
		});
		$('#btnModify').on('click', function(){
			main.modify();
		});
		$('#btnDelete').on('click', function(){
			main.delete();
		});
		$('#bntDown').on('click', function(){
			main.download();
		});
	},
	
	callData(){
		$.ajax({
            url:'/detail', //request 보낼 서버의 경로
            method:'post', // 메소드(get, post, put 등)
            type:'json',
            contentType: 'application/json',
            data: JSON.stringify({'id': param[1]}), //보낼 데이터
            success: function(data) {
                //서버로부터 정상적으로 응답이 왔을 때 실행
                console.log(data);
                param.push(data[0].filename);
                main.drawTable(data);
            },
            error: function(err) {
                //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
                console.log(err);
            }
        });
	},
	
	
	drawTable(data){
		_listData = data;
		$('#id').val(data[0].id);
		$('#title').val(data[0].title);
		$('#detail').val(data[0].detail);
		$('#modifyName').val(data[0].modifyName);
		$('#modifyDate').val(data[0].modifyDate);
		if((data[0].originFileName != '') && (data[0].originFileName != null)){
			$('.fileYn').prop('hidden', false);
			$('#fileName').val(data[0].originFileName);
		}else{
			$('.fileYn').prop('hidden', true);
		}
	},
	
	modify(){
		var obj = {
			id			:		param[1],
			title		:		$('#title').val(),
			detail		:		$('#detail').val(),
			modifyName	:		user
		};
		if(confirm('수정 하시겠습니까?')){
			$.ajax({
	            url:'/modify', //request 보낼 서버의 경로
	            method:'post', // 메소드(get, post, put 등)
	            type:'json',
	            contentType: 'application/json',
	            data: JSON.stringify(obj), //보낼 데이터
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
		}
	},
	
	delete(){
		if(confirm('정말 삭제 하시겠습니까?')){
			$.ajax({
	            url:'/delete', //request 보낼 서버의 경로
	            method:'post', // 메소드(get, post, put 등)
	            type:'json',
	            contentType: 'application/json',
	            data: JSON.stringify({'id': param[1]}), //보낼 데이터
	            success: function(data) {
	                //서버로부터 정상적으로 응답이 왔을 때 실행
	                console.log(data);
	                main.deleteFile();
//	                location.href='/list';
	            },
	            error: function(err) {
	                //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
	                console.log(err);
	            }
	        });
		}
	},
	
	download(){
		var filename = _listData[0].filename;
//		var xhr = new XMLHttpRequest();
//		xhr.responseType = 'blob';
//		xhr.onload = function(){
//			var a = document.createElement('a');
//			a.href = window.URL.createObjectURL(xhr.response);
//			a.download = filename;
//			a.style.display = 'none';
//	        document.body.appendChild(a);
//	        a.click();
//	        delete a;
//		};
//		xhr.open('GET', '../../files/'+filename);
//		xhr.send();
		var a = document.createElement('a');
		a.href = '../../files/'+filename;
		a.download = filename;
		a.click();
		delete a;
	},
	
	deleteFile(){
		$.ajax({
	            url:'/deleteFile', //request 보낼 서버의 경로
	            method:'post', // 메소드(get, post, put 등)
	            type:'json',
	            contentType: 'application/json',
	            data: JSON.stringify({'id': param[1], 'filename': param[2]}), //보낼 데이터
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
	}
}

main.init();
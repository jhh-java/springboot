var _listData;
var user;
var main = {
	init : function(){
		console.log('index js start');
		main.event();
		if(localStorage.getItem('boardDetail') != null){
			var obj = JSON.parse(localStorage.getItem('boardDetail'));
			$('#title').val(obj.title);
			$('#detail').val(obj.detail);
			localStorage.removeItem('boardDetail');
		}
		if(localStorage.getItem('user') != null){
			user = localStorage.getItem('user');
		}
	},
	
	event : function(){
		$('#btnBack').on('click', function(){
			var obj = {
				title	:	$('#title').val(),
				detail	:	$('#detail').val()
			}
			localStorage.setItem('boardDetail', JSON.stringify(obj));
			location.href='/list';
		});
		$('#btnInsert').on('click', function(){
			localStorage.removeItem('boardDetail');
			main.insert();
		});
	},
	
	insert(){
		var obj = {
			title		:	$('#title').val(),
			detail		:	$('#detail').val(),
			writerName	:	user,
			modifyName	:	user,
		};
		$.ajax({
            url:'/insert', //request 보낼 서버의 경로
            method:'post', // 메소드(get, post, put 등)
            type:'json',
            contentType: 'application/json',
            data: JSON.stringify(obj), //보낼 데이터
            success: function(data) {
                //서버로부터 정상적으로 응답이 왔을 때 실행
                console.log(data);
                var fileData = $('input[name="file"]');
                if(fileData[0].files.length < 1){
	                location.href='/list';
				}else{
	                main.fileSave();
				}
            },
            error: function(err) {
                //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
                console.log(err);
            }
        });
	},
	
	fileSave(){
		var formData = new FormData();
		var fileData = $('input[name="file"]');
		var files = fileData[0].files;
		console.log(files);
		for(var i=0; i<files.length; i++){
			formData.append('file', files[i]);
		}
		
		$.ajax({
            url:'/imageSave', //request 보낼 서버의 경로
            processData : false,
            contentType : false,
            data : formData,
            type : "POST",
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
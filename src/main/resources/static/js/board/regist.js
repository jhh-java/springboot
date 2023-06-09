var _listData;
var obj;
var main = {
	init : function(){
		console.log('index js start');
		main.event();
		if(localStorage.getItem('item') != null){
			obj = JSON.parse(localStorage.getItem('item'));
			$('#userId').val(obj.userId);
			$('#userName').val(obj.userName);
			$('#userBirth').val(obj.userBirth);
			$('#userPhone').val(obj.userPhone);
			$('#userZip').val(obj.userZip);
			$('#userAddr1').val(obj.userAddr1);
			$('#userAddr2').val(obj.userAddr2);
			localStorage.removeItem('item');
		}
	},
	
	event : function(){
		$('#btnBack').on('click', function(){
//			obj ={
//				userId			:	$('#userId').val(),
//				userName		:	$('#userName').val(),
//				userBirth		:	$('#userBirth').val(),
//				userPhone		:	$('#userPhone').val(),
//				userZip			:	$('#userZip').val(),
//				userAddr1		:	$('#userAddr1').val(),
//				userAddr2		:	$('#userAddr2').val(),
//			};
//			localStorage.setItem('item', JSON.stringify(obj));
			location.href='/';
		});
		
		$('#userName').on('keyup', function(){//이름
			var reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
			if(reg.test($(this).val())){
				console.log('test');
			}else{
				$(this).val('');
			}
		});
		
		$('#userPhone', '#userBirth').on('keyup', function(){//전화
			var reg = /^[0-9]+$/g;
			if(reg.test($(this).val())){
				console.log('test');
			}else{
				$(this).val('');
			}
		});
		
		$('#searchAddr').on('click', function(){
			new daum.Postcode({
		        oncomplete: function(data) {
					console.log(data);
					$('#userZip').val(data.zonecode);
					if(data.userSelectedType == 'J'){//지번
						$('#userAddr1').val(data.jibunAddress);
						$('#userAddr2').focus();
					}else{//도로명
						$('#userAddr1').val(data.roadAddress);
						$('#userAddr2').focus();
					}
		        }
		    }).open();
		});
		
		$('#btnRegist').on('click', function(){
			if(main.validation()){
				main.regist();
			}
		});
	},
	
	regist(){
		var obj = {
			id		:	$('#userId').val(),
			password:	$('#userPassword').val(),
			name	:	$('#userName').val(),
			birth	:	$('#userBirth').val(),
			phone	:	$('#userPhone').val(),
			zip		:	$('#userZip').val(),
			addr1	:	$('#userAddr1').val(),
			addr2	:	$('#userAddr2').val()
		};
		$.ajax({
            url:'/regist', //request 보낼 서버의 경로
            method:'post', // 메소드(get, post, put 등)
            type:'json',
            contentType: 'application/json',
            data: JSON.stringify(obj), //보낼 데이터
            success: function(data) {
                //서버로부터 정상적으로 응답이 왔을 때 실행
                console.log(data);
                if(data == 200){
					if(!alert('회원가입에 성공 했습니다.')){
						location.href='/';
					}
				}else{
					alert('실패');
				}
            },
            error: function(err) {
                //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
                console.log(err);
            }
        });
	},
	
	validation : function(){
		if($('#userId').val() == ''){
			alert('아이디를 입력하세요.');
			$('#userId').focus();
		}else if($('#userPassword').val() == ''){
			alert('비밀번호를 입력하세요.');
			$('#userPassword').focus();
		}else if($('#userName').val() == ''){
			alert('이름을 입력하세요.');
			$('#userName').focus();
		}else if($('#userBirth').val() == ''){
			alert('생년월일을 입력하세요.');
			$('#userBirth').focus();
		}else if($('#userPhone').val() == ''){
			alert('전화번호를 입력하세요.');
			$('#userPhone').focus();
		}else if($('#userZip').val() == ''){
			alert('주소를 입력하세요.');
			$('#userZip').focus();
		}else if($('#userAddr1').val() == ''){
			alert('주소를 입력하세요.');
			$('#userAddr1').focus();
		}else if($('#userAddr2').val() == ''){
			alert('주소를 입력하세요.');
			$('#userAddr2').focus();
		}else{
			return true;
		}
	},
}

main.init();
jQuery(document).ready(function() {
	   
    // requisicoes

    var urlBase = "http://localhost:8080"
    	
	$("#carregarAulas").click(function(){ 
		getForm();
		}
	);

    function getForm(){
        var usuarioId = "1";
        $.ajax({
            type : 'GET',
            url  : urlBase + '/usuario/getAulas/' + usuarioId,                
            contentType: "application/json",
			data : JSON.stringify(usuarioId),
            success :  function(result){
                console.log(result);   
				var htmlCode
				console.log(result);
				for(var i=0; i<result.length; i++){
					htmlCode += '<div class="col-lg-4">' +
					'<div class="panel panel-default">' +
						'<div class="panel-heading"> DIA' + 
							result[i].dia + 
						'</div>' + 
						'<div class="panel-body">' + 
							'<form method="get">' + 
								'<div class="form-group"> ' + 
									'<label>Local</label>' + 
									'<input class="form-control" value=' + result[i].local + '>'+									
								'</div>' + 
								'<div class="form-group"> ' + 
									'<label>Professor</label>' + 
									'<input class="form-control" value=' + result[i].professor + '>'+									
								'</div>' + 
								'<div class="form-group"> ' + 
									'<label>Horário</label>' + 
									'<input class="form-control" value=' + result[i].horario + '>'+									
								'</div>' + 
							'<form></div></div></div>'
				}
				$("#aula").html(htmlCode); 							
            },
            error : function(e) {
                console.log("ERROR: ", e);                
                return false;
            }
        });
    }
});

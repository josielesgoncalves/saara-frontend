jQuery(document).ready(function() {
	
    var urlBase = "http://localhost:8080"

    $("#materia").click(function(){
        if(!$("#materia").val()){
			var cursoId = "1";
            $.ajax({
                type : 'GET',
                url  : urlBase + '/selectBox/getMateriasCurso/' + cursoId,
                contentType: "application/json",
                success :  function(result)
                {
                    var htmlCode
                    console.log(result);
                    for(var i=0; i<result.length; i++){
                        htmlCode += '<option value="'+result[i].id+'">'+result[i].descricao+'</option>'
                    }
                    $("#materia").html(htmlCode); 
                },
                error : function(e) {
                    console.log("ERROR: ", e);
                }
            });           
        }
    })
	
	$("#status").click(function(){
        	$.ajax({
                type : 'GET',
                url  : urlBase + '/selectBox/getStatusMateria',
                contentType: "application/json",
                success :  function(result)
                {
                    var htmlCode
                    console.log(result);
                    for(var i=0; i<result.length; i++){
                        htmlCode += '<option value="'+result[i].id+'">'+result[i].descricao+'</option>'
                    }
                    $("#status").html(htmlCode); 
                },
                error : function(e) {
                    console.log("ERROR: ", e);
                }
            }); 
    })
	
	$("#notaType").click(function(){
        	$.ajax({
                type : 'GET',
                url  : urlBase + '/selectBox/getNotaType',
                contentType: "application/json",
                success :  function(result)
                {
                    var htmlCode
                    console.log(result);
                    for(var i=0; i<result.length; i++){
                        htmlCode += '<option value="'+result[i].id+'">'+result[i].descricao+'</option>'
                    }
                    $("#notaType").html(htmlCode); 
                },
                error : function(e) {
                    console.log("ERROR: ", e);
                }
            }); 
    })
	
	$("#lembreteType").click(function(){
        	$.ajax({
                type : 'GET',
                url  : urlBase + '/selectBox/getLembreteType',
                contentType: "application/json",
                success :  function(result)
                {
                    var htmlCode
                    console.log(result);
                    for(var i=0; i<result.length; i++){
                        htmlCode += '<option value="'+result[i].id+'">'+result[i].descricao+'</option>'
                    }
                    $("#lembreteType").html(htmlCode); 
                },
                error : function(e) {
                    console.log("ERROR: ", e);
                }
            }); 
    })
	
	$("#materiaAula").click(function(){
		var cursoId = "1";
        	$.ajax({
                type : 'GET',
                url  : urlBase + '/selectBox/getMateriasCurso/' + cursoId,
                contentType: "application/json",
                success :  function(result)
                {
                    var htmlCode
                    console.log(result);
                    for(var i=0; i<result.length; i++){
                        htmlCode += '<option value="'+result[i].id+'">'+result[i].descricao+'</option>'
                    }
                    $("#materiaAula").html(htmlCode); 
                },
                error : function(e) {
                    console.log("ERROR: ", e);
                }
            }); 
    })
	
	$("#lembreteMateria").click(function(){
		var cursoId = "1";
        	$.ajax({
                type : 'GET',
                url  : urlBase + '/selectBox/getMateriasCurso/' + cursoId,
                contentType: "application/json",
                success :  function(result)
                {
                    var htmlCode
                    console.log(result);
                    for(var i=0; i<result.length; i++){
                        htmlCode += '<option value="'+result[i].id+'">'+result[i].descricao+'</option>'
                    }
                    $("#lembreteMateria").html(htmlCode); 
                },
                error : function(e) {
                    console.log("ERROR: ", e);
                }
            }); 
    })
	
	$("#dia").click(function(){
			$.ajax({
                type : 'GET',
                url  : urlBase + '/selectBox/getDias',
                contentType: "application/json",
                success :  function(result)
                {
                    var htmlCode
                    console.log(result);
                    for(var i=0; i<result.length; i++){
                        htmlCode += '<option value="'+result[i].id+'">'+result[i].descricao+'</option>'
                    }
                    $("#dia").html(htmlCode); 
                },
                error : function(e) {
                    console.log("ERROR: ", e);
                }
            }); 
    })
	
	
	$("#adicionarMateria").click(function(){ 
		addMateria();
		}
	);

    function addMateria(){
		var usuarioId = "1";
        var dto = {
            materiaId: $("#materia").val(),
            nota: $("#nota").val(),
			peso: $("#peso").val(),
            statusId: $("#status").val(),	
			notaType: $("#notaType").val(),				
			usuarioId: usuarioId
        }

        $.ajax({
            type : 'POST',
            url  : urlBase + '/usuario/cadastrar/materia',
            data : JSON.stringify(dto),
            contentType: "application/json",
            success :  function(result){
                console.log(result);
                window.location.reload();
                return true;
            },
            error : function(e) {
                console.log("ERROR: ", e);
                return false;
            }
        });
    }
	
	
	$("#adicionarAula").click(function(){ 
		addAula();
		}
	);

    function addAula(){
		var usuarioId = "1";
        var dto = {
            materiaId: $("#materiaAula").val(),
            professor: $("#professor").val(),
			diaSemanaId: $("#dia").val(),
            horario: $("#horario").val(),	
			local: $("#local").val(),				
			usuarioId: usuarioId
        }

        $.ajax({
            type : 'POST',
            url  : urlBase + '/usuario/adicionarAula',
            data : JSON.stringify(dto),
            contentType: "application/json",
            success :  function(result){
                console.log(result);
                window.location.reload();
                return true;
            },
            error : function(e) {
                console.log("ERROR: ", e);                
                return false;
            }
        });
    }
	
	$("#adicionarLembrete").click(function(){ 
		addLembrete();
		}
	);

	
	function addLembrete(){
		var usuarioId = "1";
        var dto = {
            materiaId: $("#lembreteMateria").val(),
            tipo: $("#lembreteType").val(),
			assunto: $("#assunto").val(),
            data: $("#data").val(),	
			texto: $("#texto").val(),				
			usuarioId: usuarioId
        }

        $.ajax({
            type : 'POST',
            url  : urlBase + '/usuario/adicionarLembrete',
            data : JSON.stringify(dto),
            contentType: "application/json",
            success :  function(result){
                console.log(result);
                window.location.reload();
                return true;
            },
            error : function(e) {
                console.log("ERROR: ", e);                
                return false;
            }
        });
    }
	
});

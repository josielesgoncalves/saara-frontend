jQuery(document).ready(function() {
	
    var urlBase = "http://localhost:8080"

	//$("#tituloMateriasCurso").html("Materias de ' " +  + "'";
	var usuarioId = localStorage.getItem("idUsuario");
	var cursoId = localStorage.getItem("cursoUsuario");
	if(!$("#materia").val()){
		
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
				$("#materia").append(htmlCode);

				exibirMaterias(result) 
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
		});           
	}

	function exibirMaterias(materias)
	{
		var cores = [
			"primary",
			"green",
			"yellow",
			"red"
		];
		if(materias != null)
			materias.forEach(function(materia){
				
				var cor = cores[Math.floor(Math.random() * 4)];
				
				var html = '<div style="width:300px;margin-right: auto">' +
				'<div class="panel panel-' + cor + '">' +
					'<div class="panel-heading">' +
						'<div class="row">' +
							'<div class="col-xs-3">' +
								'<i class="fa fa-book fa-5x"></i>' +
							'</div>' +
							'<div class="col-xs-9 text-right">' +
								'<div class="huge"></div>' +
								'<div>' + materia.descricao + '</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					
				'</div>' +
			'</div>';
				$("#rowMaterias").append(html);
			});
	}
	
	
	
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
			$("#status").append(htmlCode); 
		},
		error : function(e) {
			console.log("ERROR: ", e);
		}
	}); 
	
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
			$("#notaType").append(htmlCode); 
		},
		error : function(e) {
			console.log("ERROR: ", e);
		}
	}); 
	
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
			$("#lembreteType").append(htmlCode); 
		},
		error : function(e) {
			console.log("ERROR: ", e);
		}
	}); 
	
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
			$("#materiaAula").append(htmlCode); 
		},
		error : function(e) {
			console.log("ERROR: ", e);
		}
	}); 
	
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
			$("#lembreteMateria").append(htmlCode); 
		},
		error : function(e) {
			console.log("ERROR: ", e);
		}
	}); 
		
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
			$("#dia").append(htmlCode); 
		},
		error : function(e) {
			console.log("ERROR: ", e);
		}
	}); 
	
	
	
	$("#adicionarMateria").click(function(){ 
		addMateria();
		}
	);

    function addMateria(){
        var dto = {
            materiaDTO: { "materiaId" : $("#materia").val()},
            nota: $("#nota").val(),
			peso: $("#peso").val(),
            statusId: $("#status").val(),	
			notaType: $("#notaType").val(),				
			usuarioDTO: { "usuarioId" : usuarioId }
        }

        $.ajax({
            type : 'POST',
            url  : urlBase + '/usuario/cadastrar/materia',
            data : JSON.stringify(dto),
            contentType: "application/json",
            success :  function(result){
                console.log(result);
                //window.location.reload();
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
                //window.location.reload();
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
                //window.location.reload();
                return true;
            },
            error : function(e) {
                console.log("ERROR: ", e);                
                return false;
            }
        });
    }
	
});

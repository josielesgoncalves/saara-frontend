jQuery(document).ready(function() {
	
    var urlBase = "http://localhost:8080"

    $("#novaMateria").click(function(){
        if(!$("#novaMateria").val()){
			var cursoId = "1";
            $.ajax({
                type : 'POST',
                url  : urlBase + '/selectBox/getCursos',
                contentType: "application/json",
                success :  function(result)
                {
                    var htmlCode
                    console.log(result);
                    for(var i=0; i<result.length; i++){
                        htmlCode += '<option value="'+result[i].id+'">'+result[i].descricao+'</option>'
                    }
                    $("#novaMateria").html(htmlCode); 
                },
                error : function(e) {
                    console.log("ERROR: ", e);
                }
            });
        }
    })

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
	
	$("#adicionarMateria").click(function(){ 
		submitForm();
		}
	);

    function submitForm(){
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
                $("#email").addClass('input-error');
                return false;
            }
        });
    }
});

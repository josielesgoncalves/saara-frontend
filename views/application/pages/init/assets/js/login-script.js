
function scroll_to_class(element_class, removed_height) {
	var scroll_to = $(element_class).offset().top - removed_height;
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 0);
	}
}

function bar_progress(progress_line_object, direction) {
	var number_of_steps = progress_line_object.data('number-of-steps');
	var now_value = progress_line_object.data('now-value');
	var new_value = 0;
	if(direction == 'right') {
		new_value = now_value + ( 100 / number_of_steps );
	}
	else if(direction == 'left') {
		new_value = now_value - ( 100 / number_of_steps );
	}
	progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}

jQuery(document).ready(function() {
	
    /*
        Fullscreen background
        */
        $.backstretch("assets/img/backgrounds/fundo.jpg");

    /*
        Form
        */
        $('.f1 fieldset:first').fadeIn('slow');

        $('.f1 input[type="text"], .f1 input[type="password"]').on('focus', function() {
         $(this).removeClass('input-error');
     });

        $("#phone").bind("keyup blur focus", function(e) {
            e.preventDefault();
            var expre = /[^\d]/g;
            $(this).val($(this).val().replace(expre,''));
        });

        $("#number").bind("keyup blur focus", function(e) {
            e.preventDefault();
            var expre = /[^\d]/g;
            $(this).val($(this).val().replace(expre,''));
        });

    // next step
    $('.f1 .btn-next').on('click', function() {
    	var parent_fieldset = $(this).parents('fieldset');
    	var next_step = true;
    	// navigation steps / progress steps
    	var current_active_step = $(this).parents('.f1').find('.f1-step.active');
    	var progress_line = $(this).parents('.f1').find('.f1-progress-line');
    	
    	// fields validation
    	parent_fieldset.find('input[type="text"], input[type="password"]').each(function() {
    		if( $(this).val() == "" ) {
    			$(this).addClass('input-error');
    			next_step = false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});

        parent_fieldset.find('input[id="name"]').each(function() {
            if( $(this).val().length < 5 || $(this).val().length > 20) {
                $(this).addClass('input-error');
                next_step = false;
            }
            else {
                $(this).removeClass('input-error');
            }
        });

        parent_fieldset.find('select').each(function() {
            if( $(this).val() == "" ) {
                $(this).addClass('input-error');
                next_step = false;
            }
            else {
                $(this).removeClass('input-error');
            }
        });

    	// fields validation
    	
    	if( next_step ) {
    		parent_fieldset.fadeOut(400, function() {
    			// change icons
    			current_active_step.removeClass('active').addClass('activated').next().addClass('active');
    			// progress bar
    			bar_progress(progress_line, 'right');
    			// show next step
               $(this).next().fadeIn();
	    		// scroll window to beginning of the form
               scroll_to_class( $('.f1'), 20 );
           });
    	}
    	
    });
    
    // previous step
    $('.f1 .btn-previous').on('click', function() {
    	// navigation steps / progress steps
    	var current_active_step = $(this).parents('.f1').find('.f1-step.active');
    	var progress_line = $(this).parents('.f1').find('.f1-progress-line');
    	
    	$(this).parents('fieldset').fadeOut(400, function() {
    		// change icons
    		current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
    		// progress bar
    		bar_progress(progress_line, 'left');
    		// show previous step
    		$(this).prev().fadeIn();
    		// scroll window to beginning of the form
           scroll_to_class( $('.f1'), 20 );
       });
    });
    
    // submit
    $('.f1').on('submit', function(e) {
		var passou = true;
    	// fields validation
    	$(this).find('input[type="text"], input[type="password"]').each(function() {
    		if( $(this).val() == "" ) 
			{
				passou = false;
				$(this).addClass('input-error');
				e.preventDefault();
			}else{
				$(this).removeClass('input-error');
			}
    	});
    	
        $(this).find('input[id="confirm_password"]').each(function() {
            if( $(this).val() != $("#password").val() )
			{
				passou = false;
				$(this).addClass('input-error');
				e.preventDefault();
			}else{
				$(this).removeClass('input-error');
			}
        });

		if(passou && !submitForm())
		{
			e.preventDefault();
        }
    });

    // requisicoes

    var urlBase = "http://localhost:8080"

	
    function submitForm(){
        
		var email = $("#email").val();
		var senha = $("#password").val();            	

        $.ajax({
            type : 'POST',
            url  : urlBase + '/usuario/login?email=' + email + '&senha='+ senha,
            data : JSON.stringify(),
            contentType: "application/json",
            success :  function(result){
                console.log(result);
				if(result.code != 0)
				{
					$("#mensagemErroLogin").html(result.error);
					return false;
				}
				
				window.location = "../paginas/index.html";
				localStorage.setItem("idUsuario", result.body.usuarioId);
				localStorage.setItem("cursoUsuario", result.body.usuarioId);
				localStorage.setItem("emailUsuario", result.body.usuarioId);

                return true;
            },
            error : function(e) {
                console.log("ERROR: ", e);
                return false;
            }
        });
    }


});

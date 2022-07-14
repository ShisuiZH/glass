$(function(){
    $('.tab2').click(function(){
        $('.registration').removeClass('off');
        $('.registration').addClass('on');
        $('.auth').removeClass('on');
        $('.auth').addClass('off');
        $('.resetpass').removeClass('on');
        $('.resetpass').addClass('off');

    }); 
});
$(function(){
    $('.tab1').click(function(){
        $('.registration').removeClass('on');
        $('.registration').addClass('off');
        $('.auth').removeClass('off');
        $('.auth').addClass('on');
        $('.resetpass').removeClass('off');
        $('.resetpass').addClass('on');

    }); 
});
$(function(){
    $('.tab2').click(function(){
        $('.tab2').removeClass('not');
        $('.tab2').addClass('active');
        $('.tab1').removeClass('active');
        $('.tab1').addClass('not');
    }); 
});
$(function(){
    $('.tab1').click(function(){
        $('.tab2').removeClass('active');
        $('.tab2').addClass('not');
        $('.tab1').removeClass('not');
        $('.tab1').addClass('active');
    }); 
});
$(function(){
    $('.resetpass').click(function(){
        $('.mod').removeClass('off');
        $('.modal_window').removeClass('off');
    }); 
});
$(document).keydown(function(e) {
    if (e.keyCode === 27) {
        e.stopPropagation();
        $('.mod').addClass('off');
        $('.modal_window').addClass('off');
    }
});
$('.mod').click(function(e) {
    if ($(e.target).closest('.modal_window').length == 0) {
        $('.mod').addClass('off');
        $('.modal_window').addClass('off');
    }
});	

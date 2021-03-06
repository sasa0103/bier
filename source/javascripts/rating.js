var user = localStorage.getItem("user");
if(user == null){user = "Default"};
$("#user").val(user);

if(user == "Default"){
	$("input[type=radio]").attr('disabled', true);
}else{
	$("input[type=radio]").attr('disabled', false);
}

$(function() {
    $('.span4').matchHeight();
});

$('article').each(function(n){
	setRatingForArticle(n+1);
})


function setRatingForArticle(num){
	setRating(num);

	$('#user').change(
		function(){
			user = this.options[this.selectedIndex].text;
			localStorage.setItem("user", user);

			if(user == "Default"){
				$("input[type=radio]").attr('disabled', true);
			}else{
				$("input[type=radio]").attr('disabled', false);
			}
			
			setRating(num);
		});


	$(':radio[name=rating_' + num + ']').click( 
		function(){ 
			var value = $(this).val();   
			postRating(num, value);
		});
}	

function setRating(num) {
	var rating = 0;
	if(user == "Default"){
			$.getJSON( "/api/get/" + num, function( data ) {
			/*$.getJSON( "images/" + num + ".json", function( data ) {*/
			changeStars(num, 6);
			setAvg(num);
		});
	}else{
			$.getJSON( "/api/get/" + num, function( data ) {
			/*$.getJSON( "images/" + num + ".json", function( data ) {*/
			rating = data.ratings[user];
			changeStars(num, rating);
			setAvg(num);
		});
	}
}

function changeStars(n, r) {
	$('#1_' + n ).removeAttr('checked');
	$('#2_' + n ).removeAttr('checked');
	$('#3_' + n ).removeAttr('checked');
	$('#4_' + n ).removeAttr('checked');
	$('#5_' + n ).removeAttr('checked');
	switch (r) {
	    case 1: $(':radio[name=rating_' + n + ']:nth(0)').attr("checked", true);
	    		$('#rated_' + n ).text("");
	    		$('#rated_' + n ).closest('article').css({'background-color':'white'});
	    		break;
	    case 2: $(':radio[name=rating_' + n + ']:nth(1)').attr("checked", true);
	    		$('#rated_' + n ).text("");
	    		$('#rated_' + n ).closest('article').css({'background-color':'white'});
	    		break;
	    case 3: $(':radio[name=rating_' + n + ']:nth(2)').attr("checked", true);
	    		$('#rated_' + n ).text("");
	    		$('#rated_' + n ).closest('article').css({'background-color':'white'});
	    		break;
	    case 4: $(':radio[name=rating_' + n + ']:nth(3)').attr("checked", true);
	    		$('#rated_' + n ).text("");
	    		$('#rated_' + n ).closest('article').css({'background-color':'white'});
	    		break;
	    case 5: $(':radio[name=rating_' + n + ']:nth(4)').attr("checked", true);
	    		$('#rated_' + n ).text("");
	    		$('#rated_' + n ).closest('article').css({'background-color':'white'});
	    		break;
	    case 6: $('#rated_' + n ).text("");
	    		$('#rated_' + n ).closest('article').css({'background-color':'white'});
	    		break;
	    default: $(':radio[name=rating_' + n + ']').removeAttr('checked');
	    		$('#rated_' + n ).text("Diese Bier hast du noch nicht bewertet!");
	    		$('#rated_' + n ).closest('article').css({'background-color':'#BDAA95'});
	}
}

function setAvg(num) {
	var avg = 0;
	$.getJSON( "/api/get/" + num, function( data ) {
	/*$.getJSON( "images/" + num + ".json", function( data ) {*/
		var sum1 = 0;
		var sum2 = 0;
		var sum3 = 0;
		var sum4 = 0;
		var sum5 = 0;
		$.each(data.ratings, function(i, item) {
		    switch (item) {
	    		case 1: sum1 += 1;
	    				break;
	    		case 2: sum2 += 1;
	    				break;
	    		case 3: sum3 += 1;
	    				break;
	    		case 4: sum4 += 1;
	    				break;
	    		case 5: sum5 += 1;
	    				break;
	    		default: break;
		    anz += 1;
			}
		});
		var a =[sum1, sum2, sum3, sum4, sum5];
		var max = 0;
		var maxString;
		var i = 0;
		a.forEach(function(el) {
			i += 1;
			if (max < el){
				max = el;
				maxString = i;
			}
		});
		switch (maxString) {
    		case 1: maxString = "fa fa-check-square-o";
    				break;
    		case 2: maxString = "fa fa-frown-o ";
    				break;
    		case 3: maxString = "fa fa-meh-o";
    				break;
    		case 4: maxString = "fa fa-smile-o";
    				break;
    		case 5: maxString = "fa fa-star-o";
    				break;
    		default: break;
		}
		$('#avgRating_'+num).addClass(maxString);
	});
}

function postRating(n, r){
	$.post("/api/set/" + n + "/" + user + "/" + r, function(){
		location.reload();
	});
}
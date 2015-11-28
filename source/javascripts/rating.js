var user = "Default";

$('article').each(function(n){
	setRatingForArticle(n+1)
})


function setRatingForArticle(num){
	console.log("artikel:" + num);
	setRating(num);

	$('#user').change(
		function(){
			user = this.options[this.selectedIndex].text;
			setRating(num);
		});


	$(':radio').change(  
		function(){    
			console.log("changed"); 
		});
}	

function setRating(num) {
	var rating = 0;
	if(user == "Default"){
		console.log("Default Ansicht");
		$.getJSON( "images/1.json", function( data ) {
			setAvg(num);
		});
	}else{
		$.getJSON( "/api/get/" + num, function( data ) {
			rating = data.ratings[user];
			console.log(user + ", " + rating);
			changeStars(num, rating);
			setAvg(num);
		});
	}
}

function changeStars(n, r) {
	switch (r) {
	    case 1: $(':radio[name=rating_' + n + ']:nth(0)').attr("checked", true);
	    		$('#rated_' + n ).text("");
	    		break;
	    case 2: $(':radio[name=rating_' + n + ']:nth(1)').attr("checked", true);
	    		$('#rated_' + n ).text("");
	    		break;
	    case 3: $(':radio[name=rating_' + n + ']:nth(2)').attr("checked", true);
	    		$('#rated_' + n ).text("");
	    		break;
	    case 4: $(':radio[name=rating_' + n + ']:nth(3)').attr("checked", true);
	    		$('#rated_' + n ).text("");
	    		break;
	    case 5: $(':radio[name=rating_' + n + ']:nth(4)').attr("checked", true);
	    		$('#rated_' + n ).text("");
	    		break;
	    default: $(':radio[name=rating_' + n + ']').removeAttr('checked');
	    		$('#rated_' + n ).text("Diese Bier hast du noch nicht bewertet!");
	    		$('article').eq(n-1).css({'background-color':'#aa5285'});
	}
}

function setAvg(n) {
	var avg = 0;
	$.getJSON( "images/1.json", function( data ) {
		var sum = 0;
		var anz = 0;
		$.each(data.ratings, function(i, item) {
		    sum += item;
		    anz += 1;
		});
		avg = sum / anz;
		$('#avgRating_'+n).text(avg.toString());
		console.log("avg1 " + avg);
	});
}
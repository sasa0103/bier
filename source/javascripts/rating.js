var user = localStorage.getItem("user");
if(user == null){user = "Default"};

$('article').each(function(n){
	setRatingForArticle(n+1);
})


function setRatingForArticle(num){
	console.log("artikel:" + num);
	setRating(num);

	$('#user').change(
		function(){
			user = this.options[this.selectedIndex].text;
			localStorage.setItem("user", user);
			setRating(num);
		});


	$(':radio[name=rating_' + num + ']').click( 
		function(){ 
			var value = $(this).val();   
			console.log("changed to: " + value); 
			postRating(num, value);
		});
}	

function setRating(num) {
	var rating = 0;
	if(user == "Default"){
		console.log("Default Ansicht");
			$.getJSON( "/api/get/" + num, function( data ) {
			/*$.getJSON( "images/" + num + ".json", function( data ) {*/
			setAvg(num);
		});
	}else{
			$.getJSON( "/api/get/" + num, function( data ) {
			/*$.getJSON( "images/" + num + ".json", function( data ) {*/
			rating = data.ratings[user];
			console.log(user + ", " + rating);
			changeStars(num, rating);
			setAvg(num);
		});
	}
}

function changeStars(n, r) {
	console.log("change star" + n);
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
	    default: $(':radio[name=rating_' + n + ']').removeAttr('checked');
	    		$('#rated_' + n ).text("Diese Bier hast du noch nicht bewertet!");
	    		$('#rated_' + n ).closest('article').css({'background-color':'#D6C6CF'});
	}
}

function setAvg(num) {
	var avg = 0;
	$.getJSON( "/api/get/" + num, function( data ) {
	/*$.getJSON( "images/" + num + ".json", function( data ) {*/
		var sum = 0;
		var anz = 0;
		$.each(data.ratings, function(i, item) {
		    sum += item;
		    anz += 1;
		});
		avg = Math.round(sum / anz).toFixed(2);;
		$('#avgRating_'+num).text(avg.toString());
		console.log("avg1 " + avg);
	});
}

function postRating(n, r){
	$.post("/api/set/" + n + "/" + user + "/" + r, function(){
		location.reload();
	});
	console.log("/api/set/" + n + "/" + user + "/" + r);
}
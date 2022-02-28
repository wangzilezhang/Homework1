import Model from './model.js';

var full_data = new Model();
var question_list = [];
var tag_list = [];
var answer_list = [];

window.onbeforeupdate = function(){
	localStorage.setItem('full',full_data);
};


window.onload = function() {

question_list = JSON.parse(localStorage.getItem('questions'));
for (var l1 = 0; l1  <JSON.parse(localStorage.getItem('questions')).length; l1++){
	full_data.add_questions(JSON.parse(localStorage.getItem('questions'))[l1]);
}

var alltag = [];


for (let x = 0; x < full_data.data.tags.length;x++)
		alltag.push(full_data.data.tags[x]);

	var list = '';
	var length = full_data.data.questions.length;
	
	for (var r = 0; r < length;r++){
		list +='<br><div class "row"><div class = "column">'+(full_data.data.questions[r].views+ ' views')+'<div>'+(full_data.data.questions[r].answers.length + ' answers')+'</div></div><div class = "column" style = "padding-left: 100px;width:40%;"><a href = "read_question.html">'+full_data.data.questions[r].title+'</a><div style = "color: black;font-size: 13px;">'+tagfunction(r)+'</div></div><div class = "column" style = "padding-left:150px;"> Asked By '+full_data.data.questions[r].askedBy+'  <div>on '+ full_data.data.questions[r].askedOn +'<div>at '+ full_data.data.questions[r].askedAt +'</div></div></div></div><br><br><br><br><hr>';	
	}
	var tagger = '<div style = "width: 100%">';
	for (var k = 0; k < alltag.length;k++){
		
		tagger += "<a style = 'text-align: center;margin-top: 50px;width:100px;'>"+alltag[k].name+"</a><br><hr>";
	}	

function tagfunction(integ){
	var stringswer = "";
	var tagswer = [];
	for(var c = 0; c < full_data.data.questions[integ].tagIds.length; c++)
		tagswer.push(full_data.data.questions[integ].tagIds[c]);
		
	for(var d = 0; d < tagswer.length; d++)
		for(var e = 0; e < alltag.length; e++)
			if(alltag[e].tid == tagswer[d])
				stringswer += alltag[e].name + "   ";

	
	return stringswer;	
	
}

function attempt3(){
	console.log("works");
}


try{document.getElementById("t_value").innerHTML = "<p style = 'padding-left: 40px;padding-bottom:40px;font-size: 17px'>"+alltag.length+" tags</p>";}catch(error){}	
try{document.getElementById("tagger").innerHTML = tagger + "</div>";}catch(error){}
try{document.getElementById("question_list").innerHTML = list;}catch(error){}
try{document.getElementById("n_value").innerHTML = "<p style = 'padding-left: 40px;padding-bottom:40px;font-size: 17px'>"+ full_data.data.questions.length + " Questions</p>";}catch(error){}


try{document.getElementById("question_form").addEventListener('submit',function(event){
		
		event.preventDefault();
		var q_title = document.getElementById("question_title").value;
		var q_text = document.getElementById("question_text").value;
		var q_tags = document.getElementById("tags").value;
		var q_user = document.getElementById("username").value;



		var date = new Date();   
		question_list.push(
{
qid: 'q' + (full_data.data.questions.length + 1),
title: q_title,
text: q_text,
tagIds: ["t1","t2","t3"],
askedBy : q_user,
askedOn: getMonth(date.getMonth()) + " " + date.getDay()+1 +",  " + date.getFullYear(),
askedAt: date.getHours() + ":" + date.getMinutes(),
answers: [],
views: 0,
})

console.log(question_list)

})}catch(error){}

try{document.getElementById('question_'+r).onclick = function(){var selected = r};}catch(error){}


};



window.onbeforeunload = function(){
	localStorage.setItem('questions',JSON.stringify(question_list));
	localStorage.setItem('tags',JSON.stringify(tag_list));
	localStorage.setItem('answers',JSON.stringify(answer_list));
};

function getMonth(mon){
	if(mon == 0)
		return "Jan";
	if(mon == 1)
		return "Feb";
	if(mon == 2)
		return "Mar";
	if(mon == 3)
		return "Apr";
	if(mon == 4)
		return "May";
	if(mon == 5)
		return "Jun";
	if(mon == 6)
		return "Jul";
	if(mon == 7)
		return "Aug";
	if(mon == 8)
		return "Sep";
	if(mon == 9)
		return "Oct";
	if(mon == 10)
		return "Nov";
	if(mon == 11)
		return "Dec";
	else
		return "error";
}

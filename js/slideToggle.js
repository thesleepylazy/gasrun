var getCurrent=require("js/getCurrentPosition"),getDistance=require("js/getDistance"),getCar=require("js/getCar"),calculateCost=require("js/calculateCost"),opts={lines:7,length:0,width:10,radius:11,corners:1,rotate:0,direction:1,color:"#FFF",shadow:false,},spinner=new Spinner(opts).spin(),historyTable=document.getElementById("historyTable"),input=document.getElementById("destinationInput"),historyCount=1,totalHistoryCost=0,arr=[],item;var _old=$.fn.fadeIn;$.fn.fadeIn=function(){var a=this;_old.apply(this,arguments).promise().done(function(){a.trigger("fadeIn")})};function arrowChange(a){var b=$("#"+a+"Panel");if(b.is(":visible")){if(a=="totalTripCost"){$("#"+a+"Arrow").addClass("glyphicon-refresh").removeClass("glyphicon-chevron-down")}else{$("#"+a+"Arrow").addClass("glyphicon-chevron-down").removeClass("glyphicon-chevron-up")}}else{if(a=="totalTripCost"){$("#"+a+"Arrow").addClass("glyphicon-refresh").removeClass("glyphicon-chevron-down")}else{$("#"+a+"Arrow").addClass("glyphicon-chevron-up").removeClass("glyphicon-chevron-down")}}}$("#dialog").dialog({autoOpen:false,show:{effect:"fadeIn",duration:50},hide:{effect:"fadeOut",duration:50}});$("#dialogHistory").dialog({autoOpen:false,show:{effect:"fadeIn",duration:50},hide:{effect:"fadeOut",duration:50}});$(document).ready(function(){sortLocalStorageKeys();document.getElementById("loadingPlaceHolder").appendChild(spinner.el);$("#routeFlip").click(function(){$("#routePanel").slideToggle("fast","linear",arrowChange("route"))});$("#carFlip").click(function(){$("#carPanel").slideToggle("fast","linear",arrowChange("car"))});$("#make").hide();$("#model").hide();$("#year").hide();$("select[id=make]").change(function(){window.localStorage.setItem("make",$(this).val())});$("select[id=model]").change(function(){window.localStorage.setItem("model",$(this).val())});$("select[id=year]").change(function(){window.localStorage.setItem("year",$(this).val())});$("#dialog").dialog("option","height",400);$("#dialog").dialog("option","width",$(window).width()*0.85);$("#dialogHistory").dialog("option","height",$(window).height()*0.8);$("#dialogHistory").dialog("option","width",$(window).width()*0.85);$(".ui-widget-header").click(function(){$(".dialogClass").dialog("close")});$("#info").click(function(){$("#dialog").dialog("open").scrollTop(0,0)});$("#history").click(function(){$("#dialogHistory").dialog("open").scrollTop(0,0)});$("#subName").fadeIn(300);$("#addToHistory").hide();populateHistory();deleteHistoryInit()});$("#carFlip").one("click",function(){item=window.localStorage.getItem("make");if(item!=null){$("select[id=make]").val(item);document.getElementById("make").onchange();$("#model").one("fadeIn",function(){item=window.localStorage.getItem("model");if(item!=null){$("select[id=model]").val(item);document.getElementById("model").onchange();$("#year").one("fadeIn",function(){item=window.localStorage.getItem("year");if(item!=null){$("select[id=year]").val(item);document.getElementById("year").onchange()}})}})}});function populateHistory(){nextKey=arr[0];if(typeof nextKey!=="undefined"){historyCount=parseInt(nextKey)+1}arr.forEach(function(c){var a=JSON.parse(window.localStorage.getItem(c));var d=historyTable.insertRow(-1),b=d.insertCell(0),e=d.insertCell(1);home=d.insertCell(2),destination=d.insertCell(3),date=d.insertCell(4),time=d.insertCell(5),run=d.insertCell(6),b.innerHTML='<span id="minusButton" class="glyphicon glyphicon-minus minusBtn blue"></span>';e.innerHTML="<strong>"+a[0]+"</strong>";home.innerHTML=a[1];destination.innerHTML=a[2];date.innerHTML=a[3];time.innerHTML=a[4];run.innerHTML=a[5]});$("#historyTable tbody tr td:nth-child(2)").each(function(){totalHistoryCost=totalHistoryCost+parseFloat($(this).text().split("$")[1])});document.getElementById("totalHistory").innerHTML="<h5>Total: <strong>$ "+Math.round(totalHistoryCost*100)/100+"</strong></h5>"}function deleteHistoryInit(){$(".minusBtn").click(function(){$(this).closest("tr").fadeOut(500,function(){var a=$(this).find("td:eq(6)").text();var b=JSON.parse(window.localStorage.getItem(a))[0];totalHistoryCost=totalHistoryCost-parseFloat(b.split("$")[1]);window.localStorage.removeItem(a);$("#totalHistory").fadeOut(200);document.getElementById("totalHistory").innerHTML="<h5>Total: <strong>$ "+Math.round(totalHistoryCost*100)/100+"</strong></h5>";$("#totalHistory").fadeIn(200)})})}$("#totalTripCostFlip").click(function(){if(document.getElementById("destinationInput").value===""){alert("Unable to get route.\nPlease enter a destination");return}else{if(document.getElementById("avgKml").innerHTML===""){alert("Unable to get vehicle mpg.\nPlease select a vehicle");return}}$("#totalTripCostPanel").slideDown("fast","linear",arrowChange("totalTripCost"));$("html, body").animate({scrollTop:$("#scrollMarker").offset().top},"fast");getDistance.directionInitialize()});$("#gasPrice").keypress(function(a){if((a.keyCode||a.which)==13){a.preventDefault();return false}});$("#addToHistory").click(function(){var h=new Date(),g="$"+Math.round(calculateCost.returnTotalCost()*100)/100,j=getCurrent.returnCurrentAddress(),a=input.value,e=h.toDateString(),b=getCurrent.returnTime(),f=historyCount;var d=[];d.push(g);d.push(j);d.push(a);d.push(e);d.push(b);d.push(f);window.localStorage.setItem(f,JSON.stringify(d));var f=historyCount;var i=historyTable.insertRow(1),k=i.insertCell(0),c=i.insertCell(1);home=i.insertCell(2),destination=i.insertCell(3),date=i.insertCell(4),time=i.insertCell(5);run=i.insertCell(6);k.innerHTML='<span id="minusButton" class="glyphicon glyphicon-minus minusBtn blue"></span>';var h=new Date();c.innerHTML="<strong>"+g+"</strong>";home.innerHTML=j;destination.innerHTML=a;date.innerHTML=e;time.innerHTML=b;run.innerHTML=f;$("#historyTable tr:eq(1)").fadeOut(100);$("#totalHistory").fadeOut(100);historyCount++;deleteHistoryInit();$("#dialogHistory").dialog("open").scrollTop(0,0);totalHistoryCost=totalHistoryCost+parseFloat(g.split("$")[1]);$("#historyTable tr:eq(1)").fadeIn(300);document.getElementById("totalHistory").innerHTML="<h5>Total: <strong>$ "+Math.round(totalHistoryCost*100)/100+"</strong></h5>";$("#totalHistory").fadeIn(1000)});function sortLocalStorageKeys(){for(key in localStorage){if(localStorage.hasOwnProperty(key)&&!isNaN(key)){arr.push(key)}}arr.sort(function(d,c){return c-d})}self={arrowChange:arrowChange,};exports=self;
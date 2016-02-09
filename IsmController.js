module.exports = {
 GetIsms : function GetIsms(req){
			return GetIsm(req.query.ismValue);
		},

 GetIsmPost : function GetIsmPost(req){
 			var formattedBody = FormatIsmMessage(req["item"]["message"]["message"]);
 			return GetIsm(formattedBody.trim());
 		}
}


function FormatIsmMessage(MessageToFormat)
{
	console.log("This is the value: " + MessageToFormat);
	var formattedString = MessageToFormat.replace("/ism", "");
	return formattedString;
}

function GetIsm(ismString)
{
	var fs = require("fs");
	var dataList = fs.readFileSync("./data/Isms.json", 'utf8', function(err, data){
		return data;
	});
	var dbIsm;
	dataList = JSON.parse(dataList);

	if(ismString == "")
	{
		return GetRandomIsm(dataList);
	}

	var isFound;
	for(var i in dataList){
	    dbIsm =  dataList[i];
	    var ismName = dbIsm["IsmName"];
		if(pickIsmByFirstMatch(ismName, ismString)){
			isFound = true;
			break;
		}
	}
	if(!isFound){
		dbIsm = GetRandomIsm(dataList);
	}
	return dbIsm;
}

function GetRandomIsm(list)
{
	var random = GetRandomAccessor(list.length);
	return list[random];
}

function GetRandomAccessor(count)
{
	return Math.floor(Math.random() * count);
}

function pickIsmByFirstMatch(currentIsm, ismString){
	if(currentIsm.toUpperCase().indexOf(ismString.toUpperCase()) > -1){
		return true;
	}
	return false;
}
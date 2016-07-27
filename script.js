window.addEventListener('load', function(){
	var messageBox= document.querySelector('.message');
	var keyBox= document.querySelector('.code');
	var encryptButton = document.querySelector('.cryptbut');
	var decryptbut = document.querySelector('.decryptbut');
	//I had to be careful to avoid using RegEx because they ruined everything.(update) they still ruin everything if
	//they're entered as a message.
	var Charindex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ','_','#',',','@',';'];
	var factors = [2,3,6,7,14];
	var charValue = 0;
	var factoredIndex = [];
	var factoredRotatedIndex = [];
	var factoredRotatedSlicedIndex =[];

encryptButton.addEventListener('click',function(){

	var encryption = keyBox.value;
	var message = messageBox.value;
	var rotateLength = encryption.length;
	document.querySelector('.encrypted').innerHTML = encrypt(message.toLowerCase(), encryption, rotateLength);
	reset();
})

decryptbut.addEventListener('click', function(){

	var encryption = keyBox.value;
	var message = messageBox.value;
	var rotateLength = encryption.length;
	document.querySelector('.encrypted').innerHTML = decrypt(decrypt(encrypt(message.toLowerCase(), encryption, rotateLength)));
	reset();
})



//This function takes a message and loops through it. At every step the loop checks the current character's
//position in the character index, it then replaces that character with the character at the same position
//in the factored/ rotated/ split index.
function encrypt(msg, encryp, rotate){
	split(encryp,rotate);
	var codedMsg = [];
	for(var i=0;i<msg.length;i++){
		
		
		if(Charindex.join('').indexOf(msg[i])>=0){
			var pos = Charindex.join('').indexOf(msg[i]);
			codedMsg.push(factoredRotatedSlicedIndex[pos])
		} else {
			codedMsg.push(msg[i])
		}
	}
	console.log("Factored/Rotated/sliced: ",factoredRotatedSlicedIndex);
	console.log("--------Character index: ",Charindex.join(''));
	return codedMsg.join('');
}
//This function does exactly the same thing as the encrypter, but it replaces the encrypted text
//with characters from the character index.
//--------------------fix---------------------
//if the encrypted letter is the same as what it's supposed to be then it's
//assigning it to the character in the charindex at the same position that it's at
function decrypt(msg){
	var decodedMsg = [];
	for(var i=0;i<msg.length;i++){
		if(factoredRotatedSlicedIndex.indexOf(msg[i])>=0){
			var pos = factoredRotatedSlicedIndex.indexOf(msg[i]);
			decodedMsg.push(Charindex[pos])
		} else {
			decodedMsg.push(msg[i])
		}
	}
	console.log("---Decrypt---")
	console.log("Factored/Rotated/sliced: ",factoredRotatedSlicedIndex);
	console.log("--------Character index: ",Charindex.join(''));
	return  decodedMsg.join('');
}


//Save the split factor of the Charindex
function split(encr, rotlngth){
	console.log("split function:", encr)
var userfactor = factors[encr.length%factors.length];

Charindex.map(function(item, index) {
	
	if(index%userfactor===0) { 
		//slicing the index into individual arrays of N(userFactor) length
		factoredIndex.push(Charindex.slice(index, index + userfactor).join(''));
		//rotate the segmented sections of the array N(length of encryption key) times
		factoredRotatedIndex = rotate(factoredIndex, rotlngth);			
	} 
})

factoredRotatedSlicedIndex = index_slice(encr);
}

//This function rotates the segments of the array N times.
//The rotations are based on the length of the encryption key.
function rotate( array , times ){
	var rotations = times;
  	array = array.slice();
  	while(rotations>0){
  	rotations--;
    var temp = array.shift();
    array.push(temp)
  		}
  	return array.join('');
	}
//This function adds up the character value of the encryption key, but finds the modulus
//of the the value. It then splits up the Factored/Rotated index at the adjusted character value
//and reverses the first half then combines the two sections into a new array.
function index_slice(arg){
	for (var i = arg.length - 1; i >= 0; i--) {
	charValue+= Charindex.join('').search(arg[i])
		};
		charValue=(charValue%42);
		console.log("Character value of passcode: ",charValue);
		var temp = factoredRotatedIndex.slice(0,charValue).split('').reverse().join('');
		var temp2 = factoredRotatedIndex.slice(charValue, factoredRotatedIndex.length);
		console.log("temp: ",temp.length);
		console.log("temp2: ", temp2.length);

	   return temp2.concat(temp);
	}


function reset(){
	 keyBox.value= '';
	 messageBox.value='';
	 charValue = 0;
	 factoredIndex = [];
	 factoredRotatedIndex = [];
	 factoredRotatedSlicedIndex =[];
	}
})
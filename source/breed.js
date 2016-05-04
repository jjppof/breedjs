String.prototype.breedReplaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

NodeList.prototype.innerTextAll = function(){
	var target = this;
	var innerText = "";
	for(inner_key in target){
		innerText += target[inner_key].innerText ? target[inner_key].innerText : "";
	}
	return innerText;
}

Object.defineProperty(Object.prototype, "breedWatch", {
	  enumerable: false
	, configurable: true
	, writable: false
	, value: function (prop, handler) {
		var
		  oldval = this[prop]
		, newval = oldval
		, getter = function () {
			return newval;
		}
		, setter = function (val) {
			oldval = newval;
			return newval = handler.call(this, prop, oldval, val);
		}
		;
		
		if (delete this[prop]) {
			Object.defineProperty(this, prop, {
				  get: getter
				, set: setter
				, enumerable: true
				, configurable: true
			});
		}
	}
});

function breedIsNumber(obj) { 
	return !isNaN(parseFloat(obj)) 
}

function breedSorterTypeChecker(a, b){
	if(!breedIsNumber(a) || !breedIsNumber(b))
		return String(a).localeCompare(String(b));
	else
		return parseFloat(a) - parseFloat(b);
}

var breed_temp = {};

var breed_error = {
	command_syntax : new Error('Check your breed command syntax.'),
	command_invalid : new Error('Not a valid breed command.'),
	expression_eval: new Error('Check your expression'),
	field_key_not_equal: new Error('Field and Key input have to be the same length')
}

var breed_const = {
	latin_map : {"Á":"A","Ă":"A","Ắ":"A","Ặ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ǎ":"A","Â":"A","Ấ":"A","Ậ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ä":"A","Ǟ":"A","Ȧ":"A","Ǡ":"A","Ạ":"A","Ȁ":"A","À":"A","Ả":"A","Ȃ":"A","Ā":"A","Ą":"A","Å":"A","Ǻ":"A","Ḁ":"A","Ⱥ":"A","Ã":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ḃ":"B","Ḅ":"B","Ɓ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ć":"C","Č":"C","Ç":"C","Ḉ":"C","Ĉ":"C","Ċ":"C","Ƈ":"C","Ȼ":"C","Ď":"D","Ḑ":"D","Ḓ":"D","Ḋ":"D","Ḍ":"D","Ɗ":"D","Ḏ":"D","ǲ":"D","ǅ":"D","Đ":"D","Ƌ":"D","Ǳ":"DZ","Ǆ":"DZ","É":"E","Ĕ":"E","Ě":"E","Ȩ":"E","Ḝ":"E","Ê":"E","Ế":"E","Ệ":"E","Ề":"E","Ể":"E","Ễ":"E","Ḙ":"E","Ë":"E","Ė":"E","Ẹ":"E","Ȅ":"E","È":"E","Ẻ":"E","Ȇ":"E","Ē":"E","Ḗ":"E","Ḕ":"E","Ę":"E","Ɇ":"E","Ẽ":"E","Ḛ":"E","Ꝫ":"ET","Ḟ":"F","Ƒ":"F","Ǵ":"G","Ğ":"G","Ǧ":"G","Ģ":"G","Ĝ":"G","Ġ":"G","Ɠ":"G","Ḡ":"G","Ǥ":"G","Ḫ":"H","Ȟ":"H","Ḩ":"H","Ĥ":"H","Ⱨ":"H","Ḧ":"H","Ḣ":"H","Ḥ":"H","Ħ":"H","Í":"I","Ĭ":"I","Ǐ":"I","Î":"I","Ï":"I","Ḯ":"I","İ":"I","Ị":"I","Ȉ":"I","Ì":"I","Ỉ":"I","Ȋ":"I","Ī":"I","Į":"I","Ɨ":"I","Ĩ":"I","Ḭ":"I","Ꝺ":"D","Ꝼ":"F","Ᵹ":"G","Ꞃ":"R","Ꞅ":"S","Ꞇ":"T","Ꝭ":"IS","Ĵ":"J","Ɉ":"J","Ḱ":"K","Ǩ":"K","Ķ":"K","Ⱪ":"K","Ꝃ":"K","Ḳ":"K","Ƙ":"K","Ḵ":"K","Ꝁ":"K","Ꝅ":"K","Ĺ":"L","Ƚ":"L","Ľ":"L","Ļ":"L","Ḽ":"L","Ḷ":"L","Ḹ":"L","Ⱡ":"L","Ꝉ":"L","Ḻ":"L","Ŀ":"L","Ɫ":"L","ǈ":"L","Ł":"L","Ǉ":"LJ","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ń":"N","Ň":"N","Ņ":"N","Ṋ":"N","Ṅ":"N","Ṇ":"N","Ǹ":"N","Ɲ":"N","Ṉ":"N","Ƞ":"N","ǋ":"N","Ñ":"N","Ǌ":"NJ","Ó":"O","Ŏ":"O","Ǒ":"O","Ô":"O","Ố":"O","Ộ":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ö":"O","Ȫ":"O","Ȯ":"O","Ȱ":"O","Ọ":"O","Ő":"O","Ȍ":"O","Ò":"O","Ỏ":"O","Ơ":"O","Ớ":"O","Ợ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ȏ":"O","Ꝋ":"O","Ꝍ":"O","Ō":"O","Ṓ":"O","Ṑ":"O","Ɵ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Õ":"O","Ṍ":"O","Ṏ":"O","Ȭ":"O","Ƣ":"OI","Ꝏ":"OO","Ɛ":"E","Ɔ":"O","Ȣ":"OU","Ṕ":"P","Ṗ":"P","Ꝓ":"P","Ƥ":"P","Ꝕ":"P","Ᵽ":"P","Ꝑ":"P","Ꝙ":"Q","Ꝗ":"Q","Ŕ":"R","Ř":"R","Ŗ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ȑ":"R","Ȓ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꜿ":"C","Ǝ":"E","Ś":"S","Ṥ":"S","Š":"S","Ṧ":"S","Ş":"S","Ŝ":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṩ":"S","Ť":"T","Ţ":"T","Ṱ":"T","Ț":"T","Ⱦ":"T","Ṫ":"T","Ṭ":"T","Ƭ":"T","Ṯ":"T","Ʈ":"T","Ŧ":"T","Ɐ":"A","Ꞁ":"L","Ɯ":"M","Ʌ":"V","Ꜩ":"TZ","Ú":"U","Ŭ":"U","Ǔ":"U","Û":"U","Ṷ":"U","Ü":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ǖ":"U","Ṳ":"U","Ụ":"U","Ű":"U","Ȕ":"U","Ù":"U","Ủ":"U","Ư":"U","Ứ":"U","Ự":"U","Ừ":"U","Ử":"U","Ữ":"U","Ȗ":"U","Ū":"U","Ṻ":"U","Ų":"U","Ů":"U","Ũ":"U","Ṹ":"U","Ṵ":"U","Ꝟ":"V","Ṿ":"V","Ʋ":"V","Ṽ":"V","Ꝡ":"VY","Ẃ":"W","Ŵ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẁ":"W","Ⱳ":"W","Ẍ":"X","Ẋ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ẏ":"Y","Ỵ":"Y","Ỳ":"Y","Ƴ":"Y","Ỷ":"Y","Ỿ":"Y","Ȳ":"Y","Ɏ":"Y","Ỹ":"Y","Ź":"Z","Ž":"Z","Ẑ":"Z","Ⱬ":"Z","Ż":"Z","Ẓ":"Z","Ȥ":"Z","Ẕ":"Z","Ƶ":"Z","Ĳ":"IJ","Œ":"OE","ᴀ":"A","ᴁ":"AE","ʙ":"B","ᴃ":"B","ᴄ":"C","ᴅ":"D","ᴇ":"E","ꜰ":"F","ɢ":"G","ʛ":"G","ʜ":"H","ɪ":"I","ʁ":"R","ᴊ":"J","ᴋ":"K","ʟ":"L","ᴌ":"L","ᴍ":"M","ɴ":"N","ᴏ":"O","ɶ":"OE","ᴐ":"O","ᴕ":"OU","ᴘ":"P","ʀ":"R","ᴎ":"N","ᴙ":"R","ꜱ":"S","ᴛ":"T","ⱻ":"E","ᴚ":"R","ᴜ":"U","ᴠ":"V","ᴡ":"W","ʏ":"Y","ᴢ":"Z","á":"a","ă":"a","ắ":"a","ặ":"a","ằ":"a","ẳ":"a","ẵ":"a","ǎ":"a","â":"a","ấ":"a","ậ":"a","ầ":"a","ẩ":"a","ẫ":"a","ä":"a","ǟ":"a","ȧ":"a","ǡ":"a","ạ":"a","ȁ":"a","à":"a","ả":"a","ȃ":"a","ā":"a","ą":"a","ᶏ":"a","ẚ":"a","å":"a","ǻ":"a","ḁ":"a","ⱥ":"a","ã":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ḃ":"b","ḅ":"b","ɓ":"b","ḇ":"b","ᵬ":"b","ᶀ":"b","ƀ":"b","ƃ":"b","ɵ":"o","ć":"c","č":"c","ç":"c","ḉ":"c","ĉ":"c","ɕ":"c","ċ":"c","ƈ":"c","ȼ":"c","ď":"d","ḑ":"d","ḓ":"d","ȡ":"d","ḋ":"d","ḍ":"d","ɗ":"d","ᶑ":"d","ḏ":"d","ᵭ":"d","ᶁ":"d","đ":"d","ɖ":"d","ƌ":"d","ı":"i","ȷ":"j","ɟ":"j","ʄ":"j","ǳ":"dz","ǆ":"dz","é":"e","ĕ":"e","ě":"e","ȩ":"e","ḝ":"e","ê":"e","ế":"e","ệ":"e","ề":"e","ể":"e","ễ":"e","ḙ":"e","ë":"e","ė":"e","ẹ":"e","ȅ":"e","è":"e","ẻ":"e","ȇ":"e","ē":"e","ḗ":"e","ḕ":"e","ⱸ":"e","ę":"e","ᶒ":"e","ɇ":"e","ẽ":"e","ḛ":"e","ꝫ":"et","ḟ":"f","ƒ":"f","ᵮ":"f","ᶂ":"f","ǵ":"g","ğ":"g","ǧ":"g","ģ":"g","ĝ":"g","ġ":"g","ɠ":"g","ḡ":"g","ᶃ":"g","ǥ":"g","ḫ":"h","ȟ":"h","ḩ":"h","ĥ":"h","ⱨ":"h","ḧ":"h","ḣ":"h","ḥ":"h","ɦ":"h","ẖ":"h","ħ":"h","ƕ":"hv","í":"i","ĭ":"i","ǐ":"i","î":"i","ï":"i","ḯ":"i","ị":"i","ȉ":"i","ì":"i","ỉ":"i","ȋ":"i","ī":"i","į":"i","ᶖ":"i","ɨ":"i","ĩ":"i","ḭ":"i","ꝺ":"d","ꝼ":"f","ᵹ":"g","ꞃ":"r","ꞅ":"s","ꞇ":"t","ꝭ":"is","ǰ":"j","ĵ":"j","ʝ":"j","ɉ":"j","ḱ":"k","ǩ":"k","ķ":"k","ⱪ":"k","ꝃ":"k","ḳ":"k","ƙ":"k","ḵ":"k","ᶄ":"k","ꝁ":"k","ꝅ":"k","ĺ":"l","ƚ":"l","ɬ":"l","ľ":"l","ļ":"l","ḽ":"l","ȴ":"l","ḷ":"l","ḹ":"l","ⱡ":"l","ꝉ":"l","ḻ":"l","ŀ":"l","ɫ":"l","ᶅ":"l","ɭ":"l","ł":"l","ǉ":"lj","ſ":"s","ẜ":"s","ẛ":"s","ẝ":"s","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ᵯ":"m","ᶆ":"m","ń":"n","ň":"n","ņ":"n","ṋ":"n","ȵ":"n","ṅ":"n","ṇ":"n","ǹ":"n","ɲ":"n","ṉ":"n","ƞ":"n","ᵰ":"n","ᶇ":"n","ɳ":"n","ñ":"n","ǌ":"nj","ó":"o","ŏ":"o","ǒ":"o","ô":"o","ố":"o","ộ":"o","ồ":"o","ổ":"o","ỗ":"o","ö":"o","ȫ":"o","ȯ":"o","ȱ":"o","ọ":"o","ő":"o","ȍ":"o","ò":"o","ỏ":"o","ơ":"o","ớ":"o","ợ":"o","ờ":"o","ở":"o","ỡ":"o","ȏ":"o","ꝋ":"o","ꝍ":"o","ⱺ":"o","ō":"o","ṓ":"o","ṑ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","õ":"o","ṍ":"o","ṏ":"o","ȭ":"o","ƣ":"oi","ꝏ":"oo","ɛ":"e","ᶓ":"e","ɔ":"o","ᶗ":"o","ȣ":"ou","ṕ":"p","ṗ":"p","ꝓ":"p","ƥ":"p","ᵱ":"p","ᶈ":"p","ꝕ":"p","ᵽ":"p","ꝑ":"p","ꝙ":"q","ʠ":"q","ɋ":"q","ꝗ":"q","ŕ":"r","ř":"r","ŗ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ȑ":"r","ɾ":"r","ᵳ":"r","ȓ":"r","ṟ":"r","ɼ":"r","ᵲ":"r","ᶉ":"r","ɍ":"r","ɽ":"r","ↄ":"c","ꜿ":"c","ɘ":"e","ɿ":"r","ś":"s","ṥ":"s","š":"s","ṧ":"s","ş":"s","ŝ":"s","ș":"s","ṡ":"s","ṣ":"s","ṩ":"s","ʂ":"s","ᵴ":"s","ᶊ":"s","ȿ":"s","ɡ":"g","ᴑ":"o","ᴓ":"o","ᴝ":"u","ť":"t","ţ":"t","ṱ":"t","ț":"t","ȶ":"t","ẗ":"t","ⱦ":"t","ṫ":"t","ṭ":"t","ƭ":"t","ṯ":"t","ᵵ":"t","ƫ":"t","ʈ":"t","ŧ":"t","ᵺ":"th","ɐ":"a","ᴂ":"ae","ǝ":"e","ᵷ":"g","ɥ":"h","ʮ":"h","ʯ":"h","ᴉ":"i","ʞ":"k","ꞁ":"l","ɯ":"m","ɰ":"m","ᴔ":"oe","ɹ":"r","ɻ":"r","ɺ":"r","ⱹ":"r","ʇ":"t","ʌ":"v","ʍ":"w","ʎ":"y","ꜩ":"tz","ú":"u","ŭ":"u","ǔ":"u","û":"u","ṷ":"u","ü":"u","ǘ":"u","ǚ":"u","ǜ":"u","ǖ":"u","ṳ":"u","ụ":"u","ű":"u","ȕ":"u","ù":"u","ủ":"u","ư":"u","ứ":"u","ự":"u","ừ":"u","ử":"u","ữ":"u","ȗ":"u","ū":"u","ṻ":"u","ų":"u","ᶙ":"u","ů":"u","ũ":"u","ṹ":"u","ṵ":"u","ᵫ":"ue","ꝸ":"um","ⱴ":"v","ꝟ":"v","ṿ":"v","ʋ":"v","ᶌ":"v","ⱱ":"v","ṽ":"v","ꝡ":"vy","ẃ":"w","ŵ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẁ":"w","ⱳ":"w","ẘ":"w","ẍ":"x","ẋ":"x","ᶍ":"x","ý":"y","ŷ":"y","ÿ":"y","ẏ":"y","ỵ":"y","ỳ":"y","ƴ":"y","ỷ":"y","ỿ":"y","ȳ":"y","ẙ":"y","ɏ":"y","ỹ":"y","ź":"z","ž":"z","ẑ":"z","ʑ":"z","ⱬ":"z","ż":"z","ẓ":"z","ȥ":"z","ẕ":"z","ᵶ":"z","ᶎ":"z","ʐ":"z","ƶ":"z","ɀ":"z","ﬀ":"ff","ﬃ":"ffi","ﬄ":"ffl","ﬁ":"fi","ﬂ":"fl","ĳ":"ij","œ":"oe","ﬆ":"st","ₐ":"a","ₑ":"e","ᵢ":"i","ⱼ":"j","ₒ":"o","ᵣ":"r","ᵤ":"u","ᵥ":"v","ₓ":"x"},
	command_list: {
		"b-loop" : {
			regex: /([\S^']*) in ([\S^']*)/i,
			action: function(data, input, scope){
				var node_finder = "[b-scope='" + scope + "']";
				var node = $(node_finder);
				var parent = node.parent();
				var node_base = node.clone();
				$(node_base[0].attributes).each(function(){
					if(this.nodeName.startsWith('b-') && this.nodeName != "b-scope")
						node_base.removeAttr(this.nodeName);
				});
				var target = data[2];
				var lambda = data[1];
				var counter = input[target].length - 1;
				for(item in input[target].reverse()){
					var value = input[target][item];
					var clone = node_base.clone();
					$(clone[0].attributes).each(function(){
						var attr_value = clone.attr(this.nodeName);
						var attr_matches = attr_value.match(/\{{(.*?)\}}/g);
						for(index in attr_matches){
							if(attr_matches[index].startsWith('{{') && attr_matches[index].endsWith('}}')){
								try {
									attr_matches[index] = eval(attr_matches[index].breedReplaceAll('#index', 'counter').breedReplaceAll(lambda + '\\.', 'input[target][item].').breedReplaceAll('#', 'input.'));
								} catch(e){
									attr_matches[index] = "";
									throw breed_error.expression_eval;
								} finally{
									attr_matches[index] = typeof attr_matches[index] === 'string' ? attr_matches[index].replace(/\$/g, "$$$") : attr_matches[index];
									attr_value = attr_value.replace(/\{{(.*?)\}}/i, attr_matches[index]);
								}
							}
						}
						clone.attr(this.nodeName, attr_value);
					});
					var html_value = clone.html();
					var html_matches = html_value.match(/\{{(.*?)\}}/g);
					for(index in html_matches){
						if(html_matches[index].startsWith('{{') && html_matches[index].endsWith('}}')){
							try {
								html_matches[index] = eval(html_matches[index].breedReplaceAll('index', 'counter').breedReplaceAll(lambda + '\\.', 'input[target][item].').breedReplaceAll('#', 'input.'));
							} catch(e){
								html_matches[index] = "";
								throw breed_error.expression_eval;
							} finally{
								html_matches[index] = html_matches[index] ? html_matches[index].toString().replace(/\$/g, "$$$") : html_matches[index];
								html_value = html_value.replace(/\{{(.*?)\}}/i, html_matches[index]);
							}
						}
					}
					clone.html(html_value);
					clone.insertAfter(node_finder + ":first");
					counter--;
				}
			}
		},
		"b-paginate": {
			regex: /(^\d+$)/i,
			action: function(data, input, scope){
				var node_finder = "[b-scope='" + scope + "']";
				var page_length = parseFloat(data[1]);
				breed_temp[scope].page_length = page_length;
				breed_temp[scope].actual_page = 1;
				breed_temp[scope].paginating = true;
				var nodes = $(node_finder);
				nodes.each(function(index){
					if(index < page_length)
						$(this).show();
					else
						$(this).hide();
				});
			}
		}
	}
}
var breed = {
	setDefaultScope: function(scope){
		breed_temp.defaultScope = scope;
	},
	run: function(obj){
		var scope = obj.scope ? obj.scope : breed_temp.defaultScope;
		var input = obj.input;
		breed_temp[scope] = {
			breedsortend: typeof obj.sortEnd === 'undefined' ? null : obj.sortEnd,
			breedfilterend: typeof obj.filterEnd === 'undefined' ? null : obj.filterEnd,
			breedpaginationend: typeof obj.pageChangeEnd === 'undefined' ? null : obj.pageChangeEnd,
			paginating: false,
			filtered: []
		};
		var node_finder = "[b-scope='" + scope + "']";
		var node = $(node_finder);
		for(command in breed_const.command_list){
			var command_instruction = node.attr(command);
			if(command_instruction){
				var action_match = command_instruction.trim().match(breed_const.command_list[command].regex);
				breed_const.command_list[command].action(action_match, input, scope);
				node.remove();
			}
		}
		breed_temp[scope].filtered = $(node_finder);
		try{
			if(obj.runEnd)
				obj.runEnd();
		} catch(e){
			throw e;
		}
	},
	sort: function(obj){
		var scope = obj.scope ? obj.scope : breed_temp.defaultScope;
		var rule = typeof obj.rule === 'undefined' ? false : obj.rule;
		var reverse = typeof obj.reverse === 'undefined' ? false : obj.reverse;
		var attribute = typeof obj.selector === 'undefined' ? false : obj.selector;
		var node_finder = "[b-scope='" + scope + "']";
		var nodes = breed_temp[scope].filtered;
		var parent = nodes.parent();
		nodes.remove();
		if(rule){
			if(reverse){
				if(attribute){
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(rule(b.querySelector("[b-sort='" + attribute + "']").innerText), rule(a.querySelector("[b-sort='" + attribute + "']").innerText));
					});
				} else{
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(rule(b.innerText), rule(a.innerText));
					});
				}
			} else{
				if(attribute){
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(rule(a.querySelector("[b-sort='" + attribute + "']").innerText), rule(b.querySelector("[b-sort='" + attribute + "']").innerText));
					});
				} else{
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(rule(a.innerText), rule(b.innerText));
					});
				}
			}
		} else{
			if(reverse){
				if(attribute){
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(b.querySelector("[b-sort='" + attribute + "']").innerText, a.querySelector("[b-sort='" + attribute + "']").innerText);
					});
				} else{
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(b.innerText, a.innerText);
					});
				}
			} else{
				if(attribute){
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(a.querySelector("[b-sort='" + attribute + "']").innerText, b.querySelector("[b-sort='" + attribute + "']").innerText);
					});
				} else{
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(a.innerText, b.innerText);
					});
				}
			}
		}
		parent.append(nodes);
		if(breed_temp[scope].paginating){
			breed.paginate({
				scope: scope,
			});
		}
		try{
			if(breed_temp[scope].breedsortend)
				breed_temp[scope].breedsortend();
		} catch(e){
			throw e;
		}
	},
	sortAttr: function(obj){
		var scope = obj.scope ? obj.scope : breed_temp.defaultScope;
		var attr = obj.attr;
		var rule = typeof obj.rule === 'undefined' ? false : obj.rule;
		var reverse = typeof obj.reverse === 'undefined' ? false : obj.reverse;
		var selector = typeof obj.selector === 'undefined' ? false : obj.selector;
		var node_finder = "[b-scope='" + scope + "']";
		var nodes = breed_temp[scope].filtered;
		var parent = nodes.parent();
		nodes.remove();
		if(rule){
			if(reverse){
				if(selector){
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(rule(b.querySelector("[b-sort='" + selector + "']").getAttribute(attr)), rule(a.querySelector("[b-sort='" + selector + "']").getAttribute(attr)));
					});
				} else{
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(rule(b.getAttribute(attr)), rule(a.getAttribute(attr)));
					});
				}
			} else{
				if(selector){
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(rule(a.querySelector("[b-sort='" + selector + "']").getAttribute(attr)), rule(b.querySelector("[b-sort='" + selector + "']").getAttribute(attr)));
					});
				} else{
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(rule(a.getAttribute(attr)), rule(b.getAttribute(attr)));
					});
				}
			}
		} else{
			if(reverse){
				if(selector){
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(b.querySelector("[b-sort='" + selector + "']").getAttribute(attr), a.querySelector("[b-sort='" + selector + "']").getAttribute(attr));
					});
				} else{
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(b.getAttribute(attr), a.getAttribute(attr));
					});
				}
			} else{
				if(selector){
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(a.querySelector("[b-sort='" + selector + "']").getAttribute(attr), b.querySelector("[b-sort='" + selector + "']").getAttribute(attr));
					});
				} else{
					nodes.sort(function(a, b){
						return breedSorterTypeChecker(a.getAttribute(attr), b.getAttribute(attr));
					});
				}
			}
		}
		parent.append(nodes);
		if(breed_temp[scope].paginating){
			breed.paginate({
				scope: scope,
			});
		}
		try{
			if(breed_temp[scope].breedsortend)
				breed_temp[scope].breedsortend();
		} catch(e){
			throw e;
		}
	},
	filter: function(obj){
		var scope = obj.scope ? obj.scope : breed_temp.defaultScope;
		var key = typeof obj.key === 'undefined' ? [""] : obj.key;
		key = key instanceof Array ? key : [key];
		var exclusion = typeof obj.exclusion === 'undefined' ? false : obj.exclusion;
		var sensitive = typeof obj.sensitive === 'undefined' ? false : obj.sensitive;
		var rule = typeof obj.rule === 'undefined' ? [false] : obj.rule;
		rule = rule instanceof Array ? rule : [rule];
		if(rule[0] || rule.length > 1){
			for(i in rule){
				if(typeof rule[i] !== 'function'){
					var str = rule[i];
					rule[i] = function(string, key) {
						if(sensitive)
							return key.indexOf(string) > -1;
						else
							return key.toLowerCase().indexOf(string.toLowerCase()) > -1; 
					}.bind(this, str);
				}
			}
		}
		var field = typeof obj.field === 'undefined' ? [""] : obj.field;
		field = field instanceof Array ? field : [field];
		var node_finder = "[b-scope='" + scope + "']";
		var nodes = $(node_finder);
		nodes.hide()
		if(exclusion){
			if(rule[0]){
				if(field[0]){
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in field){
							bool = bool && !rule[i](nodes[index].querySelector("[b-filter='" + field[i] + "']").innerText);
						}
						return bool;
					});
				} else{
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in rule){
							bool = bool && !rule[i](nodes[index].innerText);
						}
						return bool;
					});
				}
			} else{
				if(field[0]){
					if(sensitive){
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !(nodes[index].querySelector("[b-filter='" + field[i] + "']").innerText.indexOf(key[i]) > -1);
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !(nodes[index].querySelector("[b-filter='" + field[i] + "']").innerText.toLowerCase().indexOf(key[i].toLowerCase()) > -1);
							}
							return bool;
						});
					}
				} else{
					if(sensitive){
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !(nodes[index].innerText.indexOf(key[i]) > -1);
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !(nodes[index].innerText.toLowerCase().indexOf(key[i].toLowerCase()) > -1);
							}
							return bool;
						});
					}
				}
			}
		} else{
			if(rule[0]){
				if(field[0]){
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in field){
							bool = bool && rule[i](nodes[index].querySelector("[b-filter='" + field[i] + "']").innerText);
						}
						return bool;
					});
				} else{
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in rule){
							bool = bool && rule[i](nodes[index].innerText);
						}
						return bool;
					});
				}
			} else{
				if(field[0]){
					if(sensitive){
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && nodes[index].querySelector("[b-filter='" + field[i] + "']").innerText.indexOf(key[i]) > -1;
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && nodes[index].querySelector("[b-filter='" + field[i] + "']").innerText.toLowerCase().indexOf(key[i].toLowerCase()) > -1;
							}
							return bool;
						});
					}
				} else{
					if(sensitive){
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								return nodes[index].innerText.indexOf(key[i]) > -1;
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								return nodes[index].innerText.toLowerCase().indexOf(key[i].toLowerCase()) > -1;
							}
							return bool;
						});
					}
				}
			}
		}
		breed_temp[scope].filtered = nodes;
		if(breed_temp[scope].paginating){
			breed.paginate({
				scope: scope,
				page: 1
			});
		} else
			nodes.show();
		try{
			if(breed_temp[scope].breedfilterend)
				breed_temp[scope].breedfilterend();
		} catch(e){
			throw e;
		}
	},
	filterAttr: function(obj){
		var scope = obj.scope ? obj.scope : breed_temp.defaultScope;
		var key = typeof obj.key === 'undefined' ? [""] : obj.key;
		key = key instanceof Array ? key : [key];
		var attr = obj.attr;
		var rule = typeof obj.rule === 'undefined' ? [false] : obj.rule;
		var exclusion = typeof obj.exclusion === 'undefined' ? false : obj.exclusion;
		var sensitive = typeof obj.sensitive === 'undefined' ? false : obj.sensitive;
		rule = rule instanceof Array ? rule : [rule];
		if(rule[0] || rule.length > 1){
			for(i in rule){
				if(typeof rule[i] !== 'function'){
					var str = rule[i];
					rule[i] = function(string, key) {
						if(sensitive)
							return key.indexOf(string) > -1;
						else
							return key.toLowerCase().indexOf(string.toLowerCase()) > -1; 
					}.bind(this, str);
				}
			}
		}
		var field = typeof obj.field === 'undefined' ? [""] : obj.field;
		field = field instanceof Array ? field : [field];
		var node_finder = "[b-scope='" + scope + "']";
		var nodes = $(node_finder);
		nodes.hide()
		if(exclusion){
			if(rule[0]){
				if(field[0]){
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in field){
							bool = bool && !rule[i](nodes[index].querySelector("[b-filter='" + field[i] + "']").getAttribute(attr));
						}
						return bool;
					});
				} else{
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in rule){
							bool = bool && !rule[i](nodes[index].getAttribute(attr));
						}
						return bool;
					});
				}
			} else{
				if(field[0]){
					if(sensitive){
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !(nodes[index].querySelector("[b-filter='" + field[i] + "']").getAttribute(attr).indexOf(key[i]) > -1);
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !(nodes[index].querySelector("[b-filter='" + field[i] + "']:first").getAttribute(attr).toLowerCase().indexOf(key[i].toLowerCase()) > -1);
							}
							return bool;
						});
					}
				} else{
					if(sensitive){
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !(nodes[index].getAttribute(attr).indexOf(key[i]) > -1);
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !(nodes[index].getAttribute(attr).toLowerCase().indexOf(key[i].toLowerCase()) > -1);
							}
							return bool;
						});
					}
				}
			}
		} else{
			if(rule[0]){
				if(field[0]){
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in field){
							bool = bool && rule[i](nodes[index].querySelector("[b-filter='" + field[i] + "']").getAttribute(attr));
						}
						return bool;
					});
				} else{
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in rule){
							bool = bool && rule[i](nodes[index].getAttribute(attr));
						}
						return bool;
					});
				}
			} else{
				if(field[0]){
					if(sensitive){
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && nodes[index].querySelector("[b-filter='" + field[i] + "']").getAttribute(attr).indexOf(key[i]) > -1;
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && nodes[index].querySelector("[b-filter='" + field[i] + "']").getAttribute(attr).toLowerCase().indexOf(key[i].toLowerCase()) > -1;
							}
							return bool;
						});
					}
				} else{
					if(sensitive){
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && nodes[index].getAttribute(attr).indexOf(key[i]) > -1;
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && nodes[index].getAttribute(attr).toLowerCase().indexOf(key[i].toLowerCase()) > -1;
							}
							return bool;
						});
					}
				}
			}
		}
		breed_temp[scope].filtered = nodes;
		if(breed_temp[scope].paginating){
			breed.paginate({
				scope: scope,
				page: 1
			});
		} else
			nodes.show();
		try{
			if(breed_temp[scope].breedfilterend)
				breed_temp[scope].breedfilterend();
		} catch(e){
			throw e;
		}
	},
	filterSelector: function(obj){
		var scope = obj.scope ? obj.scope : breed_temp.defaultScope;
		var key = typeof obj.key === 'undefined' ? [""] : obj.key;
		key = key instanceof Array ? key : [key];
		var selector = obj.selector;
		var exclusion = typeof obj.exclusion === 'undefined' ? false : obj.exclusion;
		var sensitive = typeof obj.sensitive === 'undefined' ? false : obj.sensitive;
		var rule = typeof obj.rule === 'undefined' ? [false] : obj.rule;
		rule = rule instanceof Array ? rule : [rule];
		if(rule[0] || rule.length > 1){
			for(i in rule){
				if(typeof rule[i] !== 'function'){
					var str = rule[i];
					rule[i] = function(string, key) {
						if(sensitive)
							return key.indexOf(string) > -1;
						else
							return key.toLowerCase().indexOf(string.toLowerCase()) > -1; 
					}.bind(this, str);
				}
			}
		}
		var node_finder = "[b-scope='" + scope + "']";
		var nodes = $(node_finder);
		nodes.hide()
		if(exclusion){
			if(rule[0]){
				nodes = nodes.filter(function(index){
					var bool = true;
					for(i in rule){
						bool = bool && !rule[i](nodes[index].querySelectorAll(selector).innerTextAll());
					}
					return bool;
				});
			} else{
				if(sensitive){
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in key){
							bool = bool && !(nodes[index].querySelectorAll(selector).innerTextAll().indexOf(key[i]) > -1);
						}
						return bool;
					});
				} else{
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in key){
							bool = bool && !(nodes[index].querySelectorAll(selector).innerTextAll().toLowerCase().indexOf(key[i].toLowerCase()) > -1);
						}
						return bool;
					});
				}
			}
		} else{
			if(rule[0]){
				nodes = nodes.filter(function(index){
					var bool = true;
					for(i in rule){
						bool = bool && rule[i](nodes[index].querySelectorAll(selector).innerTextAll());
					}
					return bool;
				});
			} else{
				if(sensitive){
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in key){
							bool = bool && nodes[index].querySelectorAll(selector).innerTextAll().indexOf(key[i]) > -1;
						}
						return bool;
					});
				} else{
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in key){
							bool = bool && nodes[index].querySelectorAll(selector).innerTextAll().toLowerCase().indexOf(key[i].toLowerCase()) > -1;
						}
						return bool;
					});
				}
			}
		}
		breed_temp[scope].filtered = nodes;
		if(breed_temp[scope].paginating){
			breed.paginate({
				scope: scope,
				page: 1
			});
		} else
			nodes.show();
		try{
			if(breed_temp[scope].breedfilterend)
				breed_temp[scope].breedfilterend();
		} catch(e){
			throw e;
		}
	},
	paginate: function(obj){
		var scope = obj.scope ? obj.scope : breed_temp.defaultScope;
		var actual_page = typeof obj.page === 'undefined' ? breed_temp[scope].actual_page : obj.page;
		var page_length = typeof obj.page_length === 'undefined' ? breed_temp[scope].page_length : obj.page_length;
		breed_temp[scope].page_length = page_length;
		
		actual_page = actual_page == 'next' ? +breed_temp[scope].actual_page + 1 : actual_page;
		actual_page = actual_page == 'previous' ? breed_temp[scope].actual_page - 1 : actual_page;
		actual_page = actual_page < 1 ? 1 : actual_page;
		var page_count = Math.ceil(breed_temp[scope].filtered.length/breed_temp[scope].page_length);
		actual_page = actual_page > page_count ? page_count : actual_page;
		
		breed_temp[scope].actual_page = actual_page;
		var nodes = breed_temp[scope].filtered;
		var lower_limit = page_length * actual_page;
		var upper_limit = page_length * (actual_page - 1);
		nodes.each(function(index){
			if(index < lower_limit && index >= upper_limit)
				$(this).show();
			else
				this.style.display = 'none';
		});
		try{
			if(breed_temp[scope].breedpaginationend)
				breed_temp[scope].breedpaginationend();
		} catch(e){
			throw e;
		}
	},
	setPageLength: function(obj){
		var scope = obj.scope ? obj.scope : breed_temp.defaultScope;
		breed_temp[scope].page_length = obj.page_length;
		breed.paginate({
			scope: scope,
			page: 1
		});
	},
	getPageCount: function(scope){
		var scope = typeof scope !== 'undefined' ? scope : breed_temp.defaultScope;
		return Math.ceil(breed_temp[scope].filtered.length/breed_temp[scope].page_length);
	},
	getActualPage: function(scope){
		var scope = typeof scope !== 'undefined' ? scope : breed_temp.defaultScope;
		return breed_temp[scope].actual_page;
	},
	watch: function(variable, object){
		object = typeof object !== 'undefined' ? object : window;
		object.breedWatch(variable, function (id, oldval, newval) {
			$("b-var[var='" + variable + "']").html(newval);
		});
	},
	utils: {
		hasWord: function(key, str, sensitive){
			var re = new RegExp("\\b" + key + "\\b", "gi");
			if(typeof sensitive !== 'undefined'){
				re = sensitive ? new RegExp("\\b" + key + "\\b", "g") : re;
			}
			return str.search(re) > -1;
		},
		removeAccents : function(str){
			return str.replace(/[^A-Za-z0-9\[\] ]/g, function(a){
				return breed_const.latin_map[a]||a;
			});
		}
	}
}

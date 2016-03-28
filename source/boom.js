String.prototype.boomReplaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function boomIsNumber(obj) { 
	return !isNaN(parseFloat(obj)) 
}

function boomSorterTypeChecker(a, b){
	if(!boomIsNumber(a) || !boomIsNumber(b))
		return String(a).localeCompare(String(b));
	else
		return parseFloat(a) - parseFloat(b);
}

var boom_temp = {};

var boom_error = {
	command_syntax : new Error('Check your boom command syntax.'),
	command_invalid : new Error('Not a valid boom command.'),
	expression_eval: new Error('Check your expression'),
	field_key_not_equal: new Error('Field and Key input have to be the same length')
}

var boom_const = {
	command_priority: {
		loop: 1,
		paginate: 2
	},
	command_list: {
		"b-loop" : {
			regex: /([\S^']*) in ([\S^']*)/i,
			action: function(data, input, scope){
				var node_finder = "[b-scope='" + scope + "']";
				var node = $(node_finder);
				var parent = node.parent();
				var node_base = node.clone();
				$(node_base[0].attributes).each(function(){
					if(this.nodeName.startsWith('boom') && this.nodeName != "b-scope")
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
									attr_matches[index] = eval(attr_matches[index].boomReplaceAll('index', 'counter').boomReplaceAll(lambda, 'input[target][item]').boomReplaceAll('#', 'input.'));
								} catch(e){
									attr_matches[index] = "";
									throw boom_error.expression_eval;
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
								html_matches[index] = eval(html_matches[index].boomReplaceAll('index', 'counter').boomReplaceAll(lambda, 'input[target][item]').boomReplaceAll('#', 'input.'));
							} catch(e){
								html_matches[index] = "";
								throw boom_error.expression_eval;
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
				boom_temp[scope].page_length = page_length;
				boom_temp[scope].actual_page = 1;
				boom_temp[scope].paginating = true;
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
var boom = {
	setDefaultScope: function(scope){
		boom_temp.defaultScope = scope;
	},
	run: function(obj){
		var scope = obj.scope ? obj.scope : boom_temp.defaultScope;
		var input = obj.input;
		boom_temp[scope] = {
			boomsortend: typeof obj.sortEnd === 'undefined' ? null : obj.sortEnd,
			boomfilterend: typeof obj.filterEnd === 'undefined' ? null : obj.filterEnd,
			boompaginationend: typeof obj.pageChangeEnd === 'undefined' ? null : obj.pageChangeEnd,
			paginating: false,
			filtered: []
		};
		var node_finder = "[b-scope='" + scope + "']";
		var node = $(node_finder);
		for(command in boom_const.command_list){
			var command_instruction = node.attr(command);
			if(command_instruction){
				var action_match = command_instruction.trim().match(boom_const.command_list[command].regex);
				boom_const.command_list[command].action(action_match, input, scope);
				node.remove();
			}
		}
		boom_temp[scope].filtered = $(node_finder);
		try{
			if(obj.runEnd)
				obj.runEnd();
		} catch(e){
			throw e;
		}
	},
	sort: function(obj){
		var scope = obj.scope ? obj.scope : boom_temp.defaultScope;
		var rule = typeof obj.rule === 'undefined' ? false : obj.rule;
		var reverse = typeof obj.reverse === 'undefined' ? false : obj.reverse;
		var attribute = typeof obj.selector === 'undefined' ? false : obj.selector;
		var node_finder = "[b-scope='" + scope + "']";
		var nodes = boom_temp[scope].filtered;
		var parent = nodes.parent();
		nodes.remove();
		if(rule){
			if(reverse){
				if(attribute){
					nodes.sort(function(a, b){
						return boomSorterTypeChecker(rule($(b).find("[b-sort='" + attribute + "']:first").text()), rule($(a).find("[b-sort='" + attribute + "']:first").text()));
					});
				} else{
					nodes.sort(function(a, b){
						return boomSorterTypeChecker(rule($(b).text()), rule($(a).text()));
					});
				}
			} else{
				if(attribute){
					nodes.sort(function(a, b){
						return boomSorterTypeChecker(rule($(a).find("[b-sort='" + attribute + "']:first").text()), rule($(b).find("[b-sort='" + attribute + "']:first").text()));
					});
				} else{
					nodes.sort(function(a, b){
						return boomSorterTypeChecker(rule($(a).text()), rule($(b).text()));
					});
				}
			}
		} else{
			if(reverse){
				if(attribute){
					nodes.sort(function(a, b){
						return boomSorterTypeChecker($(b).find("[b-sort='" + attribute + "']:first").text(), $(a).find("[b-sort='" + attribute + "']:first").text());
					});
				} else{
					nodes.sort(function(a, b){
						return boomSorterTypeChecker($(b).text(), $(a).text());
					});
				}
			} else{
				if(attribute){
					nodes.sort(function(a, b){
						return boomSorterTypeChecker($(a).find("[b-sort='" + attribute + "']:first").text(), $(b).find("[b-sort='" + attribute + "']:first").text());
					});
				} else{
					nodes.sort(function(a, b){
						return boomSorterTypeChecker($(a).text(), $(b).text());
					});
				}
			}
		}
		parent.append(nodes);
		if(boom_temp[scope].paginating){
			boom.paginate({
				scope: scope,
			});
		}
		try{
			if(boom_temp[scope].boomsortend)
				boom_temp[scope].boomsortend();
		} catch(e){
			throw e;
		}
	},
	sortAttr: function(obj){
		var scope = obj.scope ? obj.scope : boom_temp.defaultScope;
		var attr = obj.attr;
		var rule = typeof obj.rule === 'undefined' ? false : obj.rule;
		var reverse = typeof obj.reverse === 'undefined' ? false : obj.reverse;
		var selector = typeof obj.selector === 'undefined' ? false : obj.selector;
		var node_finder = "[b-scope='" + scope + "']";
		var nodes = boom_temp[scope].filtered;
		var parent = nodes.parent();
		nodes.remove();
		if(rule){
			if(reverse){
				if(selector){
					nodes.sort(function(a, b){
						return boomSorterTypeChecker(rule($(b).find("[b-sort='" + selector + "']:first").attr(attr)), rule($(a).find("[b-sort='" + selector + "']:first").attr(attr)));
					});
				} else{
					nodes.sort(function(a, b){
						return boomSorterTypeChecker(rule($(b).attr(attr)), rule($(a).attr(attr)));
					});
				}
			} else{
				if(selector){
					nodes.sort(function(a, b){
						return boomSorterTypeChecker(rule($(a).find("[b-sort='" + selector + "']:first").attr(attr)), rule($(b).find("[b-sort='" + selector + "']:first").attr(attr)));
					});
				} else{
					nodes.sort(function(a, b){
						return boomSorterTypeChecker(rule($(a).attr(attr)), rule($(b).attr(attr)));
					});
				}
			}
		} else{
			if(reverse){
				if(selector){
					nodes.sort(function(a, b){
						return boomSorterTypeChecker($(b).find("[b-sort='" + selector + "']:first").attr(attr), $(a).find("[b-sort='" + selector + "']:first").attr(attr));
					});
				} else{
					nodes.sort(function(a, b){
						return boomSorterTypeChecker($(b).attr(attr), $(a).attr(attr));
					});
				}
			} else{
				if(selector){
					return boomSorterTypeChecker($(a).find("[b-sort='" + selector + "']:first").attr(attr), $(b).find("[b-sort='" + selector + "']:first").attr(attr));
				} else{
					nodes.sort(function(a, b){
						return boomSorterTypeChecker($(a).attr(attr), $(b).attr(attr));
					});
				}
			}
		}
		parent.append(nodes);
		if(boom_temp[scope].paginating){
			boom.paginate({
				scope: scope,
			});
		}
		try{
			if(boom_temp[scope].boomsortend)
				boom_temp[scope].boomsortend();
		} catch(e){
			throw e;
		}
	},
	filter: function(obj){
		var scope = obj.scope ? obj.scope : boom_temp.defaultScope;
		var key = typeof obj.key === 'undefined' ? [""] : obj.key;
		key = key instanceof Array ? key : [key];
		var rule = typeof obj.rule === 'undefined' ? [false] : obj.rule;
		rule = rule instanceof Array ? rule : [rule];
		if(rule[0]){
			for(i in rule){
				if(typeof rule[i] !== 'function'){
					var str = rule[i];
					rule[i] = function(key) { 
						return key.includes(str); 
					};
				}
			}
		}
		var field = typeof obj.field === 'undefined' ? [""] : obj.field;
		field = field instanceof Array ? field : [field];
		if(field.length != key.length){
			throw boom_error.field_key_not_equal;
			return;
		}
		var exclusion = typeof obj.exclusion === 'undefined' ? false : obj.exclusion;
		var sensitive = typeof obj.sensitive === 'undefined' ? false : obj.sensitive;
		var node_finder = "[b-scope='" + scope + "']";
		var nodes = $(node_finder);
		nodes.hide()
		if(exclusion){
			if(rule[0]){
				if(field[0]){
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in field){
							bool = bool && !rule[i]($(nodes[index]).find("[b-filter='" + field[i] + "']:first").text());
						}
						return bool;
					});
				} else{
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in rule){
							bool = bool && !rule[i]($(nodes[index]).text());
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
								bool = bool && !($(nodes[index]).find("[b-filter='" + field[i] + "']:first").text().indexOf(key[i]) > -1);
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !($(nodes[index]).find("[b-filter='" + field[i] + "']:first").text().toLowerCase().indexOf(key[i].toLowerCase()) > -1);
							}
							return bool;
						});
					}
				} else{
					if(sensitive){
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !($(nodes[index]).text().indexOf(key[i]) > -1);
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !($(nodes[index]).text().toLowerCase().indexOf(key[i].toLowerCase()) > -1);
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
							bool = bool && rule[i]($(nodes[index]).find("[b-filter='" + field[i] + "']:first").text());
						}
						return bool;
					});
				} else{
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in rule){
							bool = bool && rule[i]($(nodes[index]).text());
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
								bool = bool && $(nodes[index]).find("[b-filter='" + field[i] + "']:first").text().indexOf(key[i]) > -1;
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && $(nodes[index]).find("[b-filter='" + field[i] + "']:first").text().toLowerCase().indexOf(key[i].toLowerCase()) > -1;
							}
							return bool;
						});
					}
				} else{
					if(sensitive){
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								return $(nodes[index]).text().indexOf(key[i]) > -1;
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								return $(nodes[index]).text().toLowerCase().indexOf(key[i].toLowerCase()) > -1;
							}
							return bool;
						});
					}
				}
			}
		}
		boom_temp[scope].filtered = nodes;
		if(boom_temp[scope].paginating){
			boom.paginate({
				scope: scope,
				page: 1
			});
		} else
			nodes.show();
		try{
			if(boom_temp[scope].boomfilterend)
				boom_temp[scope].boomfilterend();
		} catch(e){
			throw e;
		}
	},
	filterAttr: function(obj){
		var scope = obj.scope ? obj.scope : boom_temp.defaultScope;
		var key = typeof obj.key === 'undefined' ? [""] : obj.key;
		key = key instanceof Array ? key : [key];
		var attr = obj.attr;
		var rule = typeof obj.rule === 'undefined' ? [false] : obj.rule;
		rule = rule instanceof Array ? rule : [rule];
		if(rule[0]){
			for(i in rule){
				if(typeof rule[i] !== 'function'){
					var str = rule[i];
					rule[i] = function(key) { 
						return key.includes(str); 
					};
				}
			}
		}
		var field = typeof obj.field === 'undefined' ? [""] : obj.field;
		field = field instanceof Array ? field : [field];
		if(field.length != key.length){
			throw boom_error.field_key_not_equal;
			return;
		}
		var exclusion = typeof obj.exclusion === 'undefined' ? false : obj.exclusion;
		var sensitive = typeof obj.sensitive === 'undefined' ? false : obj.sensitive;
		var node_finder = "[b-scope='" + scope + "']";
		var nodes = $(node_finder);
		nodes.hide()
		if(exclusion){
			if(rule[0]){
				if(field[0]){
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in field){
							bool = bool && !rule[i]($(nodes[index]).find("[b-filter='" + field[i] + "']:first").attr(attr));
						}
						return bool;
					});
				} else{
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in rule){
							bool = bool && !rule[i]($(nodes[index]).attr(attr));
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
								bool = bool && !($(nodes[index]).find("[b-filter='" + field[i] + "']:first").attr(attr).indexOf(key[i]) > -1);
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !($(nodes[index]).find("[b-filter='" + field[i] + "']:first").attr(attr).toLowerCase().indexOf(key[i].toLowerCase()) > -1);
							}
							return bool;
						});
					}
				} else{
					if(sensitive){
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !($(nodes[index]).attr(attr).indexOf(key[i]) > -1);
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && !($(nodes[index]).attr(attr).toLowerCase().indexOf(key[i].toLowerCase()) > -1);
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
							bool = bool && rule[i]($(nodes[index]).find("[b-filter='" + field[i] + "']:first").attr(attr));
						}
						return bool;
					});
				} else{
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in rule){
							bool = bool && rule[i]($(nodes[index]).attr(attr));
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
								bool = bool && $(nodes[index]).find("[b-filter='" + field[i] + "']:first").attr(attr).indexOf(key[i]) > -1;
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && $(nodes[index]).find("[b-filter='" + field[i] + "']:first").attr(attr).toLowerCase().indexOf(key[i].toLowerCase()) > -1;
							}
							return bool;
						});
					}
				} else{
					if(sensitive){
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && $(nodes[index]).attr(attr).indexOf(key[i]) > -1;
							}
							return bool;
						});
					} else{
						nodes = nodes.filter(function(index){
							var bool = true;
							for(i in key){
								bool = bool && $(nodes[index]).attr(attr).toLowerCase().indexOf(key[i].toLowerCase()) > -1;
							}
							return bool;
						});
					}
				}
			}
		}
		boom_temp[scope].filtered = nodes;
		if(boom_temp[scope].paginating){
			boom.paginate({
				scope: scope,
				page: 1
			});
		} else
			nodes.show();
		try{
			if(boom_temp[scope].boomfilterend)
				boom_temp[scope].boomfilterend();
		} catch(e){
			throw e;
		}
	},
	filterSelector: function(obj){
		var scope = obj.scope ? obj.scope : boom_temp.defaultScope;
		var key = typeof obj.key === 'undefined' ? [""] : obj.key;
		key = key instanceof Array ? key : [key];
		var selector = obj.selector;
		var rule = typeof obj.rule === 'undefined' ? [false] : obj.rule;
		rule = rule instanceof Array ? rule : [rule];
		if(rule[0]){
			for(i in rule){
				if(typeof rule[i] !== 'function'){
					var str = rule[i];
					rule[i] = function(key) { 
						return key.includes(str); 
					};
				}
			}
		}
		var exclusion = typeof obj.exclusion === 'undefined' ? false : obj.exclusion;
		var sensitive = typeof obj.sensitive === 'undefined' ? false : obj.sensitive;
		var node_finder = "[b-scope='" + scope + "']";
		var nodes = $(node_finder);
		nodes.hide()
		if(exclusion){
			if(rule[0]){
				nodes = nodes.filter(function(index){
					var bool = true;
					for(i in rule){
						bool = bool && !rule[i]($(nodes[index]).find(selector).text());
					}
					return bool;
				});
			} else{
				if(sensitive){
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in key){
							bool = bool && !($(nodes[index]).find(selector).text().indexOf(key[i]) > -1);
						}
						return bool;
					});
				} else{
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in key){
							bool = bool && !($(nodes[index]).find(selector).text().toLowerCase().indexOf(key[i].toLowerCase()) > -1);
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
						bool = bool && rule[i]($(nodes[index]).find(selector).text());
					}
					return bool;
				});
			} else{
				if(sensitive){
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in key){
							bool = bool && $(nodes[index]).find(selector).text().indexOf(key[i]) > -1;
						}
						return bool;
					});
				} else{
					nodes = nodes.filter(function(index){
						var bool = true;
						for(i in key){
							bool = bool && $(nodes[index]).find(selector).text().toLowerCase().indexOf(key[i].toLowerCase()) > -1;
						}
						return bool;
					});
				}
			}
		}
		boom_temp[scope].filtered = nodes;
		if(boom_temp[scope].paginating){
			boom.paginate({
				scope: scope,
				page: 1
			});
		} else
			nodes.show();
		try{
			if(boom_temp[scope].boomfilterend)
				boom_temp[scope].boomfilterend();
		} catch(e){
			throw e;
		}
	},
	paginate: function(obj){
		var scope = obj.scope ? obj.scope : boom_temp.defaultScope;
		var actual_page = typeof obj.page === 'undefined' ? boom_temp[scope].actual_page : obj.page;
		var page_length = typeof obj.page_length === 'undefined' ? boom_temp[scope].page_length : obj.page_length;
		boom_temp[scope].page_length = page_length;
		
		actual_page = actual_page == 'next' ? boom_temp[scope].actual_page + 1 : actual_page;
		actual_page = actual_page == 'previous' ? boom_temp[scope].actual_page - 1 : actual_page;
		actual_page = actual_page < 1 ? 1 : actual_page;
		var page_count = Math.ceil(boom_temp[scope].filtered.length/boom_temp[scope].page_length);
		actual_page = actual_page > page_count ? page_count : actual_page;
		
		boom_temp[scope].actual_page = actual_page;
		var nodes = boom_temp[scope].filtered;
		nodes.each(function(index){
			if(index < page_length * actual_page && index >= page_length * (actual_page - 1))
				$(this).show();
			else
				$(this).hide();
		});
		try{
			if(boom_temp[scope].boompaginationend)
				boom_temp[scope].boompaginationend();
		} catch(e){
			throw e;
		}
	},
	setPageLength: function(obj){
		var scope = obj.scope ? obj.scope : boom_temp.defaultScope;
		boom_temp[scope].page_length = obj.page_length;
		boom.paginate({
			scope: scope,
			page: 1
		});
	},
	getPageCount: function(obj){
		var scope = obj.scope ? obj.scope : boom_temp.defaultScope;
		return Math.ceil(boom_temp[scope].filtered.length/boom_temp[scope].page_length);
	}
}
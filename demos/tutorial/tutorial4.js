var Tutorial = {};

Tutorial.text = "big_bang の歯車ボタン";
Tutorial.introlst = [
    {
        "text": [
            [
                {
                    "intro": "ここでは、big_bang ブロックの歯車ボタンの使い方をみます。"
                }
            ]
        ]
    },
    {
        "text": [
            [],
            [],
            [
                {
                    "intro": "big_bang ブロックのいろいろな機能は、\n歯車ボタンを使って使えるようにします。\n"
                }
            ],
            [],
            []
        ],
        "category": 8,
        "block": 8,
        "id": 1
    },
    {
        "text": [
            [ 
               {
                    "intro": "画面の高さを指定できるようにするには ~height ブロックをドラッグして、\n右の big_bang のところにつなげる"
                }
            ],
            [
                {
                    "intro": "画面の幅を指定できるようにするには ~width ブロックをドラッグして、\n右の big_bang のところにつなげる"
                }
            ],
            [],
            [],
            []
        ],
        "mutator": [
            0
        ],
        "open": false,
        "bigbang": true,
        "newvalue": "width=\"1\"",
        "oldvalue": null,
        "item": "world_width_item",
        "add": -1
    },
    {
        "text": [
            [
                {
                    "intro": "これで、画面の幅と高さを指定できるようになりました。\n同様にして、他のブロックを右の big_bang のところにつなげると、\nその機能が使えるようになります。"
                }
            ],
            [],
            [],
            [],
            []
        ],
        "mutator": [
            0
        ],
        "open": true,
        "bigbang": true,
        "newvalue": "width=\"1\" height=\"1\"",
        "oldvalue": "width=\"1\"",
        "item": "world_height_item",
        "add": 1
    },
    {
        "text": [
            [],
            [],
            [],
            [],
            []
        ],
        "mutator": [
            0,
            false
        ]
    }
];

Tutorial.step = 0;
Tutorial.intro = introJs();

Tutorial.lst;
Tutorial.a;
Tutorial.idlst = [];
Tutorial.fun;
Tutorial.alertflg = 0;
Tutorial.dragflg = 0;

Tutorial.box = document.createElement("div");
Tutorial.box2 = document.createElement("div");
Tutorial.box3 = document.createElement("div");
Tutorial.box4 = document.createElement("div");
Tutorial.box5 = document.createElement("div");
Tutorial.box6 = document.createElement("div");
Tutorial.box7 = document.createElement("div");
Tutorial.box8 = document.createElement("div");

Tutorial.draw_rect = function(rec) {
    rect = rec.getBoundingClientRect();
    Tutorial.box.setAttribute("style", "width:" + (rect.width+10) + "px; height:5px; left:" + (rect.left-5) + "px; top:" + (rect.top-5) + "px; background:red;");
    Tutorial.box2.setAttribute("style", "width:" + (rect.width+15) + "px; height:5px; left:" + (rect.left-5) + "px; top:" + (rect.bottom+5) + "px; background:red;");
    Tutorial.box3.setAttribute("style", "width:5px; height:" + (rect.height+10) + "px; left:" + (rect.left-5) + "px; top:" + (rect.top-5) + "px; background:red;");
    Tutorial.box4.setAttribute("style", "width:5px; height:" + (rect.height+15) + "px; left:" + (rect.right+5) + "px; top:" + (rect.top-5) + "px; background:red;");
    Tutorial.box.setAttribute("class", "tutorialBox");
    Tutorial.box2.setAttribute("class", "tutorialBox");
    Tutorial.box3.setAttribute("class", "tutorialBox");
    Tutorial.box4.setAttribute("class", "tutorialBox");
    document.querySelector("body").appendChild(Tutorial.box);
    document.querySelector("body").appendChild(Tutorial.box2);
    document.querySelector("body").appendChild(Tutorial.box3);
    document.querySelector("body").appendChild(Tutorial.box4);
}

Tutorial.draw_rect2 = function(x, y, width, height) {
    scale = Blockly.mainWorkspace.scale;
    x2 = Blockly.mainWorkspace.toolbox_.width + Blockly.mainWorkspace.scrollX + (x - 10) * scale;
    Tutorial.box5.setAttribute("style", "width:" + ((width+10)*scale) + "px; height:5px; left:" + x2 + "px; top:" + ((y-5)*scale+Blockly.mainWorkspace.scrollY) + "px; background:LightSkyBlue;");
    Tutorial.box6.setAttribute("style", "width:" + ((width+10)*scale+5) + "px; height:5px; left:" + x2 + "px; top:" + ((y+height+5)*scale+Blockly.mainWorkspace.scrollY) + "px; background:LightSkyBlue;");
    Tutorial.box7.setAttribute("style", "width:5px; height:" + ((height+10)*scale) + "px; left:" + x2 + "px; top:" + ((y-5)*scale+Blockly.mainWorkspace.scrollY) + "px; background:LightSkyBlue;");
    Tutorial.box8.setAttribute("style", "width:5px; height:" + ((height+10)*scale+5) + "px; left:" + (x2+(width+10)*scale) + "px; top:" + ((y-5)*scale+Blockly.mainWorkspace.scrollY) + "px; background:LightSkyBlue;");
    Tutorial.box5.setAttribute("class", "tutorialBox");
    Tutorial.box6.setAttribute("class", "tutorialBox");
    Tutorial.box7.setAttribute("class", "tutorialBox");
    Tutorial.box8.setAttribute("class", "tutorialBox");
    document.querySelector("body").appendChild(Tutorial.box5);
    document.querySelector("body").appendChild(Tutorial.box6);
    document.querySelector("body").appendChild(Tutorial.box7);
    document.querySelector("body").appendChild(Tutorial.box8);
}

Tutorial.dark = function() {
    rect = document.body.getBoundingClientRect();
    div = document.createElement("div");
    div.setAttribute("style", "width:" + rect.width + "px; height:" + rect.height + "px; left:" + rect.left + "px; top:" +rect.top + "px; background:Black; opacity: 0.4");
    div.setAttribute("class", "tutorialBox");
    document.body.appendChild(div);
}

Tutorial.clear_rect = function() {
    while ((div = document.querySelector("div[class='tutorialBox']")) != null) {
	document.querySelector("body").removeChild(div);
    }
}

Tutorial.menulst = ["四則演算", "文字列", "論理演算と条件文", "色", "画像", "風景", "リスト", "座標と世界の定義", "ゲーム用の定義", "一般の変数と関数"];

Tutorial.blocklst = [[["int_typed", "整数", "INT"],
	     ["int_arithmetic_typed", "四則演算", "OP_INT"],
	     ["int_abs_typed", "abs"],
	     ["random_int_typed", "乱数"]],
	    [["string_typed", "文字列", "STRING"],
	     ["concat_string_typed", "文字列結合"],
	     ["string_of_int_typed", "string_of_int"]],
	    [["logic_compare_typed", "比較演算", "OP"],
	     ["logic_operator_typed", "論理演算", "OP_BOOL"],
	     ["not_operator_typed", "not"],
	     ["logic_ternary_typed", "if"],
	     ["logic_boolean_typed", "true", "BOOL"]],
	    [["color_typed", "color", "COLOR"],
	     ["make_color_typed", "make_color"],
	     ["make_color2_typed", "make_color2"]],
	    [["image_width_typed", "image_width"],
	     ["image_height_typed", "image_height"],
	     ["read_image_typed", "read_image"],
	     ["rectangle_typed", "rectangle", "IMAGE"],
	     ["circle_typed", "circle", "IMAGE"],
	     ["line_typed", "line"],
	     ["polygon_typed", "polygon", "IMAGE"],
	     ["text_typed", "text"],
	     ["overlay_typed", "overlay"]],
	    [["empty_scene_typed", "empty_scene"],
	     ["place_image_typed", "place_image"],
	     ["place_images_typed", "place_images"]],
	    [["lists_create_with_typed", "リスト"],
	     ["list_cons_typed", "cons"],
	     ["list_map_typed", "map"],
	     ["andmap_typed", "andmap"],
	     ["ormap_typed", "ormap"],
	     ["sum_typed", "sum"],
	     ["list_filter_typed", "filter"]],
	    [["pair_create_typed", "組"],
	     ["defined_recordtype_typed", "world_t", "DATANAME", "FIELDn"],
	     ["defined_recordtype_typed", "レコード定義", "DATANAME"]],
	    [["letstatement_typed", "initial_world", "VAR"],
	     ["letstatement_typed", "width", "VAR"],
	     ["letstatement_typed", "height", "VAR"],
	     ["letstatement_fun_pattern_typed", "draw", "VAR"],
	     ["letstatement_fun_pattern_typed", "on_tick", "VAR"],
	     ["letstatement_fun_pattern_typed", "on_key", "VAR"],
	     ["letstatement_fun_pattern_typed", "on_mouse", "VAR"],
	     ["letstatement_typed", "rate", "VAR"],
	     ["big_bang_typed", "big_bang"]],
	    [["letstatement_fun_pattern_typed", "変数定義", "VAR"],
	     ["letstatement_fun_pattern_typed", "関数定義", "VAR"],
	     ["let_fun_pattern_typed", "局所変数定義", "VAR"],
	     ["let_fun_pattern_typed", "局所関数定義", "VAR"]],
	    [["variable_pattern_typed", "パラメータ", "VAR"],
	     ["pair_pattern_typed", "パラメータ", "VAR"],
	     ["record_pattern_typed", "パラメータ", "VAR"],
	     ["empty_construct_pattern_typed", "パラメータ", "VAR"],
	     ["cons_construct_pattern_typed", "パラメータ", "VAR"],
	     ["option_none_pattern_typed", "パラメータ", "VAR"],
	     ["option_some_pattern_typed", "パラメータ", "VAR"],]];


Tutorial.clear = function() {
    Tutorial.intro.addSteps([{intro: "チュートリアルクリア"}]).onchange(function(){}).start();
}

Tutorial.error = function() {
    alert("エラー！最初からやり直してください");
    Blockly.mainWorkspace.clear();
    Tutorial.f(Tutorial.lst);
}

Tutorial.cancel = function(e, f, g) {
    if (e.__proto__.type == "change" && e.element == "field" && Tutorial.lst[Tutorial.idlst.indexOf(e.blockId)]) {
	b = Tutorial.lst.filter(function(x){x.id == Tutorial.idlst.indexOf(e.blockId)})[0];
	if (b.value == undefined) {
	    value = Blockly.FieldTextInput.htmlInput_.defaultValue;
	}
	else value = b.value[1];
	if (e.newValue == value) {
	    Tutorial.alertflg = 0;
	}
	else if (Tutorial.alertflg == 0) {
	    Tutorial.alertflg = 1;
	    Tutorial.intro.exit();
	    Tutorial.clear_rect();
	    Blockly.mainWorkspace.removeChangeListener(f);
	    window.setTimeout('alert("操作が違います！")', 11);
	    Blockly.selected.unselect();
	    Blockly.mainWorkspace.getBlockById(e.blockId).getField(Tutorial.blocklst[b.category][b.block][2]).setValue(value);
	    Blockly.FieldTextInput.htmlInput_.value = value;
	    g();
	}
	else {
	}
    }
    else if (e.__proto__.type == "create" || e.__proto__.type == "delete" || ((e.__proto__.type == "move" && (e.newParentId != undefined || e.oldParentId != undefined)) || e.__proto__.type == "change" || e.__proto__.type == "bound_var_rename")) {
	if (Tutorial.alertflg == 1) {
	    Tutorial.alertflg = 0;
	}
	else {
	    Tutorial.alertflg = 1;
	    Tutorial.intro.exit();
	    Tutorial.clear_rect();
	    Blockly.mainWorkspace.removeChangeListener(f);
	    window.setTimeout('alert("操作が違います！")', 11);
	    Blockly.mainWorkspace.undo();
	    if (e.__proto__.type != "create" && Blockly.mainWorkspace.getBlockById(e.blockId) == null) {
		window.setTimeout(Tutorial.error, 11);
	    }
	    else {
		g();
	    }
	}
    }
}

Tutorial.ondrag = function(x, y, s, g, n) {
    if (Tutorial.dragflg != n) {
    }
    else if (x == Blockly.mainWorkspace.scrollX &&
	     y == Blockly.mainWorkspace.scrollY &&
	     s == Blockly.mainWorkspace.scale) {
	window.setTimeout(function(){Tutorial.ondrag(x, y, s, g, n);}, 1000);
    }
    else {
	Tutorial.intro.exit();
	Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
	g();
    }
}

Tutorial.f = function(l) {
    Tutorial.idlst = [];
    Tutorial.step = 0;
    Tutorial.lst = l;
    if (Tutorial.lst.length > 0 && Tutorial.lst[0].text.length == 1) {
	Tutorial.intro.setOptions({'steps': Tutorial.lst[0].text[0].slice()});
	Tutorial.step++;
    }
    else {
	Tutorial.intro.setOptions({'steps': []});
    }
    Tutorial.f0();
}

Tutorial.f0 = function() {
    if (Tutorial.a = Tutorial.lst[Tutorial.step]) {
	if (Tutorial.a.trash != undefined) {
	    Tutorial.f9();
	}
	else if (Tutorial.a.variable == undefined && Tutorial.a.workbench == undefined && Tutorial.a.mutator == undefined) {
	    Tutorial.f1();
	}
	else {
	    Tutorial.f6(null);
	}
    }
    else {
	Tutorial.clear();
    }
}

Tutorial.f1 = function() {
    x = Tutorial.a.category;
    if (x < 9) {
	x2 = x+1;
    }
    else {
	x2 = "a";
    }
    target = document.querySelector("div[aria-labelledby=':"+(x2)+".label']");
    Tutorial.intro.addSteps([{element: target, intro: Tutorial.menulst[x]+"をクリック"}]).onchange(function(e){if(e!=target){Tutorial.dark();}else{Tutorial.clear_rect();Tutorial.draw_rect(target);}}).start();
    Blockly.mainWorkspace.addChangeListener(Tutorial.fun = function(e){
	if(e.element == "category" && e.newValue == Tutorial.menulst[x]) {
	    Tutorial.intro.exit();
	    Tutorial.clear_rect();
	    Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
	    Tutorial.intro.setOptions({'steps': Tutorial.a.text[1].slice()});
	    Tutorial.f2();
	}
    });
}

Tutorial.f2 = function() {
    x = Tutorial.a.category;
    y = Tutorial.a.block;
    target = Blockly.mainWorkspace.toolbox_.flyout_.mats_[y];
    if (target.getAttribute("y") > Blockly.mainWorkspace.toolbox_.flyout_.height_) {
	Blockly.mainWorkspace.toolbox_.flyout_.scrollbar_.set(target.getAttribute("y") + target.getAttribute("height") - Blockly.mainWorkspace.toolbox_.flyout_.height_)
    }
    Tutorial.intro.addSteps([{element: target, intro: Tutorial.blocklst[x][y][1]+"ブロックをメインスペースにドラッグ"}]).onchange(function(e){if(e!=target){Tutorial.dark();}else{Tutorial.clear_rect();Tutorial.draw_rect(target);}}).start();
    Blockly.mainWorkspace.addChangeListener(Tutorial.fun = function(e){
	if (e.__proto__.type == "create" && Blockly.mainWorkspace.getBlockById(e.blockId).type == Tutorial.blocklst[x][y][0]){
	    Tutorial.idlst.push(e.blockId);
	    Tutorial.intro.exit();
	    Tutorial.clear_rect();
	    Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
	    Tutorial.intro.setOptions({'steps': Tutorial.a.text[2].slice()});
	    Tutorial.f3();
	}
	else if (e.__proto__.type == "ui") {
	    Tutorial.intro.exit();
	    Tutorial.clear_rect();
	    Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
	    Tutorial.setOptions({'steps': []});
	    Tutorial.f1();
	}
	else {
	    Tutorial.intro.setOptions({'steps': []});
	    Tutorial.cancel(e, Tutorial.fun, Tutorial.f2);
	}
    });
}

Tutorial.f3 = function() {
    if (Tutorial.a.target) {
	Tutorial.dragflg = 1;
	Tutorial.ondrag(Blockly.mainWorkspace.scrollX, Blockly.mainWorkspace.scrollY, Blockly.mainWorkspace.scale, Tutorial.f3, 1);
	target = Blockly.mainWorkspace.getBlockById(Tutorial.idlst[Tutorial.a.target[0]]);
	if (Tutorial.a.target[1] == "NEXT") {
	    Tutorial.intro.addSteps([{element: target.svgGroup_, intro: 'ブロックをはめる'}]).onchange(function(e){if(e!=target.svgGroup_){Tutorial.dark();}else{Tutorial.clear_rect();input = target.nextConnection;Tutorial.draw_rect2(input.x_-15, input.y_, 24, 0);}}).start();
	}
	else {
	    Tutorial.intro.addSteps([{element: target.svgGroup_, intro: 'ブロックをはめる'}]).onchange(function(e){if(e!=target.svgGroup_){Tutorial.dark();}else{Tutorial.clear_rect();input = target.getInput(Tutorial.a.target[1]);Tutorial.draw_rect2(input.connection.x_, input.connection.y_, input.renderWidth, input.renderHeight);}}).start();
	}
	Blockly.mainWorkspace.addChangeListener(Tutorial.fun = function(e){
	    block = Blockly.mainWorkspace.getBlockById(e.blockId);
	    if (e.__proto__.type == "move" && block.type == Tutorial.blocklst[Tutorial.a.category][Tutorial.a.block][0] && e.newParentId == target.id && (e.newInputName == Tutorial.a.target[1] || (Tutorial.a.target[1] == "NEXT" && e.newInputName == undefined))) {
		Tutorial.dragflg = 0;
		Tutorial.intro.exit();
		Tutorial.clear_rect();
		Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
		Tutorial.intro.setOptions({'steps': Tutorial.a.text[3].slice()});
		Tutorial.f4();
	    }
	    else if (e.__proto__.type == "move" && e.newParentId == undefined && e.oldParentId == undefined) {
		Tutorial.dragflg = 0;
		Tutorial.intro.exit();
		Tutorial.clear_rect();
		Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
		Tutorial.intro.setOptions({'steps': []});
		Tutorial.f3();
	    }
	    else {
		Tutorial.dragflg = 0;
		Tutorial.intro.setOptions({'steps': []});
		Tutorial.cancel(e, Tutorial.fun, Tutorial.f3);
	    }
	});
    }
    else {
	Tutorial.f4();
    }
}

Tutorial.f4 = function() {
    if (Tutorial.a.value) {
	Tutorial.dragflg = 2;
	Tutorial.ondrag(Blockly.mainWorkspace.scrollX, Blockly.mainWorkspace.scrollY, Blockly.mainWorkspace.scale, Tutorial.f4, 2);
	block = Blockly.mainWorkspace.getBlockById(Tutorial.idlst[Tutorial.idlst.length-1]);
	field = block.getField(Tutorial.blocklst[Tutorial.a.category][Tutorial.a.block][2])
	Tutorial.intro.addSteps([{element: field.fieldGroup_, intro: Tutorial.a.value[0]+'に変更', position: 'top'}]).onchange(function(e){if(e!=field.fieldGroup_){Tutorial.dark();}else{Tutorial.clear_rect();Tutorial.draw_rect(field.fieldGroup_);}}).start();
	Blockly.mainWorkspace.addChangeListener(Tutorial.fun = function(e){
	    if (e.__proto__.type == "change" && e.newValue == Tutorial.a.value[1]) {
		Tutorial.dragflg = 0;
		Tutorial.intro.exit();
		Tutorial.clear_rect();
		Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
		Tutorial.intro.setOptions({'steps': Tutorial.a.text[4].slice()});
		Tutorial.f5();
	    }
	    else if (e.__proto__.type == "move" && e.newParentId == undefined && e.oldParentId == undefined) {
		Tutorial.dragflg = 0;
		Tutorial.intro.exit();
		Tutorial.clear_rect();
		Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
		Tutorial.intro.setOptions({'steps': []});
		Tutorial.f4();
	    }
	    else if (e.__proto__.type == "change" && e.element == "field" && e.blockId == Tutorial.idlst[idlst.length-1]) {
	    }
	    else {
		Tutorial.dragflg = 0;
		Tutorial.intro.setOptions({'steps': []});
		Tutorial.cancel(e, Tutorial.fun, Tutorial.f4);
	    }
	});
    }
    else {
	Tutorial.f5();
    }
}

Tutorial.f5 = function() {
    if (Tutorial.a.name != undefined) {
	Tutorial.dragflg = 3;
	Tutorial.ondrag(Blockly.mainWorkspace.scrollX, Blockly.mainWorkspace.scrollY, Blockly.mainWorkspace.scale, Tutorial.f5, 3);
	block = Blockly.mainWorkspace.getBlockById(Tutorial.idlst[Tutorial.idlst.length-1]);
	field = block.getField(Tutorial.blocklst[Tutorial.a.category][Tutorial.a.block][2])
	Tutorial.intro.addSteps([{element: field.fieldGroup_, intro: '名前を'+Tutorial.a.name+'に変更', position: 'top'}]).onchange(function(e){if(e!=field.fieldGroup_){Tutorial.dark();}else{Tutorial.clear_rect();Tutorial.draw_rect(field.fieldGroup_);}}).start();
	Blockly.mainWorkspace.addChangeListener(Tutorial.fun = function(e){
	    if (e.__proto__.type == "bound_var_rename" && field.getText() == Tutorial.a.name) {
		Tutorial.dragflg = 0;
		Tutorial.intro.exit();
		Tutorial.clear_rect();
		Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
		Tutorial.intro.setOptions({'steps': Tutorial.a.text[0].slice()});
		Tutorial.step++;
		Tutorial.f0();
	    }
	    else if (e.__proto__.type == "move" && e.newParentId == undefined && e.oldParentId == undefined) {
		Tutorial.dragflg = 0;
		Tutorial.intro.exit();
		Tutorial.clear_rect();
		Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
		Tutorial.intro.setOptions({'steps': []});
		Tutorial.f5();
	    }
	    else {
		Tutorial.dragflg = 0;
		Tutorial.intro.setOptions({'steps': []});
		Tutorial.cancel(e, Tutorial.fun, Tutorial.f5);
	    }
	});
    }
    else {
	Tutorial.step++;
	Tutorial.f0();
    }
}

Tutorial.f6 = function() {
    if (Tutorial.a.open != true) {
	if (Tutorial.a.workbench || Tutorial.a.mutator != undefined) {
	    Tutorial.dragflg = 4;
	    Tutorial.ondrag(Blockly.mainWorkspace.scrollX, Blockly.mainWorkspace.scrollY, Blockly.mainWorkspace.scale, Tutorial.f6, 4);
	    if (Tutorial.a.workbench) {
		block = Blockly.mainWorkspace.getBlockById(Tutorial.idlst[Tutorial.a.workbench[0]]);
		icon = block.workbenches[1].iconGroup_;
		str = "「パ」";
		el = "workbenchOpen";
		next = function(){Tutorial.f7(null);};
	    }
	    else {
		block = Blockly.mainWorkspace.getBlockById(Tutorial.idlst[Tutorial.a.mutator[0]]);
		icon = block.mutator.iconGroup_;
		str = "歯車";
		el = "mutatorOpen";
		next = Tutorial.f8;
	    }
	    if ((Tutorial.a.workbench && Tutorial.a.workbench[1] == false) || (Tutorial.a.mutator && Tutorial.a.mutator[1] == false)) {
		txt = "メニューを閉じる";
		next = function(){step++; Tutorial.f0();};
	    }
	    else {
		txt = str+'ボタンをクリック'
	    }
	    Tutorial.intro.addSteps([{element: icon, intro: txt}]).onchange(function(e){if(e!=icon){Tutorial.dark();}else{Tutorial.clear_rect();Tutorial.draw_rect(icon);}}).start();
	    Blockly.mainWorkspace.addChangeListener(Tutorial.fun = function(e){
		if (e.element == el && e.blockId == block.id) {
		    Tutorial.dragflg = 0;
		    Tutorial.intro.exit();
		    Tutorial.clear_rect();
		    Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
		    Tutorial.intro.setOptions({'steps': Tutorial.a.text[1].slice()});
		    next();
		}
		else if (e.__proto__.type == "move" && e.newParentId == undefined && e.oldParentId == undefined) {
		    Tutorial.dragflg = 0;
		    Tutorial.intro.exit();
		    Tutorial.clear_rect();
		    Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
		    Tutorial.intro.setOptions({'steps': []});
		    Tutorial.f6();
		}
		else {
		    Tutorial.dragflg = 0;
		    Tutorial.intro.setOptions({'steps': []});
		    Tutorial.cancel(e, Tutorial.fun, Tutorial.f6);
		}
	    });
	}
	else {
	    Tutorial.f7(null);
	}
    }
    else {
	Tutorial.f8();
    }
}

Tutorial.f7 = function(arg) {
    Tutorial.dragflg = 5;
    Tutorial.ondrag(Blockly.mainWorkspace.scrollX, Blockly.mainWorkspace.scrollY, Blockly.mainWorkspace.scale, function(){Tutorial.f7(arg)}, 5);
    target = Blockly.mainWorkspace.getBlockById(Tutorial.idlst[Tutorial.a.target[0]]);
    input = target.getInput(Tutorial.a.target[1]);
    if (Tutorial.a.variable == undefined) {
	block = Blockly.mainWorkspace.getBlockById(Tutorial.idlst[Tutorial.a.workbench[0]]).workbenches[1].workspace_.flyout_.mats_[Tutorial.a.workbench[1]];
    }
    else {
	block = Blockly.mainWorkspace.getBlockById(Tutorial.idlst[Tutorial.a.variable]).getField("VAR").fieldGroup_;
    }
    Tutorial.intro.onchange(function(e){if(e!=target.svgGroup_){Tutorial.dark();}else{Tutorial.clear_rect();Tutorial.draw_rect(block);Tutorial.draw_rect2(input.connection.x_, input.connection.y_, input.renderWidth, input.renderHeight);}}).addSteps([{element: target.svgGroup_, intro: 'ブロックをはめる'}]).start();
    id = arg;
    Blockly.mainWorkspace.addChangeListener(Tutorial.fun = function(e){
	if (e.__proto__.type == "move" && (Tutorial.a.workbench != undefined || Tutorial.idlst[Tutorial.a.variable]) && e.blockId == id && e.newParentId == target.id && e.newInputName == Tutorial.a.target[1]) {
	    Tutorial.dragflg = 0;
	    Tutorial.intro.exit();
	    Tutorial.clear_rect();
	    Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
	    Tutorial.intro.setOptions({'steps': Tutorial.a.text[0].slice()});
	    if (Tutorial.a.workbench != undefined && Tutorial.a.name != undefined) {
		Tutorial.f5();
	    }
	    else {
		Tutorial.step++
		Tutorial.f0();
	    }
	}
	else if (e.__proto__.type == "move" && e.newParentId == undefined && e.oldParentId == undefined) {
	    Tutorial.dragflg = 0;
	    Tutorial.intro.exit();
	    Tutorial.clear_rect();
	    Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
	    Tutorial.intro.setOptions({'steps': []});
	    Tutorial.f7(id);
	}
	else if (e.__proto__.type == "change" && e.element == "inline" && ((a.variable != undefined && Blockly.mainWorkspace.getBlockById(e.blockId).typedReference.VAR.value_.sourceBlock_.id == Tutorial.idlst[Tutorial.a.variable]) || (Tutorial.a.workbench != undefined && block.tooltip.type == Blockly.mainWorkspace.getBlockById(e.blockId).type))) {
	    id = e.blockId;
	    Tutorial.idlst.push(id);
	}
	else if (e.__proto__.type == "create" && e.blockId == id) {
	}
	else {
	    Tutorial.dragflg = 0;
	    Tutorial.intro.setOptions({'steps': []});
	    Tutorial.cancel(e, Tutorial.fun, function(){Tutorial.f7(null)});
	}
    });
}

Tutorial.f8 = function() {
    Tutorial.dragflg = 6;
    Tutorial.ondrag(Blockly.mainWorkspace.scrollX, Blockly.mainWorkspace.scrollY, Blockly.mainWorkspace.scale, Tutorial.f8, 6);
    block = Blockly.mainWorkspace.getBlockById(Tutorial.idlst[Tutorial.a.mutator]);
    ws = block.mutator.workspace_;
    b = ws.getTopBlocks(true)[0];
    if (Tutorial.a.bigbang) {
	if (Tutorial.a.add > 0) {
	    max = Tutorial.a.add;
	}
	else {
	    max = 0;
	}
	n = block.mutator.quarkNames_.indexOf(Tutorial.a.item);
	el = block.mutator.workspace_.flyout_.mats_[n];
	txt = "";
    }
    else {
	max = Tutorial.a.oldvalue;
	el = block.mutator.workspace_.flyout_.mats_[0];
	txt = 'items=\"';
    }
    for (var i=0; i<max; i++) {
	b = b.getChildren()[0];
    }
    if (Tutorial.a.add) {
	if (max == 0) {
	    connection = b.inputList[1].connection;
	}
	else {
	    connection = b.nextConnection;
	}
	Tutorial.intro.addSteps([{element: el, intro: 'ブロックをくっつける', position: 'top'}]).onchange(function(e){if(e!=el){Tutorial.dark();}else{Tutorial.clear_rect();Tutorial.draw_rect(el);Tutorial.draw_rect2(connection.x_+ws.workspaceArea_.left-Blockly.mainWorkspace.toolbox_.width-15, connection.y_+ws.workspaceArea_.top, 24, 0)}}).start();
    }
    else {
	if (Tutorial.a.bigbang) {
	    el = block.mutator.workspace_.typedBlocksDB_[Tutorial.a.item][0].svgPath_;
	}
	else {
	    for (var i=1; i<Tutorial.a.oldvalue-Tutorial.a.newvalue; i++) {
		b = b.getParent();
	    }
	    el = b.svgGroup_;
	}
	Tutorial.intro.addSteps([{element: el, intro: 'ブロックを外す', position: 'top'}]).onchange(function(e){if(e!=el){Tutorial.dark();}else{Tutorial.clear_rect();Tutorial.draw_rect(el)}}).start();
    }
    if (Tutorial.a.newvalue == null) {
	newvalue = null;
    }
    else {
	newvalue = '<mutation xmlns=\"http://www.w3.org/1999/xhtml\" '+txt+Tutorial.a.newvalue+'></mutation>';
    }
    if (Tutorial.a.oldvalue == null) {
	oldvalue = null;
    }
    else {
	oldvalue = '<mutation xmlns=\"http://www.w3.org/1999/xhtml\" '+txt+Tutorial.a.oldvalue+'></mutation>';
    }
    Blockly.mainWorkspace.addChangeListener(Tutorial.fun = function(e){
	if (e.__proto__.type == "change" && e.element == "mutation" && e.blockId == Tutorial.idlst[Tutorial.a.mutator] && e.newValue == newvalue && e.oldValue == oldvalue) {
	    Tutorial.dragflg = 0;
	    Tutorial.intro.exit();
	    Tutorial.clear_rect();
	    Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
	    Tutorial.intro.setOptions({'steps': Tutorial.a.text[0].slice()});
	    Tutorial.step++;
	    Tutorial.f0();
	}
	else if (e.__proto__.type == "move" && e.newParentId == undefined && e.oldParentId == undefined) {
	    Tutorial.dragflg = 0;
	    Tutorial.intro.exit();
	    Tutorial.clear_rect();
	    Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
	    Tutorial.intro.setOptions({'steps': []});
	    Tutorial.f8();
	}
	else {
	    Tutorial.dragflg = 0;
	    Tutorial.intro.setOptions({'steps': []});
	    Tutorial.cancel(e, Tutorial.fun, Tutorial.f8);
	}
    });
}

Tutorial.f9 = function() {
    Tutorial.dragflg = 7;
    Tutorial.ondrag(Blockly.mainWorkspace.scrollX, Blockly.mainWorkspace.scrollY, Blockly.mainWorkspace.scale, Tutorial.f9, 7);
    if (Blockly.mainWorkspace.getBlockById(Tutorial.idlst[Tutorial.a.trash]) != null) {
	block = Blockly.mainWorkspace.getBlockById(Tutorial.idlst[Tutorial.a.trash]).svgPath_;
    trs = document.querySelector("g[class='blocklyTrash']");
	Tutorial.intro.addSteps([{element: trs, intro: 'ブロックをゴミ箱にドラッグ'}]).onchange(function(e){if(e!=trs){Tutorial.dark();}else{Tutorial.clear_rect();Tutorial.draw_rect(block);}}).start();}
    Blockly.mainWorkspace.addChangeListener(Tutorial.fun = function(e){
	if (e.__proto__.type == "delete" && e.blockId == Tutorial.idlst[Tutorial.a.trash]) {
	    Tutorial.dragflg = 0;
	    Tutorial.intro.exit();
	    Tutorial.clear_rect();
	    Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
	    Tutorial.intro.setOptions({'steps': Tutorial.a.text[0].slice()});
	    Tutorial.step++;
	    Tutorial.f0();
	}
	else if (e.__proto__.type == "move" && e.newParentId == undefined && e.oldParentId == undefined) {
	    Tutorial.dragflg = 0;
	    Tutorial.intro.exit();
	    Tutorial.clear_rect();
	    Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);
	    Tutorial.intro.setOptions({'steps': []});
	    Tutorial.f9();
	}
	else if (e.__proto__.type == "move" && e.blockId == idlst[a.trash]) {
	}
	else {
	    Tutorial.dragflg = 0;
	    Tutorial.intro.setOptions({'steps': []});
	    Tutorial.cancel(e, Tutorial.fun, Tutorial.f9);
	}
    });
}

Tutorial.main = function() {
    div = document.createElement("div");
    div.innerHTML = "<br>"+Tutorial.text;
    document.querySelector("div[class='blockToCode']").appendChild(div);
    start = document.createElement("button");
    start.textContent = "チュートリアルスタート";
    Tutorial.intro.setOptions({
	nextToDone: false,
	exitOnOverlayClick: false}).onexit(function(){Tutorial.clear_rect(); Blockly.mainWorkspace.removeChangeListener(Tutorial.fun);});
    start.onclick = function() {
	Tutorial.intro.exit();
	Tutorial.step = 0;
	Tutorial.f(Tutorial.introlst);};
    document.querySelector("div[class='blockToCode']").appendChild(start);
}


'use strict';

var Stepper = {};

Stepper.url = 'https://www.is.ocha.ac.jp:49139/stepper';

/* これまでのステップ実行の結果を格納する配列 */
Stepper.results = [];

/* text の startPos 以降の最初の [ に対応する ] の位置を返す */
Stepper.findEndPos = function (text, startPos) {
  var count = 0;
  for (var i = startPos; i < text.length; i++) {
    // TODO: "..." の中の [, ] は無視するように変更すべき
    if (text.charAt(i) === '[') {
      count++;
    } else if (text.charAt(i) === ']') {
      count--;
      if (count === 0) {
        return (i);
      }
    }
  }
  return (-1);
}

/* ステッパの出力 stepPair から、次に実行すべきプログラムを startPos
 * 以降から取り出す。*/
Stepper.extractProgram = function (stepPair, startPos) {
  var endPos = Stepper.findEndPos(stepPair, startPos);
  var next = stepPair.substring(startPos + 20, endPos);
  return (next);
}

/* [@@@stepper.process ...] と (* from Step ? *) と (* forward *) を削除する */
Stepper.removeStepperProcess = function (stepPair) {
  var text = [];
  var lastPos = 0;
  var startPos = stepPair.indexOf('[@@@stepper.process');
  while (startPos >= 0) {
    text.push(stepPair.substring(lastPos, startPos - 1)); // -1 は改行分
    lastPos = Stepper.findEndPos(stepPair, startPos) + 2;
    startPos = stepPair.indexOf('[@@@stepper.process', lastPos);
  }
  text.push(stepPair.substring(lastPos, stepPair.length));
  return (text.join('').replace(/\(\* from Step [0-9]+ \*\)/, '')
                       .replace(/\(\* forward \*\)/, '')
                       .replace(/\n\n$/, '\n'));
}

/* ステップ実行の表示を消す */
Stepper.clearResult = function () {
  var div = document.getElementById('stepResult');
  var newDiv = document.createElement("div");
  newDiv.id = 'stepResult';
  div.replaceWith(newDiv); // remove old div
}

/* ステップ実行の結果 msg を表示する */
Stepper.showStep = function (msg) {
  Stepper.clearResult();

  // コードを表示するための pre を生成
  const pre = document.createElement('pre');

  // pre の中に code タグを作り、OCaml であることと msg を入れる
  pre.innerHTML += '<code class="language-ocaml">' +
                     Stepper.removeStepperProcess(msg) +
                   '</code>';

  // コードが入った pre を div の中に入れる
  var div = document.getElementById('stepResult');
  div.appendChild(pre);

  // コードをハイライトさせる
  Prism.highlightAll();
}

/* ステッパサーバにプログラムを送って、結果を表示する */
Stepper.stepRequest = function (mode, list, program) {
  var data = {'mode':mode, 'list':list, 'program':program};
  var stringData = JSON.stringify(data);

  // 参考：https://so-zou.jp/web-app/tech/programming/javascript/ajax/post.htm
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    var READYSTATE_COMPLETED = 4;
    var HTTP_STATUS_OK = 200;

    if (this.readyState == READYSTATE_COMPLETED &&
        this.status == HTTP_STATUS_OK) {
        // レスポンスの表示
        var json = JSON.parse(this.responseText);
        var out = json.stdout;
        if (out == '') {
          var err = json.stderr.replace(/"Users.*"/, "\"file.ml\"");
          Stepper.showStep(err);
        } else if (out.indexOf("(* Stepper Error: No more steps. *)") >= 0) {
          alert("No more steps.");
        } else {
          Stepper.results.push(out);
          Stepper.showStep(out);
        }
    }
  }
  xmlhttp.open('POST', Stepper.url);

  // サーバに対して解析方法を指定する
  xmlhttp.setRequestHeader('content-type', 'application/json');

  // データをリクエスト ボディに含めて送信する
  xmlhttp.send(stringData);
}

/* Prev ボタン */
Stepper.prev = function() {
  var len = Stepper.results.length;
  if (len > 1) {
    Stepper.results.pop();
    Stepper.showStep(Stepper.results[len - 2]);
  } else {
    alert("No more steps.");
  }
}

/* Next ボタン */
Stepper.next = function() {
  var len = Stepper.results.length;
  if (len === 0) {
    // Stepper.showStep("Cannot happen in Stepper.next.");
    alert("No more steps.");
  } else {
    var stepPair = Stepper.results[len - 1];
    var startPos = stepPair.lastIndexOf('[@@@stepper.process'); // 後
    var program = Stepper.extractProgram(stepPair, startPos);
    console.log('next:\n' + program);
    Stepper.stepRequest('next', false, program);
  }
}

/* Skip ボタン */
Stepper.skip = function() {
  var len = Stepper.results.length;
  if (len === 0) {
    // Stepper.showStep("Cannot happen in Stepper.skip.");
    alert("No more steps.");
  } else {
    var stepPair = Stepper.results[len - 1];
    if (stepPair.indexOf('(* from Step ') >= 0) {
      // すでに一度 skip をしているので、next で次に進む
      Stepper.next();
    } else {
      var startPos = stepPair.indexOf('[@@@stepper.process'); // 前
      var program = Stepper.extractProgram(stepPair, startPos);
      console.log('skip:\n' + program);
      Stepper.stepRequest('skip', false, program);
    }
  }
}

/* Fwd ボタン */
Stepper.forward = function() {
  var len = Stepper.results.length;
  if (len === 0) {
    // Stepper.showStep("Cannot happen in Stepper.forward.");
    alert("No more steps.");
  } else {
    var stepPair = Stepper.results[len - 1];
    var startPos = stepPair.lastIndexOf('[@@@stepper.process'); // 後
    var program = Stepper.extractProgram(stepPair, startPos);
    console.log('forward:\n' + program);
    Stepper.stepRequest('nextitem', false, program);
  }
}

/* ステッパ開始時の処理 */
Stepper.stepStorageCode = function() {
  var program = sessionStorage.getItem('key');
  var list = sessionStorage.getItem('list');
  console.log('launch' + (list ? ' with list:\n' : ':\n') + program);
  Stepper.stepRequest('next', list, program);
}

// 矢印キーによるスクロールを無効化
// https://toburau.hatenablog.jp/entry/20140305/1394039412 より
var keydownfunc = function(event) {
  switch (event.key) {
    case 'ArrowLeft': // ←
      Stepper.prev();
      event.preventDefault();
      break;
    case 'ArrowRight': // →
      Stepper.next();
      event.preventDefault();
      break;
    case 'ArrowDown': // ↓
      Stepper.skip();
      event.preventDefault();
      break;
    case 'ArrowUp': // ↑
      Stepper.forward();
      event.preventDefault();
      break;
  }
}
window.addEventListener('keydown', keydownfunc, true);

/* インクリメンタルモードの stepper の入力の形式 */
/*
  [@@@stepper.counter 0]
  let rec fac n = if n = 0 then 1 else n * (fac (n - 1))[@@stepper.evaluated
                                                          ]
  let test =
    ((fac)
      [@stepper.letrec
        let rec fac n = if n = 0 then 1 else n * (fac (n - 1)) in fac]
      [@stepper.level 0]) 2
*/

/* インクリメンタルモードの stepper の出力の形式 */

/*
(* Step 0 *)
[@@@stepper.process
  [@@@stepper.counter 0]
  let rec fac n = if n = 0 then 1 else n * (fac (n - 1))[@@stepper.evaluated
                                                          ]
  let test =
    ((fac)
      [@stepper.letrec
        let rec fac n = if n = 0 then 1 else n * (fac (n - 1)) in fac]
      [@stepper.level 0]) 2]

let test = ((fac 2)[@x ])

(* Step 1 *)
[@@@stepper.process
  [@@@stepper.counter 1]
  let rec fac n = if n = 0 then 1 else n * (fac (n - 1))[@@stepper.evaluated
                                                          ]
  let test =
    if 2 = 0
    then 1
    else
      2 *
        (((fac)
           [@stepper.letrec
             (let rec fac n = if n = 0 then 1 else n * (fac (n - 1)) in fac)])
           (2 - 1))]

let test = ((if 2 = 0 then 1 else 2 * (fac (2 - 1)))[@t ])
*/

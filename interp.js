/*
def S(s):
  while s:
    b = ["","",1]
    for t in (0,1,2):
      while s:
        if s[0] == "/" :      s = s[1:]; break
        if s[0] == "\\":      s = s[1:]
        if t: b[t-1] += s[0]; s = s[1:]
        else: yield     s[0]; s = s[1:]
    while s and b[0] in s: s = s.replace(*b)
*/

/*
function* S(s) {
    while (s) {
        var b = ["", "", 1];
        for (var t = 0; t<3; t++) {
            while (s) {
                if (s[0] === '/') { s = s.slice(1); break; }
                if (s[0] === '\\') { s = s.slice(1); }
                if (t) { b[t-1] += s[0]; s = s.slice(1); }
                else { yield s[0]; s = s.slice(1); }
                while (s && s.includes(b[0])) { s = s.replace(b[0], b[1]); }
            }
        }
    }
}

function disp(inp) {
    var gen = S(inp);
    isNext = true;
    while (isNext) {
        console.log(isNext = gen.next().value);
        console.log(isNext)
    }
}
*/



/*

If the program is empty, execution halts.
Else, if the first character is \, do something with the next character (if present) and remove both from the program.
Else, if the first character is /, remove it, and change to the next state.
Else, do something with the first character and remove it from the program.
Repeat.


*/
var MAX_ITERS = 128;

function init() {
    document.getElementById('input').addEventListener('keydown', function(e) {
        if (e.keyCode == 13 && e.shiftKey)
        {
        e.preventDefault();
        run();
        }
        console.log(e);
    });
}

function slash(prog) {

    // Accumulator for generated explanatory HTML
    var all = "<span class='inputPost'>Input:</span> <span class='input'>"+prog+'</span><br>';

    // Accumulator for actual output from the slashes program
    var res = "";

    // Accumulator for string to be printed in state 0
    var print = "";

    var state = 0;
    var pattern = "";
    var replacement = "";



    function doSomething() {
        curr = prog[0];
        if (state == 0) { print += curr; }
        if (state == 1) { pattern += curr; }
        if (state == 2) { replacement += curr; }
    }

    function logPrint() {
        all += "<span class='printPost'>Print:<span> " + print + "<br>";
    }

    function logApply() {
        all += "<span class='applyPost'>Apply:</span> " + 
                "<span class='slash'>/</span>"          + "<span class='pattern'>"     +   pattern   + "</span>" +
                "<span class='slash'>/</span>"          + "<span class='replacement'>" + replacement + "</span>" + 
                "<span class = 'slash'>/</span>"        + prog + "<br>";
    }

    while (prog) {
        console.log(prog);
    var curr = prog[0];
    // all += prog + '\n';
        // console.log(pattern);
        // Just for displaying
        if (state == 1 && print!="") { logPrint(); res += print; print = ""; }
        if (state == 3) {
            var isVerbose = document.getElementById("verbose").checked;
            var iters = 0;
            while (prog.includes(pattern)) {
                if (iters > MAX_ITERS) { print+='...'; break; }
                iters++;
                prog = prog? prog.replace(pattern, replacement) : prog;
                // Just `prog = prog.replace(pat, rep);` might be good enough
                // Was trying to get rid of the null character that was printing
                // Thought maybe the replacement with an empty string pattern was undefined
                if (isVerbose) { logApply(); }
            }
            if (!isVerbose) { logApply(); }
            pattern = ""; replacement = "";
            state = 0;
            console.log(curr);
        }
        else {
            if (curr == '\\') { prog = prog.slice(1); doSomething(); }
            else if (curr == '/') { state++; }
            else { doSomething(); }
            prog = prog.slice(1);
        }
    }
    // In case program ended in state 0 and there's still stuff to be printed
    if (print!="") { logPrint(); res += print; print = ""; }
    return all+"<span class='outputPost'>Output:</span> <span class='output'>"+res+'</span>';

}

// var newline = "\n";
// var newline = "|";
// var newline = "\\n";
// var newline = "¶";
// var newline = "␤";
// var newline = "␍";
var newline = "⏎";

function run() {
    var input = document.getElementById("input");
    var output = document.getElementById("output");
    var result = slash(input.value);
    output.innerHTML = result.replace(/\n/g, "<span class='newline'>"+newline+"</span>");//.replaceAll("\n", "<br>");
}

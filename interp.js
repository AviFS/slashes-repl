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

function slash(prog) {

    var res = "";

    var state = 0;
    var pattern = "";
    var replacement = "";



    function doSomething() {
        if (state == 0) { res += curr; }
        if (state == 1) { pattern += curr; }
        if (state == 2) { replacement += curr; }
    }


    while (prog) {
    var curr = prog[0];
        console.log(pattern);
        if (state == 3) {
            while (prog.includes(pattern)) { prog = prog? prog.replace(pattern, replacement) : prog; }
            pattern = ""; replacement = "";
            state = 0;
            console.log(curr);
        }
        else {
            if (curr == '\\') { doSomething(); prog = prog.slice(1); }
            else if (curr == '/') { state++; }
            else { doSomething(); }
            prog = prog.slice(1);
        }
    }
    return res;

}
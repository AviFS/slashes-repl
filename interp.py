def S(s):
  res = ""
  while s:
    b = ["","",1]
    for t in (0,1,2):
    #   print(b[-1])
      while s:
        if s[0] == "/" :      s = s[1:]; break
        if s[0] == "\\":      s = s[1:]
        if t: b[t-1] += s[0]; s = s[1:]
        else: res+=s[0]; s = s[1:]
    while s and b[0] in s: s = s.replace(*b)
    return s[0]


print(S(r"/!/\/.\\0\/,\\,0,\\,1\/\/.\\1\/,\\,0\/\/,\\,\/.\/\/+\\+\/=\\=.\\1-\/\/=\\=\/+\\+\//!!!!!!!!!/.///+\+///-/\\\///0/1//1/*/++.1"))

res = "asd"
v = "ags"
for i in v:
    res+=i
print(res)
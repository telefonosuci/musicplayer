//Add "format" method to the string class
//supports:  "Welcome {0}. You are the first person named {0}".format("David");
//       and "First Name:{} Last name:{}".format("David","Wazy");
//       and "Value:{} size:{0} shape:{1} weight:{}".format(value, size, shape, weight)
String.prototype.format = function () {
    var content = this;
    for (var i = 0; i < arguments.length; i++) {
        var target = '{' + i + '}';
        content = content.split(target).join(String(arguments[i]))
        content = content.replace("{}", String(arguments[i]));
    }
    return content;
}


console.error = function () {
    
}
function info() {
    console.log("Інструкція з використання");
    console.log("Позначення - " + "Що позначає");
    console.log("leg - " + "катет");
    console.log("hypotenuse - " + "гіпотенуза");
    console.log("adjacent angle  - " + "прилеглий до катета кут");
    console.log("opposite angle  - " + "протилежний до катета кут");
    console.log("angle - " + "один з двох гострих кутів(коли задана гіпотенуза");
    console.log("");
}
function triangle(argument_1, type_1, argument_2, type_2) {
    var a, b, c, alpha, beta;
    // type_1 = document.getElementById("type_1").value;
    // type_2 = document.getElementById("type_2").value;
    // argument_1 = document.getElementById("argument_1").value;
    // argument_2 = document.getElementById("argument_2").value;
    if(type_1 == "leg" && type_2 == "leg") {
        a = argument_1;
        b = argument_2;
        c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        alpha = Math.asin(a/c);
        beta = Math.acos(a/c);
    } else if (type_1 == "leg" && type_2 == "hypotenuse") {
        a = argument_1;
        c = argument_2;
        b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        alpha = Math.atan(a/b);
        beta = Math.atan(b/a);
    } else if(type_1 == "leg" && type_2 == "adjacent angle") {
        a = argument_1;
        beta = argument_2;
        c = a / (Math.cos(beta * Math.PI/180));
        b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        alpha = (90 * Math.PI / 180) - beta;
    } else if(type_1 == "leg" && type_2 == "opposite angle") {
        a = argument_1;
        alpha = argument_2;
        c = a / (Math.sin(alpha * Math.PI/180));
        b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        beta = (90 * Math.PI / 180) - alpha;
    } else if(type_1 == "hypotenuse" && type_2 == "angle") {
        c = argument_1;
        beta = argument_2;
        alpha = (90 * Math.PI / 180) - beta;
        a = c * Math.sin(alpha * Math.PI/180);
        b = c * Math.sin(beta * Math.PI/180);
    } else if(type_1 == "hypotenuse" && type_2 == "leg") {
        c = argument_1;
        a = argument_2;
        b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        alpha = Math.atan(a/b);
        beta = Math.atan(b/a);
    } else if(type_1 == "adjacent angle" && type_2 == "leg") {
        beta = argument_1;
        a = argument_2;
        c = a / (Math.cos(beta * Math.PI/180));
        b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        alpha = (90 * Math.PI / 180) - beta;
    } else if(type_1 == "opposite angle" && type_2 == "leg") {
        alpha = argument_1;
        a = argument_2;
        c = a / (Math.sin(alpha * Math.PI/180));
        b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        beta = (90 * Math.PI / 180) - alpha;
    } else if(type_1 == "angle" && type_2 == "hypotenuse") {
        beta = argument_1;
        c = argument_2;
        alpha = (90 * Math.PI / 180) - beta;
        a = c * Math.sin(alpha * Math.PI/180);
        b = c * Math.sin(beta * Math.PI/180);
    } else {
        return "Zero or negative input";
    }
    if (argument_1 <= 0 || argument_2 <= 0) {
        return "Zero or negative input";
    }
    if(type_1 == "leg" && type_2 == "hypotenuse" && argument_1 >= argument_2) {
        return "Zero or negative input";
    }
    if(argument_1 > 90 || argument_2 > 90) {
        return "Zero or negative input";
    }
    console.info(argument_1, type_1, argument_2, type_2);
    return "a = " + a + "\nb = " + b + "\nc = " + c + "\nalpha = " + alpha + "\nbeta = " + beta + "\nsuccess!";

}
info();
$('.button').on('click', function () {
    console.log(triangle());
});
console.log(triangle(7, "leg", 40, "hypotenuse"));
console.log(triangle(22, "leg", 9, "hypotenuse"));
console.log(triangle(50, "hypotenuse", 10, "angle"));
console.log(triangle(2, "leg", 60, "opposite angle"));




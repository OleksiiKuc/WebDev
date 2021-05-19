function Task_1() {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
  console.log("%cСелекціонування імен за першою літерою.(Якщо перша літера J or j)", "color: green;");
  for (var item in names) {
    if (names[item].charAt(0) === "J" || names[item].toLowerCase().charAt(0) === "j") {
      speakBye(names[item]);
    } else {
      speakHello(names[item]);
    }
  }
}
Task_1();

function Task_2() {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
  console.log("%cСелекціонування імен за останньою літерою.(Якщо остання літера A or a)", "color: green;");
  for(var item in names) {
    if(names[item].slice(-1) === "A" || names[item].toLowerCase().slice(-1) === "a") {
      speakBye(names[item]);
    } else {
      speakHello(names[item]);
    }
  }
}
Task_2();

function Task_3() {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
  console.log("%cЯкщо сума літер імен менша за 5.", "color: green;");
  for(var item in names) {
    var splitNames = names[item].split('');
    console.log("сума літер: " + splitNames.length);
    if(splitNames.length < 5) {
      speakBye(names[item]);
    } else {
      speakHello(names[item]);
    }
  }
}
Task_3();



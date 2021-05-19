(function () {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim", "Anna"];
  var byeSpeak = speakBye();
  var helloSpeak = speakHello();

  console.log("%cСелекціонування імен за першою літерою.(Якщо перша літера J or j)", "color: green;");
  names.forEach(item => {
    if (item.charAt(0) === "J" || item.toLowerCase().charAt(0) === "j") {
      byeSpeak(item);
    } else {
      helloSpeak(item);
    }
  });

  console.log("%cСелекціонування імен за останньою літерою.(Якщо остання літера A or a)", "color: green;");
  names.forEach(item => {
    if(item.slice(-1) === "A" || item.toLowerCase().slice(-1) === "a") {
      byeSpeak(item);
    } else {
      helloSpeak(item);
    }
  });

  console.log("%cЯкщо сума літер імен менша за 5.", "color: green;");
  names.forEach(item => {
    var splitNames = item.split("");
    console.log("сума літер: " + splitNames + " = " + splitNames.length);
    if(splitNames.length < 5) {
      byeSpeak(item);
    } else {
      helloSpeak(item);
    }
  });
}());



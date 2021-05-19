function speakHello() {
  var speakWord = "Hello";

  function speak(name) {
    console.log(speakWord + " " + name);
  }
  return speak;
}
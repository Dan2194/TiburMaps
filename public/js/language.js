document.addEventListener("DOMContentLoaded", function() {
  var text = ["Choose the language", "選擇語言", "Choisissez la langue", "Alegeți limba", "Виберіть мову", "Scegli la lingua"];
  var counter = 0;
  var elem = document.getElementById("changeText");
  var inst = setInterval(change, 5000);

  function change() {
    elem.innerHTML = text[counter];
    counter++;
    if (counter >= text.length) {
      counter = 0;
      // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
    }
  }
});

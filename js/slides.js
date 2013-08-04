(function () {
  var state = false;
  var cursor_visible = true;
  var cursor_value = '&nbsp';
  var endState = null;
  Reveal.addEventListener("slidechanged", function (ev) {
    state = ev.currentSlide.dataset.state;
    if (endState) {
      endState();
      endState = null;
    }
    console.log("slide changed: "+state);
    switch (ev.currentSlide.dataset.state) {
      case "allgui":
        allgui();
        break;
      case "demo":
        demo();
        break;
      default:
        Reveal.focus();
        break;
    }
  });

  function demo() {
    console.log("demo")
    Josh.Example.focus();
    $(document).keydown(function (event) {
      if(event.keyCode == 27) {
        Josh.Example.blur();
      }
    });
  }

  function allgui() {
    Reveal.blur();
    console.log("all gui and no cli...")
    var $allgui = $("#allgui");
    var $text = $("#allgui-text");
    var idx = 0;
    var text = "All GUI and no CLI makes arne a dull boy. ";
    var typed = "";
    $text.html(typed+'<span class="cursor">'+cursor_value+'</span>');
    $(document).keydown(function (event) {
      if(event.keyCode == 27) {
        console.log("done with all gui");
        $allgui.hide();
        $(document).unbind("keydown");
        Reveal.focus();
        return;
      }
      if (idx >= text.length) {
        idx = 0;
      }
      var c = text[idx];
      typed += c;
      console.log("appending: "+ c)
      $text.html(typed+'<span class="cursor">'+cursor_value+'</span>');
      idx++;
    });

    function blinkCursor() {
      window.setTimeout(function () {
        if (state !== "allgui") {
          return;
        }
        cursor_visible = !cursor_visible;
        if (cursor_visible) {
          cursor_value = '&#10073;';
        } else {
          cursor_value = '&nbsp;';
        }
        $("#allgui-text .cursor").html(cursor_value);
        blinkCursor();
      }, 500);
    }
    $allgui.show();
    blinkCursor();
  }
})();

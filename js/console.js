/*------------------------------------------------------------------------*
 * Copyright 2013 Arne F. Claassen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *-------------------------------------------------------------------------*/
(function (root, $, _) {
  var shell = Josh.Shell();
  shell.setCommandHandler("fixup", {
    exec: function (cmd, args, callback) {
      $("#allthethings-title").html("CLI all the things");
      $("#allthethings-img").attr("src", "img/xallthey.png");
      callback("Ok");
    },
    completion: function (cmd, arg, line, callback) {
      callback(shell.bestMatch(arg, ["meme"]));
    }
  });
  shell.onNewPrompt(function(callback) {
    callback("josh $");
  });
  $(document).ready(function () {
    var $consolePanel = $('#shell-panel');
    $consolePanel.resizable({ handles: "s"});
    $(document).keypress(function (event) {
      if (shell.isActive()) {
        return;
      }
      if (event.keyCode == 126) {
        event.preventDefault();
        shell.activate();
        $consolePanel.slideDown();
        $consolePanel.focus();
        Josh.Example.blur();
        Reveal.blur();
      }
    });
    function hideAndDeactivate() {
      shell.deactivate();
      Reveal.focus();
      $consolePanel.slideUp();
      $consolePanel.blur();
    }

    shell.onEOT(hideAndDeactivate);
    shell.onCancel(hideAndDeactivate);
  });
})(this, $, _);
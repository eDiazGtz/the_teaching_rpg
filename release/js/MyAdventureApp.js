

var ready = (callback) => {
    if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => new StageManager().start());

/*


Chase by Alexander Nakarada | https://www.serpentsoundstudios.com
Music promoted by https://www.chosic.com/free-music/all/
Attribution 4.0 International (CC BY 4.0)
https://creativecommons.org/licenses/by/4.0/
*/
let EVALJS = {
  refresh() {
    for (i of document.querySelectorAll(`[eval-text]`)) {
      i.innerText = eval(i.attributes[`eval-text`].value)
    }
    for (i of document.querySelectorAll(`[eval-class]`)) {
      i.classList = eval(i.attributes[`eval-class`].value)
    }
  },
}

window.onload = () => { setInterval(EVALJS.refresh, 5) }
const message = document.getElementById('message')
chrome.tabs.query({active: true, currentWindow: true}).then(tabs => {
  chrome.scripting.executeScript({
    target: {tabId: tabs[0].id},
    files: ['popup/copy.js']
  })
    .then((results) => {
      const result = results[0].result
      const messageText = result.message
      if (result.success) {
        message.innerHTML = `<span style="color:green">Copied!<br>${messageText}</span>`
      } else {
        message.innerHTML = `<span style="color:red">Faild:<br>${messageText}</span>`
      }
    })
})


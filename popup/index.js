(async () => {
  const message = document.getElementById('message')
  let results
  try {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true})
    results = await chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      files: ['popup/extract.js']
    })
  } catch (e) {
    message.innerHTML = `<span style="color:red">Faild:<br>${e.message}</span>`
    return
  }

  const {richText} = results[0].result

  try {
    message.innerHTML = `<span style="color:green">Copied!<br>${richText}</span>`
  } catch (e) {
    message.innerHTML = `<span style="color:red">Faild:<br>${e.message}</span>`
  }
})()


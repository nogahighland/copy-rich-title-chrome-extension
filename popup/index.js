const message = document.getElementById('message')
const copy = async () => {
  let results
  const tabs = await chrome.tabs.query({active: true, currentWindow: true})
  results = await chrome.scripting.executeScript({
    target: {tabId: tabs[0].id},
    files: ['popup/extract.js']
  })

  if (results[0].result.error) {
    throw new Error(results[0].result.error)
  }

  const {richText} = results[0].result
  message.innerHTML = `<span style="color:green">Copied!<br>${richText}</span>`
}

copy().catch((e) => {
  message.innerHTML = `<span style="color:red">Faild:<br>${e.message}</span>`
})

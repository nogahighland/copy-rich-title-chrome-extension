(async function copyToClipboard() {
  let blob, blobPlain

  if (/aws.amazon.com$/.test(location.host)) {
    const title = document.querySelector('title').innerText
    let roleNameAndAccount = document.querySelector('#nav-usernameMenu').innerText.split(" @ ");
    if (roleNameAndAccount.length === 1) {
      roleNameAndAccount = document.querySelector('#nav-usernameMenu').innerText.split("+@+");
    }
    const switchRoleURL = `https://signin.aws.amazon.com/switchrole?roleName=${roleNameAndAccount[0]}&account=${roleNameAndAccount[1]}&from=switch-role-ins-chrome-extension`
    blob = new Blob(
      [
        '<ul>',
        `<li><a href="${location.href}">${title}</a></li>`,
        `<li><a href="${switchRoleURL}">Switch Role URL</a>(<code>${roleNameAndAccount[0]}@${roleNameAndAccount[1]}</code>)`,
        '</ul>'
      ],
      {type: 'text/html'}
    )
    blobPlain = new Blob(
      [
        `- [${title.replace(/ /g, '')}](${location.href})`,
        "\n",
        `- [SwitchRoleURL\`${roleNameAndAccount[0]}@${roleNameAndAccount[1]}\`](${switchRoleURL})`
      ],
      {type: 'text/plain'}
    )
  } else {
    const title = document.querySelector('title').innerText
      .replace(' | finatextgroup Kibela', '') // Kibela
      .replace(/ · .+/, '') // GitHub
    const url = location.href
    const body = `<a href="${url}"/>${title}</a>`
    blob = new Blob([body], {type: 'text/html'})
    blobPlain = new Blob([body], {type: 'text/plain'})
  }

  const items = [
    new window.ClipboardItem(
      {
        'text/html': blob,
        'text/plain': blobPlain
      }
    )
  ]

  try {
    await navigator.clipboard.write(items)
    const text = await blob.text()
    return {success: true, message: text}
  } catch (e) {
    return {success: false, message: e.message}
  }
})()


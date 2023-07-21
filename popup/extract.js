(async function extract() {
  let richText, plainText

  if (/aws.amazon.com$/.test(location.host)) {
    const title = document.querySelector('title').innerText
    let roleNameAndAccount = document.querySelector('#nav-usernameMenu').innerText.split(" @ ");
    if (roleNameAndAccount.length === 1) {
      roleNameAndAccount = document.querySelector('#nav-usernameMenu').innerText.split("+@+");
    }
    const switchRoleURL = `https://signin.aws.amazon.com/switchrole?roleName=${roleNameAndAccount[0]}&account=${roleNameAndAccount[1]}&from=switch-role-ins-chrome-extension`

    richText = [
      '<ul>',
      `<li><a href="${location.href}">${title}</a></li>`,
      `<li><a href="${switchRoleURL}">Switch Role URL</a>(<code>${roleNameAndAccount[0]}@${roleNameAndAccount[1]}</code>)`,
      '</ul>'
    ].join("\n")

    plainText = [
      `- [${title.replace(/ /g, '')}](${location.href})`,
      "\n",
      `- [SwitchRoleURL\`${roleNameAndAccount[0]}@${roleNameAndAccount[1]}\`](${switchRoleURL})`
    ].join("\n")

  } else {
    const title = document.querySelector('title').innerText
      .replace(/\|.*$/, '') // Kibela, terraform
      .replace(/·.*$/, '') // GitHub
    const url = location.href
    const body = `<a href="${url}"/>${title.trim()}</a>`
    richText = plainText = body
  }

  const item = new ClipboardItem(
    {
      'text/html': new Blob([richText], {type: 'text/html'}),
      'text/plain': new Blob([plainText], {type: 'text/plain'})
    }
  )

  try {
    await navigator.clipboard.write([item])
  } catch (e) {
    return {error: e.message}
  }

  return {richText, plainText}
})()

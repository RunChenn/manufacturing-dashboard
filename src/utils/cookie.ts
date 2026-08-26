const sameSite = 'SameSite=Lax'

export function setCookie(name: string, value: string, maxAgeSeconds: number) {
  const encodedName = encodeURIComponent(name)
  const encodedValue = encodeURIComponent(value)
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''

  document.cookie = `${encodedName}=${encodedValue}; Max-Age=${maxAgeSeconds}; Path=/; ${sameSite}${secure}`
}

export function getCookie(name: string) {
  const encodedName = `${encodeURIComponent(name)}=`
  const cookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith(encodedName))

  return cookie ? decodeURIComponent(cookie.slice(encodedName.length)) : null
}

export function deleteCookie(name: string) {
  document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=/; ${sameSite}`
}

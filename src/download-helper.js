import UAParser from 'ua-parser-js'

import linuxIcon from './img/linux.svg'
import macOsIcon from './img/macos.svg'
import windowsIcon from './img/windows@3x.png'

const currentOS = new UAParser().getOS()
const walletInstallers = [
  { os: 'Debian', icon: linuxIcon, ext: 'deb' },
  { os: 'Mac OS', icon: macOsIcon, ext: 'dmg' },
  { os: 'Ubuntu', icon: linuxIcon, ext: 'deb' },
  { os: 'Windows', icon: windowsIcon, ext: 'exe' }
]

export default function (desktopAppVersion) {
  const baseReleasetUrl = 'https://github.com/autonomoussoftware/metronome-wallet-desktop/releases'
  const downloadWalletUrl = `${baseReleasetUrl}/download/${desktopAppVersion}/metronome-desktop-wallet_${desktopAppVersion}`
  const walletInstaller = walletInstallers
    .find(installer => installer.os === currentOS.name)

  return {
    currentOS,
    baseReleasetUrl,
    downloadWalletUrl,
    walletInstaller,
    walletInstallers
  }
}

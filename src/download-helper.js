import UAParser from 'ua-parser-js'

import linuxIcon from './img/linux.png'
import macOsIcon from './img/macos.svg'
import windowsIcon from './img/windows.png'
import config from './config'

const currentOS = new UAParser().getOS()
const walletInstallers = [
  { os: 'Debian', icon: linuxIcon, ext: 'deb' },
  { os: 'Mac OS', icon: macOsIcon, ext: 'dmg' },
  { os: 'Ubuntu', icon: linuxIcon, ext: 'deb' },
  { os: 'Windows', icon: windowsIcon, ext: 'exe' }
]

const { desktopAppVersion } = config
const baseReleasetUrl = 'https://github.com/autonomoussoftware/metronome-wallet-desktop/releases'
const downloadWalletUrl = `${baseReleasetUrl}/download/${desktopAppVersion}/metronome-desktop-wallet_${desktopAppVersion}`
const walletInstaller = walletInstallers
  .find(installer => installer.os === currentOS.name)

export {
  currentOS,
  baseReleasetUrl,
  downloadWalletUrl,
  walletInstaller,
  walletInstallers
}

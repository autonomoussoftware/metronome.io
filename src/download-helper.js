import UAParser from 'ua-parser-js'

import linuxIcon from './img/linux.png'
import macOsIcon from './img/macos.svg'
import windowsIcon from './img/windows.png'

const currentOS = new UAParser().getOS()
const walletInstallers = [
  { os: 'Debian', icon: linuxIcon, ext: 'deb' },
  { os: 'Mac OS', icon: macOsIcon, ext: 'dmg' },
  { os: 'Ubuntu', icon: linuxIcon, ext: 'deb' },
  { os: 'Windows', icon: windowsIcon, ext: 'exe' }
]

const latestWalletVersion = 'v0.11.1'
const baseReleasetUrl = 'https://github.com/autonomoussoftware/metronome-wallet-desktop/releases'
const downloadWalletUrl = `${baseReleasetUrl}/download/${latestWalletVersion}/metronome-desktop-wallet_${latestWalletVersion}`
const walletInstaller = walletInstallers
  .find(installer => installer.os === currentOS.name)

export {
  currentOS,
  latestWalletVersion,
  baseReleasetUrl,
  downloadWalletUrl,
  walletInstaller,
  walletInstallers
}

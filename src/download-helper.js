import UAParser from 'ua-parser-js'

import windowsIcon from './img/windows@3x.png'
import androidIcon from './img/android.svg'
import linuxIcon from './img/linux.svg'
import macOsIcon from './img/macos.svg'
import iosIcon from './img/ios.svg'
import config from './config'

const currentOS = new UAParser().getOS()

export default function(desktopAppVersion) {
  const baseReleaseUrl =
    'https://github.com/autonomoussoftware/metronome-wallet-desktop/releases'
  const downloadWalletUrl = `${baseReleaseUrl}/download/${desktopAppVersion}/metronome-desktop-wallet_${desktopAppVersion}`

  const walletInstallers = {
    Debian: { icon: linuxIcon, url: `${downloadWalletUrl}.deb` },
    'Mac OS': { icon: macOsIcon, url: `${downloadWalletUrl}.dmg` },
    Ubuntu: { icon: linuxIcon, url: `${downloadWalletUrl}.deb` },
    Windows: { icon: windowsIcon, url: `${downloadWalletUrl}.exe` },
    Android: { icon: androidIcon, url: config.googlePlayUrl },
    iOS: { icon: iosIcon, url: config.appStoreUrl }
  }

  return {
    walletInstaller: walletInstallers[currentOS.name],
    walletInstallers,
    baseReleaseUrl,
    currentOS
  }
}

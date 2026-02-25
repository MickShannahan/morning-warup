import tickPath from '../assets/sounds/tick_sound.wav'
import completePath from '../assets/sounds/ui_complete.wav'
import coinPath from '../assets/sounds/etro-coin-collect.wav'
import endedPath from '../assets/sounds/urara_xC0V6sg.mp3'

const sounds = {
  tick: tickPath,
  complete: coinPath,
  ended: endedPath
} as const

type SoundKey = keyof typeof sounds

export function playSoundEffect(sfx: SoundKey): void {
  if (!sounds[sfx]) {
    console.warn(`Sound effect "${sfx}" not found`)
    return
  }

  try {
    const audio = new Audio(sounds[sfx])
    audio.volume = 1

    audio.play().catch(err => {
      console.error(`Failed to play sound: ${sfx}`, err)
    })

    audio.addEventListener('ended', () => {
      audio.remove()
    }, { once: true })

    document.body.appendChild(audio)
  } catch (error) {
    console.error(`Error playing sound effect: ${sfx}`, error)
  }
}
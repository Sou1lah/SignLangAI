#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
destination="$root/thirdparty"
mkdir -p "$destination"

clone() {
  local name="$1"
  local url="$2"
  local target="$destination/$name"

  if [[ -d "$target/.git" ]]; then
    printf 'Already cloned: %s\n' "$name"
  elif [[ -e "$target" ]]; then
    printf 'Refusing to overwrite existing path: %s\n' "$target" >&2
    return 1
  else
    git clone --depth 1 "$url" "$target"
  fi
}

clone librelingo https://github.com/LibreLingo/LibreLingo.git
clone duolingo-clone https://github.com/sanidhyy/duolingo-clone.git
clone sign-translate https://github.com/sign/translate.git
clone openhands https://github.com/AI4Bharat/OpenHands.git
clone mediapipe https://github.com/google-ai-edge/mediapipe.git
clone livekit https://github.com/livekit/livekit.git
clone ts-fsrs https://github.com/open-spaced-repetition/ts-fsrs.git
clone wlasl https://github.com/dxli94/WLASL.git

printf '%s\n' 'The sign-language-processing link is an organization, not a Git repository; clone a specific project from it manually.'

#!/bin/bash
# Grab a headshot and install it as the About-page portrait.
#
#   ./scripts/grab-portrait.sh              # from the clipboard
#   ./scripts/grab-portrait.sh <file>       # from a file path
#
# Handles a clipboard holding raw image data (copied from a browser or
# Preview) or a file reference (copied in Finder).

set -euo pipefail
cd "$(dirname "$0")/.."
DEST_DIR="public/about"
SRC="$DEST_DIR/source.png"
mkdir -p "$DEST_DIR"

if [ $# -ge 1 ]; then
  if [ ! -f "$1" ]; then echo "No such file: $1" >&2; exit 1; fi
  cp "$1" "$SRC"
  echo "Copied from $1"
else
  # 1) raw image data on the clipboard
  if osascript -e "set f to (open for access POSIX file \"$PWD/$SRC\" with write permission)" \
               -e 'write (the clipboard as «class PNGf») to f' \
               -e 'close access f' 2>/dev/null && [ -s "$SRC" ]; then
    echo "Grabbed image data from the clipboard"
  else
    rm -f "$SRC"
    # 2) a file copied in Finder
    CLIP_PATH=$(osascript -e 'POSIX path of (the clipboard as «class furl»)' 2>/dev/null || true)
    if [ -n "$CLIP_PATH" ] && [ -f "$CLIP_PATH" ]; then
      cp "$CLIP_PATH" "$SRC"
      echo "Grabbed file from the clipboard: $CLIP_PATH"
    else
      echo "Nothing usable on the clipboard." >&2
      echo "Copy the image itself (right-click the image -> Copy Image, or select the file in Finder and press Cmd+C), then run this again." >&2
      echo "Or pass a path:  ./scripts/grab-portrait.sh ~/Downloads/headshot.png" >&2
      exit 1
    fi
  fi
fi

python3 scripts/make-portrait.py "$SRC"
echo
echo "Done. Tell Claude and it will verify the framing and deploy."

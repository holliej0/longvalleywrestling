#!/bin/bash
# Downloads the site images from the current WordPress site into assets/img/.
# Run this once from the repo root:   bash download-assets.sh
set -e
cd "$(dirname "$0")"
mkdir -p assets/img
B="https://www.longvalleywrestling.com/wp-content/uploads"

get () { echo "  $1"; curl -fsSL -o "assets/img/$1" "$2"; }

echo "Downloading images..."
get logo.png              "$B/2026/08/LVWrestling_2026.png"
get icon.png              "$B/2024/11/icon.png"
get registration-2026.png "$B/2026/08/ChatGPT-Image-Aug-28-2026-02_54_31-PM.png"
get estebuilt.png         "$B/2026/04/estebuilt.png"
get img_4127.jpg          "$B/2026/08/IMG_4127.jpg"
get img_1871.jpg          "$B/2026/08/IMG_1871.jpg"
get img_4093-2.jpg        "$B/2026/08/IMG_4093-2.jpg"
get img_1521.jpg          "$B/2026/08/IMG_1521.jpg"
get img_5136.jpg          "$B/2026/08/IMG_5136.jpg"
get img_5135.jpg          "$B/2026/08/IMG_5135.jpg"
get img_5132.jpg          "$B/2026/08/IMG_5132.jpg"
get wrestling-team3.png   "$B/2026/04/wrestling-team3.png"
get wrestling-team.png    "$B/2026/04/wrestling-team.png"
get wrestlers.png         "$B/2026/04/wrestlers.png"
get team-huddle.jpg       "$B/2024/11/325905338_883801412659007_3596544713226575971_n-e1733326322552.jpg"

# Program Overview
get program-1.jpg         "$B/2024/11/programoverview2.jpg"
get program-3.jpg         "$B/2024/11/programoverview3.jpg"
get program-cta.jpg       "$B/2024/11/430680147_913249473923025_4409660943965756890_n.jpg"

# Store
get store.png             "$B/2025/09/store.png"

# Coaches Corner headshots
get coach-lloyd.jpg       "$B/2024/11/Lloyd.jpeg"
get coach-tommy.jpg       "$B/2025/09/Tommy.jpg"
get coach-keith.jpg       "$B/2023/11/405762059_856891419558831_5395085744260644354_n.jpg"
get coach-john.jpg        "$B/2025/09/John.jpg"
get coach-jeremy.jpg      "$B/2025/09/Jeremy.jpg"
get coach-justin.jpg      "$B/2025/09/Justin-1.jpg"

echo
echo "Done. $(ls assets/img | wc -l | tr -d ' ') files in assets/img/"
echo "Now: git add assets/img && git commit -m 'Add images' && git push"

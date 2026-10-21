#!/bin/bash
mkdir -p qa/lighthouse
BASE="http://localhost:3000"
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
run() {
  npx --yes lighthouse "${BASE}$1" --chrome-flags="--headless --no-sandbox --disable-gpu" --output=json --output-path="qa/lighthouse/$2.json" --quiet 2>/dev/null
  echo "done $2"
}
run "/" home-mobile
run "/services/ikea-furniture-assembly/" service-mobile
run "/locations/markham/" location-mobile
run "/blog/furniture-assembly-cost-toronto/" blog-mobile
run "/contact/" contact-mobile
run "/projects/" projects-mobile
npx --yes lighthouse "${BASE}/" --preset=desktop --chrome-flags="--headless --no-sandbox --disable-gpu" --output=json --output-path="qa/lighthouse/home-desktop.json" --quiet 2>/dev/null
echo "done home-desktop"
echo "ALL LIGHTHOUSE DONE"

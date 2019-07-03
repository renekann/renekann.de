#!/bin/sh

function convert2fresh {
  hackmyresume convert ../data/resume.json TO resume-fresh.json
}

function pdf {
  hackmyresume build ../data/resume.json TO out/resume-renekann-mobile-developer.html -t themes/node_modules/jsonresume-theme-rocketspacer-tweaked
  wkhtmltopdf --print-media-type out/resume-renekann-mobile-developer.html out/resume-renekann-mobile-developer.pdf
}

function word {
  hackmyresume build ../data/resume.json TO out/resume.doc -t mythemes/themes/compact
}

function install {
  echo "install $1"
  cd themes
  npm install $1
  cd ..
}

function main {
    Command=$1
    shift
    case "${Command}" in
        word)  word $@ ;;
        pdf)  pdf $@ ;;
        i)  install $@ ;;
        c2f)  convert2fresh $@ ;;
        *)      echo "Usage: $0 {build|up|down|log|sh}" ;;
    esac
}

main $@
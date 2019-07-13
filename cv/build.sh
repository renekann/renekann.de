#!/bin/sh

function convert2fresh {
  hackmyresume convert ../data/resume.json TO resume-fresh.json
}

function pdf {
  hackmyresume build ../data/resume.json TO out/resume-renekann-mobile-developer.html -t themes/node_modules/jsonresume-theme-rocketspacer-tweaked
  #hackmyresume build ../data/resume.json TO out/resume-renekann-mobile-developer.html -t themes/node_modules/jsonresume-theme-classy
  #hackmyresume build ../data/resume.json TO out/resume-renekann-mobile-developer.html -t themes/node_modules/jsonresume-theme-flat
  #hackmyresume build ../data/resume.json TO out/resume-renekann-mobile-developer.html -t themes/node_modules/jsonresume-theme-onepage-wide
  wkhtmltopdf --print-media-type \
  out/resume-renekann-mobile-developer.html out/resume-renekann-mobile-developer.pdf
  
  cp out/resume-renekann-mobile-developer.pdf ~/Library/Mobile\ Documents/com~apple~CloudDocs/
  mv out/resume-renekann-mobile-developer.pdf ../static/
  
  rm out/resume-renekann-mobile-developer.html
}

function word {
  hackmyresume build ../data/resume.json TO out/resume-renekann-mobile-developer.doc -t mythemes/word
  cp out/resume-renekann-mobile-developer.doc ~/Library/Mobile\ Documents/com~apple~CloudDocs/
  mv out/resume-renekann-mobile-developer.doc ../static/
}

function all {
  pdf
  word
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
        all)  all $@ ;;
        *)      echo "Usage: $0 {build|up|down|log|sh}" ;;
    esac
}

main $@
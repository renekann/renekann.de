#!/bin/sh

RESUME_EN="en/resume.json"
RESUME_DE="de/resume.json"
FILENAME_ENGLISH="resume-renekann-mobile-developer-english"
FILENAME_GERMAN="resume-renekann-mobile-developer-deutsch"

function convert2fresh {
  hackmyresume convert ../data/$RESUME_EN TO resume-fresh-en.json
  hackmyresume convert ../data/$RESUME_DE TO resume-fresh-de.json
}

function pdf {
  hackmyresume build ../data/$RESUME_EN TO out/$FILENAME_ENGLISH.html -t themes/node_modules/jsonresume-theme-rocketspacer-tweaked
  hackmyresume build ../data/$RESUME_DE TO out/$FILENAME_GERMAN.html -t themes/node_modules/jsonresume-theme-rocketspacer-tweaked
  #hackmyresume build ../data/resume.json TO out/resume-renekann-mobile-developer.html -t themes/node_modules/jsonresume-theme-classy
  #hackmyresume build ../data/resume.json TO out/resume-renekann-mobile-developer.html -t themes/node_modules/jsonresume-theme-flat
  #hackmyresume build ../data/resume.json TO out/resume-renekann-mobile-developer.html -t themes/node_modules/jsonresume-theme-onepage-wide
  wkhtmltopdf --print-media-type out/$FILENAME_ENGLISH.html out/$FILENAME_ENGLISH.pdf
  wkhtmltopdf --print-media-type out/$FILENAME_GERMAN.html out/$FILENAME_GERMAN.pdf
  
  cp out/$FILENAME_ENGLISH.pdf ~/Library/Mobile\ Documents/com~apple~CloudDocs/
  cp out/$FILENAME_GERMAN.pdf ~/Library/Mobile\ Documents/com~apple~CloudDocs/
  
  mv out/$FILENAME_ENGLISH.pdf ../static/
  mv out/$FILENAME_GERMAN.pdf ../static/
  
  rm out/$FILENAME_ENGLISH.html
  rm out/$FILENAME_GERMAN.html
}

function word {
  hackmyresume build ../data/$RESUME_EN TO out/$FILENAME_ENGLISH.doc -t mythemes/word
  hackmyresume build ../data/$RESUME_DE TO out/$FILENAME_GERMAN.doc -t mythemes/word
  
  cp out/$FILENAME_ENGLISH.doc ~/Library/Mobile\ Documents/com~apple~CloudDocs/
  cp out/$FILENAME_GERMAN.doc ~/Library/Mobile\ Documents/com~apple~CloudDocs/
  
  mv out/$FILENAME_ENGLISH.doc ../static/
  mv out/$FILENAME_GERMAN.doc ../static/
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
        *)      echo "Usage: $0 {word|pdf|i|c2f|all}" ;;
    esac
}

main $@
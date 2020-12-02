#!/bin/sh

RESUME_EN="en/resume.json"
RESUME_DE="de/resume.json"
FILENAME_ENGLISH="resume-renekann-mobile-developer-english"
FILENAME_GERMAN="resume-renekann-mobile-developer-deutsch"

function convert2fresh {
  hackmyresume convert ../data/$RESUME_EN TO resume-fresh-en.json
  hackmyresume convert ../data/$RESUME_DE TO resume-fresh-de.json
}

function exportIndexJs {
  export RESUME_FILE="resume_$1.hbs"
  export RESUME_LOCALE="$2"
  MYVARS='$RESUME_FILE:$RESUME_LOCALE'

  envsubst "$MYVARS" < "mythemes/jsonresume-theme-macchiato-ibic/templates/index.js" > "mythemes/jsonresume-theme-macchiato-ibic/index.js"
}

function pdf {
  exportIndexJs pdf de
  kissmyresume build -f PDF ../data/$RESUME_DE -o out -n $FILENAME_GERMAN -t mythemes/jsonresume-theme-macchiato-ibic

  exportIndexJs pdf en
  kissmyresume build -f PDF ../data/$RESUME_EN -o out -n $FILENAME_ENGLISH -t mythemes/jsonresume-theme-macchiato-ibic

  cp out/$FILENAME_ENGLISH.pdf ~/Library/Mobile\ Documents/com~apple~CloudDocs/
  cp out/$FILENAME_GERMAN.pdf ~/Library/Mobile\ Documents/com~apple~CloudDocs/

  mv out/$FILENAME_ENGLISH.pdf ../static/
  mv out/$FILENAME_GERMAN.pdf ../static/
}

function word {
  exportIndexJs word de
  kissmyresume build -f DOCX ../data/$RESUME_DE -o out -n $FILENAME_GERMAN -t mythemes/jsonresume-theme-macchiato-ibic

  exportIndexJs word en
  kissmyresume build -f DOCX ../data/$RESUME_EN -o out -n $FILENAME_ENGLISH -t mythemes/jsonresume-theme-macchiato-ibic

  cp out/$FILENAME_ENGLISH.docx ~/Library/Mobile\ Documents/com~apple~CloudDocs/
  cp out/$FILENAME_GERMAN.docx ~/Library/Mobile\ Documents/com~apple~CloudDocs/

  mv out/$FILENAME_ENGLISH.docx ../static/
  mv out/$FILENAME_GERMAN.docx ../static/
}

function all {
  pdf
  word
}

function serve {
  #exportIndexJs word en
  #kissmyresume serve ../data/$RESUME_EN -t mythemes/jsonresume-theme-macchiato-ibic -p 3200

  exportIndexJs word de
  kissmyresume serve ../data/$RESUME_DE -t mythemes/jsonresume-theme-macchiato-ibic -p 3200
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
        serve)  serve $@ ;;
        all)  all $@ ;;
        *)      echo "Usage: $0 {word|pdf|i|c2f|all}" ;;
    esac
}

main $@

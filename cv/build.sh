#!/bin/sh

function convert2fresh {
  hackmyresume convert resume-jrs.json TO resume-fresh.json
}

function pdf {
  hackmyresume build resume-jrs.json TO out/resume.pdf -t positive
}

function word {
  hackmyresume build resume-jrs.json TO out/resume.doc -t mythemes/themes/compact
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
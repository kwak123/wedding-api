#! /bin/bash

PS3="Select Startup Mode"$'\n'
options=("Dev" "Prod")
select opt in "${options[@]}"
do
  case $opt in
    "Dev")
      docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
      break
      ;;
    "Prod")
      docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
      break
      ;;
    *) echo "Press 1 or 2"
  esac
done
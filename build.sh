#! /bin/bash
# Simple build script for now
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DIST=$DIR/dist
APP=$DIR/app
CP=("$APP/fonts" "$APP/js" "$APP/icons" "$APP/images" "$APP/styles" "$APP/upup.sw.min.js" "$APP/*.ico" "$APP/*.php" "$APP/*.html" "$APP/*.json" "$APP/*.xml")

rm -rf $DIST
mkdir $DIST

for file in "${CP[@]}"; do
  cp -r $file $DIST
done

ln -s $DIR/comics_generated $DIST/comics

vulcanize --inline-scripts --inline-css $APP/elements.html > $DIST/elements.html
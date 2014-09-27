#!/bin/bash

IMAGES=comics/*

count=0;
for img in $IMAGES
do
	loc=${img/comics\//}
	
	if [ ! -f www/comics/regular/$loc ];
	then
		echo "Generating regular $loc"
		convert comics/$loc -resize 600x600 www/comics/regular/$loc
	fi


	if [ ! -f www/comics/thumb/$loc ];
	then
		echo "Generating thumb $loc"
		convert comics/$loc -resize 128x128 www/comics/thumb/$loc
	fi

	count=$((count+1))
done

echo "Done. Processed $count comics."
echo "var MAX_IMG=$count;" > www/count.js

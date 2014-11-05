#!/bin/bash

FAUNA_IMAGES=comics/fauna/*
NUTS_IMAGES=comics/nuts/*

fcount=0;
ncount=0;
for img in $FAUNA_IMAGES
do
	loc=${img/comics\/fauna\//}
	
	if [ ! -f app/comics/fauna/regular/$loc ];
	then
		echo "Generating regular $loc"
		echo "convert comics/fauna/$loc -resize 600x600 app/comics/fauna/regular/$loc"
		convert comics/fauna/$loc -resize 600x600 app/comics/fauna/regular/$loc
		convert comics/fauna/$loc -resize 800x800 app/comics/fauna/regular/hi_$loc
	fi


	if [ ! -f app/comics/fauna/thumb/$loc ];
	then
		echo "Generating thumb $loc"
		convert comics/fauna/$loc -resize 128x128 app/comics/fauna/thumb/$loc
		convert comics/fauna/$loc -resize 256x256 app/comics/fauna/thumb/hi_$loc
	fi

	fcount=$((fcount+1))
done

for img in $NUTS_IMAGES
do
	loc=${img/comics\/nuts\//}
	
	if [ ! -f app/comics/nuts/regular/$loc ];
	then
		echo "Generating regular $loc"
		convert comics/nuts/$loc -resize 750x750 app/comics/nuts/regular/$loc
		convert comics/nuts/$loc -resize 950x950 app/comics/nuts/regular/hi_$loc
	fi


	if [ ! -f app/comics/nuts/thumb/$loc ];
	then
		echo "Generating thumb $loc"
		convert comics/nuts/$loc -resize 164x164 app/comics/nuts/thumb/$loc
		convert comics/nuts/$loc -resize 328x328 app/comics/nuts/thumb/hi_$loc
	fi

	ncount=$((ncount+1))
done


echo "Done. Processed $fcount fauna comics and $ncount nuts commics"
echo "var MAX_FAUNA_IMG=$fcount;" > app/count.js
echo "var MAX_NUTS_IMG=$ncount;" >> app/count.js
echo "var MAX_FAUNA_IMG=$fcount;" > dist/count.js
echo "var MAX_NUTS_IMG=$ncount;" >> dist/count.js

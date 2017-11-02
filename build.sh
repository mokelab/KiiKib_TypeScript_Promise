#!/bin/sh
cd src/api/impl
tsc -target es6 \
--locale ja \
KiiAppAPI.ts \
KiiUserAPI.ts \
KiiBucketAPI.ts \
KiiObjectAPI.ts \
KiiACLAPI.ts \
KiiServerAPI.ts \
KiiThingAPI.ts \
KiiAdminAPI.ts \
KiiThingIF.ts \
-d \
-out ../../../bin/KiiLib.js 

echo 'done!'
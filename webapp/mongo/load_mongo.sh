#!/bin/bash
mongorestore --db memories -c memories memories.bson
echo "loaded memories into mongodb"
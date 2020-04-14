#! /bin/bash
#pid削除
rm -rf /usr/src/app/tmp/pids/server.pid

# rails server
bundle exec rails server -b '0.0.0.0'
#!/bin/bash
LOG="/Users/ducksan/projects/monitor_your_work/log/minute.log"
PROJECT_PATH="/Users/ducksan/projects/hermes"

if [ ! -e $LOG ]; then
  touch $LOG
fi

TIME=$(date '+%F %T')
APP=$(osascript -e 'tell application "System Events" to get name of (processes where frontmost is true)')
BRANCH=$(cd $PROJECT_PATH && git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/')
TMUX=$(/usr/local/bin/tmux display-message -p '#W')

echo "$TIME $APP $BRANCH $TMUX" >> $LOG

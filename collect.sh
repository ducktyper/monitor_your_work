#!/bin/bash
LOG="collect.log"

if [ ! -e $LOG ]; then
  touch $LOG
fi

echo "hello" >> $LOG

#!/usr/bin/env python

import sys

current_word = None
current_count = {}
word = None

# input comes from STDIN
for line in sys.stdin:
    # remove leading and trailing whitespace
    line = line.strip()

    # parse the input we got from mapper.py
    word, value = line.split('\t', 1)

    # this IF-switch only works because Hadoop sorts map output
    # by key (here: word) before it is passed to the reducer
    if current_word == word:
        current_count[value] = cont.get(value, 0) + 1
    else:
        if current_word:
            # write result to STDOUT
            print(f"{current_word}\t{current_count}")
        current_count = {}
        current_count[value] = cont.get(value, 0) + 1
        current_word = word

# do not forget to output the last word if needed!
if current_word == word:
    print(f"{current_word}\t{current_count}")
#!/usr/bin/env python

import sys
import json

def question_01():
    for line in sys.stdin:
        line = line.strip()
        dict_line = json.loads(line)
        text = dict_line["text"]
        if text is not None:
            words = text.split()
            for word in words:
                print(f'{word}\t{1}')

def question_02(expression_size):
    for line in sys.stdin:
        line = line.strip()
        dict_line = json.loads(line)
        text = dict_line["text"]
        if text is not None:
            words = dict_line["text"].split()
            expression = ''
            word_counter = 0
            for i in range(0, len(words)):
                expression += f" {words[i]}"
                word_counter += 1
                if word_counter == expression_size:
                    print(f'{expression}\t{1}')
                    word_counter = 0
                    expression = ''

def question_03():
    for line in sys.stdin:
        line = line.strip()
        dict_line = json.loads(line)
        title = dict_line["title"]
        if title is not None:
            words = title.split()
            for word in words:
                print(f'{word}\t{1}')

def question_04():
    for line in sys.stdin:
        line = line.strip()
        dict_line = json.loads(line)
        date = dict_line["createdAt"]
        if date is not None:
            print(f'{date}\t{1}')

def main():
    #question_01()
    #question_02(expression_size=11)
    #question_03()
    #question_04()

main()

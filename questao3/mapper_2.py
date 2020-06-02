import sys
import json

HORA = 7
MSG = 1

def def_hour(hour):
    hour = int(hour)
    if hour > 4 and hour <= 12:
        return "Manhã"
    elif hour > 12 and hour <= 16:
        return "Tarde"
    else:
        return "Noite"
    
def get_hashtag(msg):
    tags = []
    for m in msg.split():
        if "#" == m[0]:
            tags.append(m)
    return tags

def question_01_a():
    for line in sys.stdin:
        line = line.strip()
        line = line.split("\t")
        
        cha = def_hour(line[HORA].split()[3].split(":")[0])
        
        if cha is not None:
            for word in get_hashtag(line[MSG]):
                print(f'{cha}\t{word}')

def question_01_b():
    for line in sys.stdin:
        line = line.strip()
        line = line.split("\t")

        cha = line[HORA].split()[2]
        
        if cha is not None:
            for word in get_hashtag(line[MSG]):
                print(f'{cha}\t{word}')

def question_01_c():
    for line in sys.stdin:
        line = line.strip()
        line = line.split("\t")

        cha = line[HORA].split()[2]
        val = line[HORA].split()[3].split(":")[0]

        if cha is not None:
            print(f'{cha}\t{word}')


def question_01_d():
    for line in sys.stdin:
        line = line.strip()
        line = line.split("\t")

        cha = "Dilma"
        val = line[MSG]

        if val is not None:
            if "dilma" in msg or "Dilma" in msg or "DILMA" in msg:
                for palavra in val.split():
                    if len(palavra) > 2: 
                        chave.append(cha)
                        valor.append(palavra)
                        print(f'{cha}\t{palavra}')


def question_01_d():
    for line in sys.stdin:
        line = line.strip()
        line = line.split("\t")

        cha = "Dilma"
        val = line[MSG]

        if val is not None:
            if "aécio" in msg or "aecio" in msg or "Aécio" in msg or "Aecio" in msg:
                for palavra in val.split():
                    if len(palavra) > 2: 
                        chave.append(cha)
                        valor.append(palavra)
                        print(f'{cha}\t{palavra}')

def main():
    question_01_a()

main()

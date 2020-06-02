import matplotlib.pyplot as plt
import sys

def question_04():
    date_dict = {}
    for line in sys.stdin:
        line.strip()
        date, count = line.split("\t")
        month = date.split(" ")[0]
        year = date.split(" ")[2]
        date_dict[month+"-"+year] = 0
        date_dict[month+"-"+year] += int(count)
    
    date_list = []
    count_list = []

    for month in date_dict:
        date_list.append(month)
        count_list.append(date_dict[month])
    
    x_units = [i for i in range(0, len(date_list))]

    plt.bar(x_units, count_list, tick_label=date_list,
            width=0.8, color=['red', 'green'])

    plt.xlabel('Months')
    plt.ylabel('Number of Reviews')
    plt.title('Reviews Bar Chart')

    plt.show()

def main():
    question_04()

if __name__ == "__main__":
    main()
import csv
FILENAME = "/home/vivekuchiha/vithack/workspace/processeddata.csv"
rows = []

with open(FILENAME, 'r') as csvfile:
    # creating a csv reader object
    csvreader = csv.reader(csvfile)

    # extracting field names through first row

    # extracting each data row one by one
    for row in csvreader:
        rows.append(row)

with open("/home/vivekuchiha/vithack/workspace/outfinal.csv", 'w') as csvfile:
    # creating a csv writer object
    csvwriter = csv.writer(csvfile)

    # writing the fields
    s = ""
    prev = rows[0][0]
    for i in rows:
        if(i[0]==prev):
            s = s + " " + i[1]
        else:
            s = s.split(" ")
            s = list(set(s))
            s = ' '.join(s)
            # print(s)
            csvwriter.writerow([prev, s])
            prev = i[0]
            s=i[1]


    # writing the data rows

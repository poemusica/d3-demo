import random

f = open('data.tsv', 'w')
f.write('value\n')
for i in range(100):
	r = random.randint(1, 100)
	f.write(str(r) + '\n')
f.close()
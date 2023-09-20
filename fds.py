arr = [[0.228,3], [0.225,3], [0.160,2], [0.111,3], [0.102,3], [0.067,3] ,[ 0.061,4], [0.043,4]]
#arr = [0.228, 0.225,0.160,0.111, 0.102, 0.067, 0.061, 0.043]
# import math
# res = 0
# print("H = -(", end="")
# for i in arr:
#     res += i*math.log2(i)
#     print(f' + {i}*log2({i})', end='')
# print(") = ")
# print("= -(", end="")
# for i in arr:
#     count = i*math.log2(i)
#     print(f' + ({i*math.log2(i)})', end='')
# print(")=")
# print("=", abs(res))


ress=0
print("L= ", end="")
for i in arr:
    ress += i[0]*i[1]

    print(f"{i[0]}*{i[1]} + ", end="")
print()
print("L = ", ress)


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


# ress=0
# print("L= ", end="")
# for i in arr:
#     ress += i[0]*i[1]
#
#     print(f"{i[0]}*{i[1]} + ", end="")
# print()
# print("L = ", ress)
#
n = 400
fact = 1
fact1 =1
fact2 =1
for i in range(1, 401):
    fact = fact * i
res = fact
for i in range(1, 81):
    fact1 = fact1 * i
res1 = fact1
for i in range(1, 321):
    fact2 = fact2 * i
res2 = fact2
print("The factorial of 400 is : ", end="")
print(fact)
print("The factorial of 80 is : ", end="")
print(fact1)
print("The factorial of 320 is : ", end="")
print(fact2)

print("final : ", end="")
print(res/(fact1*fact2))
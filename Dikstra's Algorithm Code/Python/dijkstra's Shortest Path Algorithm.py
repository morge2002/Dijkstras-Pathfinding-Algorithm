#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Nov 15 10:19:19 2019

@author: morganlewis
"""
import math

class node:
    def __init__(this,weight,cons,start=False,name='name'):
        
        this.weight = weight
        this.cons = cons
        this.visit = False
        this.name = name
        this.prevNode = ''
        
        if start:    
            this.path = 0
        else:
            this.path = math.inf
        
        
n1 = node([3,2,2,2],[], True)
n2 = node([3,4],[])
n3 = node([2,6],[])
n4 = node([4,6,9],[])
n5 = node([2,9],[])
n6 = node([2,1],[])
n7 = node([1,2],[])
n8 = node([2,1],[])

n1.cons = [n2,n3,n5,n6]
n2.cons = [n1,n4]
n3.cons = [n1,n4]
n4.cons = [n2,n3,n5]
n5.cons = [n1,n4]
n6.cons = [n1,n7]
n7.cons = [n6,n8]
n8.cons = [n7,n4]

first = n1
end = n4

#the following array must be in a rough order
oldNodes = [first,n5,n3,n2,n6,n7,n8,end]
nodeName = ['first','n5','n3','n2','n6','n7','n8','end']

for i in range(len(oldNodes)):
    oldNodes[i].name = nodeName[i]
    
nodes = [first]

def dijkstra(start,i=0):
    #smallestPath = True
    for n in range(len(start.cons)):
        if not start.cons[n].visit: 
            if (start.path + start.weight[n]) < start.cons[n].path:
                start.cons[n].path = start.path + start.weight[n]
                start.cons[n].prevNode = start
            if start.cons[n] != end:
                nodes.append(start.cons[n])
    start.visit = True
    
    print('i: ' + str(i)) 
    i = i + 1
    if i <= len(nodes)-1:
        start = nodes[i]
        dijkstra(start,i)
    else:
        print('end')
dijkstra(first)

print('n1 path: ' + str(n1.path))
print('n2 path: ' + str(n2.path))
print('n3 path: ' + str(n3.path))
print('n4 path: ' + str(n4.path))
print('n5 path: ' + str(n5.path))


def printShortestPath(node=end):
    if node == end:
        print(end.name)
    if node != first:
        print(node.prevNode.name)
        node = node.prevNode
        printShortestPath(node)
    
print('\nshortest path: ')

printShortestPath()

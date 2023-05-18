import boto3
import json
# Get the service resource.
dynamodb = boto3.resource('dynamodb')
from interface import TableInterface







test = TableInterface('userkwords')

#print(test.getURL('gen','yt'))
# print(test.get_item('gen','yt'))
# print(test.get_URL('gen','tr'))
# print(test.get_URL('gen','trs'))

# # test.create_item('tester','test','testurl')

# print(test.get_URL('tester','test'))

# test.create_group('testeralt', 'testgroup2')
# print(test.join_group('testeralt', 'testgroup2'))
# print(test.create_group('testeralt','newgroup'))
# print(test.get_groups('testeralt'))
# print(test.group_exists('testgroup'))

# print(test.add_to_group('testeralt','newgroup','groupkword','groupurl'))
# print(test.add_to_group('testeralt2','newgroup','groupkword2','groupurl2'))









from search import search

print(search("tr bonjour", 'testeralt', test))
print(search("groupkword",'testeralt', test))
#print(test.get_item("tester",'test'))


import boto3
from boto3.dynamodb.conditions import Key
import json
# Get the service resource.
dynamodb = boto3.resource('dynamodb')

class TableInterface():
    def __init__(self, table_name):
        self.table = dynamodb.Table(table_name)


    # return a dictionary style item corresposing to user keyword pair or none if nonexistant
    def get_item(self, user, kword):
        response = self.table.get_item(
            Key={
                'user': user,
                'kword': kword
            }
        )
        if not 'Item' in response: return None
        item = response['Item']
        return item
    
    # return the url corresponding to a user keyword pair or none if noneexistant
    def get_URL(self, user, kword):
        item = self.get_item(user, kword)
        if item: return item['url']
        return None
    
    def create_item(self, user, kword, url):
        self.table.put_item(
            Item={
                    'user': user,
                    'kword': kword,
                    'url': url
                }
            )
        
    def get_user_urls(self, user):
        filtering_expression = Key('user').eq(user)
        response = self.table.query(KeyConditionExpression=filtering_expression)
        if not 'Items' in response: print('user does not exist'); return {}
        items = list(filter(lambda x: x['kword'] not in ['$$groups', '$$group_metadata'], response['Items']))
        urldict = {}
        for item in items:
            urldict[item['kword']] = item['url']
        return urldict
    
    # Get list of the groups a user is a member of or empty list if None
    def get_user_groups(self, user):
        item = self.get_item(user, '$$groups')
        if item and 'groupsattribute' in item: 
            return json.loads(item['groupsattribute'])  
        return []
            
        
    def get_user_groupsowned(self, user):
        item = self.get_item(user, '$$groups')
        if item and 'groupsowned' in item: 
            return json.loads(item['groupsowned'])  
        return []
        
    # add group to the list of groups associated with the user, creating a list if none exists (the list is stored as a string)
    def join_group(self, user, group, asowner = False): # TO DO: make sure joiner is elligable
        if not self.group_exists(group): print("Group does not exist")  ;return False
        if not asowner:
            groups = self.get_user_groups(user)
            if group in groups: print("User already in group"); return True
            groups.append(group)
            self.table.update_item(
                Key={
                    'user': user,
                    'kword': '$$groups'
                },
                ExpressionAttributeValues={
                    ':val1': json.dumps(groups)
                },
                UpdateExpression='SET groupsattribute = :val1'
            )
            return True
        groups = self.get_user_groups(user)
        groupsowned = self.get_user_groupsowned(user)
        if group in groups: print("User already in group")
        groups.append(group)
        groupsowned.append(group)
        self.table.update_item(
            Key={
                'user': user,
                'kword': '$$groups'
            },
            ExpressionAttributeValues={
                ':val1': json.dumps(groups),
                ':val2': json.dumps(groupsowned)
            },
            UpdateExpression='SET groupsattribute = :val1, groupsowned = :val2'
        )
        return True

    def create_group(self, user, groupname):
        if self.group_exists(groupname):
            return False
        self.table.put_item(
            Item={
                    'user': groupname,
                    'kword': "$$group_metadata",
                    'owners': json.dumps([user])
                }
            )
        self.join_group(user, groupname, True)
        return True

    def group_exists(self, group):
        return(bool(self.get_item(group, '$$group_metadata')))

    def add_to_group(self, user, group, kword, url):
        meta = self.get_item(group, '$$group_metadata')
        if not meta: print("group does not exist"); return False
        owners = json.loads(meta["owners"])
        if not user in owners: print("User does not own group"); return False
        self.create_item(group, kword, url)
        return True







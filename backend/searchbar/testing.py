import boto3
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

        

test = TableInterface('userkwords')

#print(test.getURL('gen','yt'))
print(test.get_item('gen','yt'))

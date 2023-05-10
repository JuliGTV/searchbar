## query a cell to test

import os
from datetime import datetime, timedelta
from google.cloud import bigtable
import google.cloud.bigtable.row_filters as row_filters


class TableInterface():
    def __init__(self, project_id, instance_id, table_id, key_path):
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = key_path
        self._client = bigtable.Client(project=project_id)
        self._instance = self._client.instance(instance_id)
        self._table = self._instance.table(table_id)

    def get_cell(self, row, col):
        col_filter = row_filters.ColumnQualifierRegexFilter(col)
        cellrow = self._table.read_row(row, filter_=col_filter)
        if not cellrow: return None
        celldict = cellrow.cells
        _, cd = celldict.popitem()
        _, cell = cd.popitem()
        return cell[0].value.decode('utf8')
    
    def new_cell(self, key, url):
        row = self._table.row('URL'.encode())
        print(url)
        row.set_cell('general_keys', key, (url.encode()))
        row.commit()














from collections import OrderedDict

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.utils.urls import replace_query_param, remove_query_param

class PageNumberPaginationFirstLast(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('next', self.get_next_link()),
            ('last', self.get_last_link()),
            ('previous', self.get_previous_link()),
            ('first', self.get_first_link()),
            ('results', data)
        ]))
    
    def get_last_link(self):
        url = self.request.build_absolute_uri()
        page_size = self.page_size
        page_number = self.page.paginator.count // page_size
        if self.page.paginator.count % page_size:
            page_number += 1
        return replace_query_param(url, self.page_query_param, page_number)

    def get_first_link(self):
        url = self.request.build_absolute_uri()
        return remove_query_param(url, self.page_query_param)
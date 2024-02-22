from . import models
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from .serializers import BookSerializer
from . import serializers


# 简单示例
class BookViewSet(ModelViewSet):
    serializer_class = BookSerializer
    queryset = models.Book.objects.all()


# 高级示例
class BookViewSetExample(ModelViewSet):
    """
    可以覆盖对应方法来实现自定义逻辑
    CreateModelMixin 增 POST /books/
    RetrieveModelMixin 查单个 GET /books/1/
    ListModelMixin 查多个 /books/ GET
    UpdateModelMixin 改 PATCH /books/1/
    DestroyModelMixin 删 DELETE /books/1/
    """

    serializer_class = serializers.BookAdvancedSerializer
    queryset = models.Book.objects.all()
    # Ordering Method 2
    ordering_fields = ['name', 'number']
    ordering = ['name']

    # permission_classes = [AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser]
    # pagination_class = None # 默认设置了分页, 如果不想分页独立处理或设置为None

    def get_paginated_response(self, data):
        # 分页处理
        query_params = self.request.query_params
        response = super().get_paginated_response(data)
        return response

    def get_queryset(self):
        def random20():
            # 随机抽20个 方法一
            random_objects = YourModel.objects.order_by('?')[:20]

            # 随机抽20个 方法二
            import random
            all_books = self.queryset
            random_books = random.sample(list(all_books), 20)

        def filter():
            # 过滤
            self.queryset.filter(id=1)
            self.queryset.filter(id__gt=3)
            self.queryset.filter(id__in=(1, 2))

        def union():
            # 合并数据集
            qs = self.queryset
            queryset1 = qs.filter(id=1)
            queryset2 = qs.filter(id=2)
            queryset3 = qs.filter(id=3)
            merged_queryset = queryset1.union(queryset2, queryset3)

        qs = super().get_queryset()
        # qs_id1 = qs.filter(id=1)
        return qs

    @action(methods=['post'], detail=False)
    def import_excel(self, request):
        params = request.POST or request.data
        confirm = params.get('confirm')
        return Response({'msg': 'done', 'count': 0})


# Function based views
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET', 'POST'])
def hello_world(request):
    if request.method == 'POST':
        return Response({"message": "Got some data!", "data": request.data})
    return Response({"message": "Hello, world!"})


# Policy decorators: https://www.django-rest-framework.org/api-guide/views/#api-policy-decorators
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # policy decorator
@renderer_classes([JSONRenderer])  # policy decorator
def items_not_done(request):
    book_count = models.Book.objects.count()
    content = {'count': book_count}

    return Response(content)

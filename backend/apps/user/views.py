from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer


# Create your views here.
@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

# from rest_framework import filters
# class MyViewSet
    # filterset_fields = ['question']
    # search_fields = ['question']
    # filter_backends = [filters.SearchFilter, DjangoFilterBackend]


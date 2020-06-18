from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from django.http import HttpResponse



@api_view(['GET'])
def mypage(request):
    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.id)
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['GET'])
def user_detail(request, user_pk):
    User = get_user_model()
    user = get_object_or_404(User, pk=user_pk)
    if request.user == user:
        return redirect('accounts:mypage')
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def user_delete(request):
    request.user.delete()
    return HttpResponse(status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def follow(request, user_pk):
    User = get_user_model()
    user = get_object_or_404(User, pk=user_pk)
    if user != request.user:
        if user.followers.filter(pk=request.user.pk).exist():
            user.followers.remove(request.user)
        else:
            user.followers.add(request.user)
    return HttpResponse('ㅎ.ㅎ')
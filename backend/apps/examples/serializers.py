from rest_framework import serializers as rest_serializers, serializers
from . import models


class BookSerializer(rest_serializers.ModelSerializer):
    class Meta:
        model = models.Book
        fields = '__all__'


class BookAdvancedSerializer(rest_serializers.ModelSerializer):
    # 自定义字段
    days_since_joined = serializers.SerializerMethodField()

    def get_days_since_joined(self, obj):
        from django.utils.timezone import now
        return now().day
        # return (now() - obj.date_joined).days

    def to_representation(self, instance):
        serializer_data = super().to_representation(instance)
        return serializer_data

    class Meta:
        model = models.Book
        fields = ['name', 'number', 'price', 'created', 'updated', 'id', 'days_since_joined']
        read_only_fields = ['created', 'updated', 'id']

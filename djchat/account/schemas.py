from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from .serializers.account import AccountSerializer

list_message_docs = extend_schema(
    responses=AccountSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="user_id",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="User ID",

        ),
        ]
)
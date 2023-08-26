from rest_framework import routers

#views
from api.viewsets import UserViewset
router = routers.DefaultRouter()

router.register(r'users', UserViewset, 'user')

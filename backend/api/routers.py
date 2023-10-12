from rest_framework import routers

#views
from api.viewsets import UserViewset, MenuViewset, ProductoViewset, CompraViewset
router = routers.DefaultRouter()

router.register(r'users', UserViewset, 'user')
router.register(r'menu', MenuViewset, 'menu')
router.register(r'producto', ProductoViewset, 'producto')
router.register(r'compras', CompraViewset, 'compras')

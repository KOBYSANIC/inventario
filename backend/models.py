# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class ApiMenumodel(models.Model):
    id = models.BigAutoField(primary_key=True)
    nombre_opcion = models.CharField(max_length=50, blank=True, null=True)
    link = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'api_menumodel'


class ApiRolmenumodel(models.Model):
    id = models.BigAutoField(primary_key=True)
    menu = models.ForeignKey(ApiMenumodel, models.DO_NOTHING)
    rol = models.ForeignKey('ApiRolmodel', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'api_rolmenumodel'


class ApiRolmodel(models.Model):
    id = models.BigAutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'api_rolmodel'


class ApiUserprofile(models.Model):
    id = models.BigAutoField(primary_key=True)
    reference_rol = models.ForeignKey(ApiRolmodel, models.DO_NOTHING, blank=True, null=True)
    user = models.OneToOneField('AuthUser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'api_userprofile'


class Auditoria(models.Model):
    id = models.BigIntegerField(primary_key=True)
    tabla = models.CharField(max_length=100, blank=True, null=True)
    operacion = models.CharField(max_length=10, blank=True, null=True)
    registroid = models.FloatField(blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'auditoria'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128, blank=True, null=True)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150, blank=True, null=True)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    email = models.CharField(max_length=254, blank=True, null=True)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Categorias(models.Model):
    id = models.BigIntegerField(primary_key=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'categorias'


class Clientes(models.Model):
    id = models.BigIntegerField(primary_key=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'clientes'


class Compras(models.Model):
    id = models.BigIntegerField(primary_key=True)
    proveedorid = models.ForeignKey('Proveedores', models.DO_NOTHING, db_column='proveedorid', blank=True, null=True)
    fechacompra = models.DateField(blank=True, null=True)
    totalcompra = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'compras'


class Detallescompra(models.Model):
    id = models.BigIntegerField(primary_key=True)
    compraid = models.ForeignKey(Compras, models.DO_NOTHING, db_column='compraid', blank=True, null=True)
    productoid = models.ForeignKey('Productos', models.DO_NOTHING, db_column='productoid', blank=True, null=True)
    cantidad = models.FloatField(blank=True, null=True)
    preciounitario = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'detallescompra'


class Detallesventa(models.Model):
    id = models.BigIntegerField(primary_key=True)
    ventaid = models.ForeignKey('Ventas', models.DO_NOTHING, db_column='ventaid', blank=True, null=True)
    productoid = models.ForeignKey('Productos', models.DO_NOTHING, db_column='productoid', blank=True, null=True)
    cantidad = models.FloatField(blank=True, null=True)
    preciounitario = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'detallesventa'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100, blank=True, null=True)
    model = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class Movimientoinventario(models.Model):
    id = models.BigIntegerField(primary_key=True)
    productoid = models.ForeignKey('Productos', models.DO_NOTHING, db_column='productoid', blank=True, null=True)
    cantidad = models.FloatField(blank=True, null=True)
    tipomovimiento = models.CharField(max_length=1, blank=True, null=True)
    fechamovimiento = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movimientoinventario'


class Productos(models.Model):
    id = models.BigIntegerField(primary_key=True)
    categoriaid = models.ForeignKey(Categorias, models.DO_NOTHING, db_column='categoriaid', blank=True, null=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    stockinicial = models.FloatField(blank=True, null=True)
    stockactual = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'productos'


class Proveedores(models.Model):
    id = models.BigIntegerField(primary_key=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    contacto = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'proveedores'


class Ventas(models.Model):
    id = models.BigIntegerField(primary_key=True)
    clienteid = models.ForeignKey(Clientes, models.DO_NOTHING, db_column='clienteid', blank=True, null=True)
    fechaventa = models.DateField(blank=True, null=True)
    totalventa = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    anulado = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ventas'

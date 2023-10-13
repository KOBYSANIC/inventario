# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Auditoria(models.Model):
    id = models.BigIntegerField(primary_key=True)
    tabla = models.CharField(max_length=100, blank=True, null=True)
    operacion = models.CharField(max_length=10, blank=True, null=True)
    registroid = models.FloatField(blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'auditoria'


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


from django.db import models


class Auditoria(models.Model):
    tabla = models.CharField(max_length=100, blank=True, null=True)
    operacion = models.CharField(max_length=10, blank=True, null=True)
    registroid = models.FloatField(blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

class Categorias(models.Model):
    nombre = models.CharField(max_length=100, blank=True, null=True)

class Clientes(models.Model):
    nombre = models.CharField(max_length=100, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)

class Compras(models.Model):
    proveedorid = models.ForeignKey('Proveedores', blank=True, null=True, on_delete=models.CASCADE)
    fechacompra = models.DateField(blank=True, null=True)
    totalcompra = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

class Detallescompra(models.Model):
    compraid = models.ForeignKey(Compras, blank=True, null=True, on_delete=models.CASCADE)
    productoid = models.ForeignKey('Productos', blank=True, null=True, on_delete=models.CASCADE)
    cantidad = models.FloatField(blank=True, null=True)
    preciounitario = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)


class Detallesventa(models.Model):
    ventaid = models.ForeignKey('Ventas', blank=True, null=True, on_delete=models.CASCADE)
    productoid = models.ForeignKey('Productos', blank=True, null=True, on_delete=models.CASCADE)
    cantidad = models.FloatField(blank=True, null=True)
    preciounitario = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)


class Movimientoinventario(models.Model):
    productoid = models.ForeignKey('Productos', blank=True, null=True, on_delete=models.CASCADE)
    cantidad = models.FloatField(blank=True, null=True)
    tipomovimiento = models.CharField(max_length=1, blank=True, null=True)
    fechamovimiento = models.DateField(blank=True, null=True)

class Productos(models.Model):
    categoriaid = models.ForeignKey(Categorias, blank=True, null=True, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    stockinicial = models.FloatField(blank=True, null=True)
    stockactual = models.FloatField(blank=True, null=True)


class Proveedores(models.Model):
    nombre = models.CharField(max_length=100, blank=True, null=True)
    contacto = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)

class Ventas(models.Model):
    clienteid = models.ForeignKey(Clientes, models.DO_NOTHING, db_column='clienteid', blank=True, null=True)
    fechaventa = models.DateField(blank=True, null=True)
    totalventa = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    anulado = models.BigIntegerField(blank=True, null=True)
